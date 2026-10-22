export const ROOT_ADMIN_EMAIL = "jordilwbailey@gmail.com";

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return email.trim().toLowerCase() === ROOT_ADMIN_EMAIL;
}

export type SupabaseConfig = {
  url: string;
  anonKey: string;
  serviceRoleKey?: string;
};

export function getSupabaseConfig(): SupabaseConfig | null {
  const rawUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    "";
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || undefined;

  if (!rawUrl || !anonKey) {
    return null;
  }

  return {
    url: rawUrl.replace(/\/+$/, ""),
    anonKey,
    serviceRoleKey,
  };
}

function buildRestHeaders(config: SupabaseConfig, useServiceRole = true) {
  const key = (useServiceRole && config.serviceRoleKey) || config.anonKey;
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    Prefer: "resolution=merge-duplicates,return=representation",
  };
}

export type SupabaseMemberProfileRow = {
  id?: string;
  auth_user_id?: string | null;
  email: string;
  full_name: string;
  role: "admin" | "member";
  status?: "active" | "suspended";
  account_type: string;
  region: string;
  updates_opt_in: boolean;
  last_sign_in_at?: string;
  created_at?: string;
};

export type SupabaseDonationRow = {
  id?: string;
  pledge_ref: string;
  donor_name: string;
  donor_email: string;
  amount_usd: number;
  frequency: "once" | "monthly" | "institutional";
  mission_id: string;
  mission_title: string;
  donor_note?: string | null;
  status?: string;
  created_at?: string;
};

// In-memory fallback registry so Admin & Users Control works immediately even before Supabase env vars are injected
const fallbackUsersStore = new Map<string, SupabaseMemberProfileRow>([
  [
    ROOT_ADMIN_EMAIL,
    {
      id: "root-admin-jordi",
      email: ROOT_ADMIN_EMAIL,
      full_name: "Jordi L. W. Bailey (Founder & Super Admin)",
      role: "admin",
      status: "active",
      account_type: "Root Super Admin • 366 & 1st Defence Industries",
      region: "Canada (BC) • Philippines (Ilocos Norte) • USA",
      updates_opt_in: true,
      last_sign_in_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
  ],
]);

const fallbackDonationsStore: SupabaseDonationRow[] = [];

export function upsertFallbackUser(user: SupabaseMemberProfileRow) {
  const key = user.email.trim().toLowerCase();
  const forcedRole = isAdminEmail(key) ? "admin" : user.role || "member";
  const record: SupabaseMemberProfileRow = {
    ...fallbackUsersStore.get(key),
    ...user,
    email: key,
    role: forcedRole,
    status: user.status || "active",
    last_sign_in_at: user.last_sign_in_at || new Date().toISOString(),
    created_at:
      fallbackUsersStore.get(key)?.created_at ||
      user.created_at ||
      new Date().toISOString(),
  };
  fallbackUsersStore.set(key, record);
  return record;
}

/**
 * Registers a user in Supabase Auth (`auth.users`) AND writes/upserts their
 * profile into `public.member_profiles`.
 */
export async function supabaseSignUpUser(params: {
  email: string;
  password: string;
  name: string;
  accountType: string;
  region: string;
  updatesOptIn: boolean;
}): Promise<{
  synced: boolean;
  authUserId?: string | null;
  accessToken?: string | null;
  role: "admin" | "member";
  error?: string;
}> {
  const normalizedEmail = params.email.trim().toLowerCase();
  const role: "admin" | "member" = isAdminEmail(normalizedEmail)
    ? "admin"
    : "member";

  upsertFallbackUser({
    email: normalizedEmail,
    full_name: params.name,
    role,
    status: "active",
    account_type: params.accountType,
    region: params.region,
    updates_opt_in: params.updatesOptIn,
  });

  const config = getSupabaseConfig();
  if (!config) {
    return { synced: false, role };
  }

  let authUserId: string | null = null;
  let accessToken: string | null = null;

  try {
    const authRes = await fetch(`${config.url}/auth/v1/signup`, {
      method: "POST",
      headers: {
        apikey: config.anonKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: normalizedEmail,
        password: params.password,
        data: {
          full_name: params.name,
          role,
          account_type: params.accountType,
          region: params.region,
          updates_opt_in: params.updatesOptIn,
        },
      }),
    });

    const authJson = (await authRes.json().catch(() => ({}))) as {
      id?: string;
      user?: { id?: string };
      access_token?: string;
      msg?: string;
      error_description?: string;
      message?: string;
    };

    if (!authRes.ok) {
      return {
        synced: false,
        role,
        error:
          authJson.error_description ||
          authJson.msg ||
          authJson.message ||
          "Supabase Auth signup rejected the request.",
      };
    }

    authUserId = authJson.user?.id || authJson.id || null;
    accessToken = authJson.access_token || null;

    const profilePayload: SupabaseMemberProfileRow = {
      auth_user_id: authUserId,
      email: normalizedEmail,
      full_name: params.name,
      role,
      status: "active",
      account_type: params.accountType,
      region: params.region,
      updates_opt_in: params.updatesOptIn,
      last_sign_in_at: new Date().toISOString(),
    };

    await fetch(`${config.url}/rest/v1/member_profiles?on_conflict=email`, {
      method: "POST",
      headers: buildRestHeaders(config, true),
      body: JSON.stringify(profilePayload),
    });

    return {
      synced: true,
      authUserId,
      accessToken,
      role,
    };
  } catch (err) {
    return {
      synced: false,
      role,
      error: err instanceof Error ? err.message : "Supabase network error",
    };
  }
}

