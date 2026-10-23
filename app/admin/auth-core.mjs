/**
 * Runtime-neutral administrator-token validation. Keeping cookie access out of
 * this module makes every fail-closed branch directly testable.
 */

export function accessTokenClaims(token) {
  const pieces = token.split(".");
  if (pieces.length !== 3 || !pieces.every((piece) => /^[A-Za-z0-9_-]+$/.test(piece))) {
    return null;
  }
  try {
    const base64 = pieces[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

export function validLiveAccessTokenClaims(claims, nowSeconds = Math.floor(Date.now() / 1000)) {
  return Boolean(
    /^[0-9a-f-]{36}$/i.test(claims?.sub || "") &&
    /^[0-9a-f-]{36}$/i.test(claims.session_id || "") &&
    Number.isSafeInteger(claims.iat) &&
    Number.isSafeInteger(claims.exp) &&
    Number(claims.exp) > nowSeconds
  );
}

export async function validateAdminAccessToken({
  accessToken,
  config,
  ownerEmail,
  fetchImpl = fetch,
  nowSeconds = Math.floor(Date.now() / 1000),
}) {
  const claims = accessTokenClaims(accessToken);
  if (!config?.serviceRoleKey || !validLiveAccessTokenClaims(claims, nowSeconds)) {
    return null;
  }

  try {
    const serviceHeaders = {
      apikey: config.serviceRoleKey,
      "Content-Type": "application/json",
    };
    if (!config.serviceRoleKey.startsWith("sb_secret_")) {
      serviceHeaders.Authorization = `Bearer ${config.serviceRoleKey}`;
    }
    const [userResponse, sessionResponse] = await Promise.all([
      fetchImpl(`${config.url}/auth/v1/user`, {
        headers: {
          apikey: config.anonKey,
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      }),
      fetchImpl(`${config.url}/rest/v1/rpc/is_active_owner_session`, {
        method: "POST",
        headers: serviceHeaders,
        body: JSON.stringify({
          p_session_id: claims.session_id,
          p_user_id: claims.sub,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      }),
    ]);
    if (!sessionResponse.ok || await sessionResponse.json() !== true) return null;
    if (!userResponse.ok) return null;
    const user = await userResponse.json();
    if (user?.id !== claims.sub || !user?.email_confirmed_at ||
        user?.email?.trim().toLowerCase() !== ownerEmail) {
      return null;
    }
    return ownerEmail;
  } catch {
    return null;
  }
}
