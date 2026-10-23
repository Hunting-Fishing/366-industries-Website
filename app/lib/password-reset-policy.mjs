export const PASSWORD_RESET_GENERIC_MESSAGE =
  "If the owner account is available, a secure reset link has been sent to its verified email address.";

/** Normalize provider behavior without exposing account or provider details. */
export async function runPasswordResetRequest(sendReset) {
  try {
    const {error} = await sendReset();
    if (error?.status === 429) {
      return {
        ok: false,
        status: 429,
        retryAfter: "60",
        message: "A reset was requested recently. Please wait before trying again.",
      };
    }
    if (error) {
      return {
        ok: false,
        status: 503,
        message: "Password recovery is temporarily unavailable.",
      };
    }
    return {
      ok: true,
      status: 202,
      message: PASSWORD_RESET_GENERIC_MESSAGE,
    };
  } catch {
    return {
      ok: false,
      status: 503,
      message: "Password recovery is temporarily unavailable.",
    };
  }
}

export function passwordResetCompletion(signOutFailed, logoutSucceeded) {
  if (signOutFailed || !logoutSucceeded) {
    return {
      phase: "warning",
      message: "Your password was updated, but full sign-out could not be confirmed. Close this browser before signing in again with the new password.",
    };
  }
  return {
    phase: "complete",
    message: "Password updated and prior refresh sessions revoked. Sign in again with the new password.",
  };
}