/**
 * Signs in an existing user against Supabase Auth (`auth.users`), fetches or
 * upserts their `public.member_profiles` record, and updates `last_sign_in_at`.
 */
export async function supabaseSignInUser(params: {
  email: string;
  password: string;
  fallbackName: string;
  fallbackAccountType: string;
  fallbackRegion: string;
}): Promise<{
  synced: boolean;
  authUserId?: string | null;
  accessToken?: string | null;
  role: "admin" | "member";
  profile?: {
    name: string;
    role: "admin" | "member";
    accountType: string;
    region: string;
  };
  error?: string;
}> {
  const normalizedEmail = params.email.trim().toLowerCase();
  const existingLocal = fallbackUsersStore.get(normalizedEmail);
  const defaultRole: "admin" | "member" = isAdminEmail(normalizedEmail)
    ? "admin"
    : existingLocal?.role || "member";

  upsertFallbackUser({
    email: normalizedEmail,
    full_name: existingLocal?.full_name || params.fallbackName,
    role: defaultRole,
    status: existingLocal?.status || "active",
    account_type: existingLocal?.account_type || params.fallbackAccountType,
    region: existingLocal?.region || params.fallbackRegion,
    updates_opt_in: true,
  });

  const config = getSupabaseConfig();
  if (!config) {
    return {
      synced: false,
      role: defaultRole,
      profile: {
        name: existingLocal?.full_name || params.fallbackName,
        role: defaultRole,
        accountType: existingLocal?.account_type || params.fallbackAccountType,
        region: existingLocal?.region || params.fallbackRegion,
      },
    };
  }

  try {
    const tokenRes = await fetch(
      `${config.url}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        headers: {
          apikey: config.anonKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          password: params.password,
        }),
      }
    );

    const tokenJson = (await tokenRes.json().catch(() => ({}))) as {
      access_token?: string;
      user?: {
        id?: string;
        user_metadata?: {
          full_name?: string;
          role?: "admin" | "member";
          account_type?: string;
          region?: string;
        };
      };
      error_description?: string;
      msg?: string;
    };

    if (!tokenRes.ok) {
      // If root admin logs in before their Supabase Auth account is created, auto-provision or allow
      if (isAdminEmail(normalizedEmail)) {
        return {
          synced: false,
          role: "admin",
          profile: {
            name: "Jordi L. W. Bailey (Founder & Super Admin)",
            role: "admin",
            accountType: "Root Super Admin • 366 & 1st Defence Industries",
            region: "Canada (BC) • Philippines (Ilocos Norte) • USA",
          },
        };
      }
      return {
        synced: false,
        role: defaultRole,
        error:
          tokenJson.error_description ||
          tokenJson.msg ||
          "Invalid email or password.",
      };
    }

    const authUserId = tokenJson.user?.id || null;
    const meta = tokenJson.user?.user_metadata || {};
    const resolvedName = meta.full_name || params.fallbackName;
    const resolvedRole: "admin" | "member" = isAdminEmail(normalizedEmail)
      ? "admin"
      : meta.role || defaultRole;
    const resolvedType = meta.account_type || params.fallbackAccountType;
    const resolvedRegion = meta.region || params.fallbackRegion;

    await fetch(`${config.url}/rest/v1/member_profiles?on_conflict=email`, {
      method: "POST",
      headers: buildRestHeaders(config, true),
      body: JSON.stringify({
        auth_user_id: authUserId,
        email: normalizedEmail,
        full_name: resolvedName,
        role: resolvedRole,
        status: "active",
        account_type: resolvedType,
        region: resolvedRegion,
        updates_opt_in: true,
        last_sign_in_at: new Date().toISOString(),
      }),
    }).catch(() => {});

    return {
      synced: true,
      authUserId,
      accessToken: tokenJson.access_token || null,
      role: resolvedRole,
      profile: {
        name: resolvedName,
        role: resolvedRole,
        accountType: resolvedType,
        region: resolvedRegion,
      },
    };
  } catch (err) {
    return {
      synced: false,
      role: defaultRole,
      error: err instanceof Error ? err.message : "Supabase network error",
    };
  }
}

/**
 * Lists all member profiles from Supabase `public.member_profiles` merged with fallback store.
 */
export async function supabaseListUsers(): Promise<{
  synced: boolean;
  users: SupabaseMemberProfileRow[];
}> {
  const config = getSupabaseConfig();
  if (!config) {
    return {
      synced: false,
      users: Array.from(fallbackUsersStore.values()),
    };
  }

  try {
    const res = await fetch(
      `${config.url}/rest/v1/member_profiles?select=*&order=created_at.desc`,
      {
        headers: buildRestHeaders(config, true),
      }
    );
    if (!res.ok) {
      return {
        synced: false,
        users: Array.from(fallbackUsersStore.values()),
      };
    }
    const rows = (await res.json()) as SupabaseMemberProfileRow[];
    const merged = new Map<string, SupabaseMemberProfileRow>();
    for (const u of fallbackUsersStore.values()) {
      merged.set(u.email.toLowerCase(), u);
    }
    for (const r of rows) {
      const k = r.email.toLowerCase();
      merged.set(k, {
        ...r,
        role: isAdminEmail(k) ? "admin" : r.role || "member",
        status: r.status || "active",
      });
    }
    return {
      synced: true,
      users: Array.from(merged.values()),
    };
  } catch {
    return {
      synced: false,
      users: Array.from(fallbackUsersStore.values()),
    };
  }
}

/**
 * Admin action: Create or update a user's role, status, or profile in Supabase `public.member_profiles`.
 */
export async function supabaseAdminUpsertUser(params: {
  email: string;
  fullName?: string;
  role?: "admin" | "member";
  status?: "active" | "suspended";
  accountType?: string;
  region?: string;
}): Promise<{ synced: boolean; user: SupabaseMemberProfileRow }> {
  const key = params.email.trim().toLowerCase();
  const existing = fallbackUsersStore.get(key);
  const forcedRole: "admin" | "member" = isAdminEmail(key)
    ? "admin"
    : params.role || existing?.role || "member";

  const updated = upsertFallbackUser({
    email: key,
    full_name:
      params.fullName ||
      existing?.full_name ||
      key.split("@")[0].replace(/[._-]/g, " "),
    role: forcedRole,
    status: isAdminEmail(key) ? "active" : params.status || existing?.status || "active",
    account_type:
      params.accountType ||
      existing?.account_type ||
      (forcedRole === "admin" ? "Administrator" : "Member & Supporter"),
    region: params.region || existing?.region || "Global",
    updates_opt_in: existing?.updates_opt_in ?? true,
  });

  const config = getSupabaseConfig();
  if (!config) {
    return { synced: false, user: updated };
  }

  try {
    const res = await fetch(
      `${config.url}/rest/v1/member_profiles?on_conflict=email`,
      {
        method: "POST",
        headers: buildRestHeaders(config, true),
        body: JSON.stringify(updated),
      }
    );
    return { synced: res.ok, user: updated };
  } catch {
    return { synced: false, user: updated };
  }
}

/**
 * Admin action: Remove a user profile (protects Root Admin `jordilwbailey@gmail.com`).
 */
export async function supabaseAdminDeleteUser(
  email: string
): Promise<{ ok: boolean; message?: string }> {
  const key = email.trim().toLowerCase();
  if (isAdminEmail(key)) {
    return {
      ok: false,
      message: "Cannot remove Root Super Admin (Jordilwbailey@gmail.com).",
    };
  }

  fallbackUsersStore.delete(key);

  const config = getSupabaseConfig();
  if (config) {
    await fetch(
      `${config.url}/rest/v1/member_profiles?email=eq.${encodeURIComponent(key)}`,
      {
        method: "DELETE",
        headers: buildRestHeaders(config, true),
      }
    ).catch(() => {});
  }

  return { ok: true };
}

/**
 * Writes a donation or sponsorship pledge row directly to Supabase `public.donations`.
 */
export async function supabaseInsertDonation(
  donation: SupabaseDonationRow
): Promise<{
  synced: boolean;
  row?: SupabaseDonationRow;
  error?: string;
}> {
  const entry: SupabaseDonationRow = {
    ...donation,
    status: donation.status || "pledged",
    created_at: new Date().toISOString(),
  };
  fallbackDonationsStore.unshift(entry);

  const config = getSupabaseConfig();
  if (!config) {
    return { synced: false, row: entry };
  }

  try {
    const res = await fetch(`${config.url}/rest/v1/donations`, {
      method: "POST",
      headers: {
        ...buildRestHeaders(config, true),
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        pledge_ref: donation.pledge_ref,
        donor_name: donation.donor_name,
        donor_email: donation.donor_email,
        amount_usd: donation.amount_usd,
        frequency: donation.frequency,
        mission_id: donation.mission_id,
        mission_title: donation.mission_title,
        donor_note: donation.donor_note || null,
        status: donation.status || "pledged",
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      return {
        synced: false,
        row: entry,
        error: errText || `Supabase REST status ${res.status}`,
      };
    }

    const rows = (await res.json().catch(() => [])) as SupabaseDonationRow[];
    return {
      synced: true,
      row: rows[0] ?? entry,
    };
  } catch (err) {
    return {
      synced: false,
      row: entry,
      error: err instanceof Error ? err.message : "Supabase write failed",
    };
  }
}

export async function supabaseListDonations(): Promise<{
  synced: boolean;
  donations: SupabaseDonationRow[];
}> {
  const config = getSupabaseConfig();
  if (!config) {
    return { synced: false, donations: fallbackDonationsStore };
  }

  try {
    const res = await fetch(
      `${config.url}/rest/v1/donations?select=*&order=created_at.desc&limit=50`,
      {
        headers: buildRestHeaders(config, true),
      }
    );
    if (!res.ok) {
      return { synced: false, donations: fallbackDonationsStore };
    }
    const rows = (await res.json()) as SupabaseDonationRow[];
    return {
      synced: true,
      donations: rows.length > 0 ? rows : fallbackDonationsStore,
    };
  } catch {
    return { synced: false, donations: fallbackDonationsStore };
  }
}
