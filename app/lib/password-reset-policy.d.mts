export type PasswordResetRequestResult = {
  ok: boolean;
  status: number;
  message: string;
  retryAfter?: string;
};

export declare const PASSWORD_RESET_GENERIC_MESSAGE: string;
export declare function runPasswordResetRequest(
  sendReset: () => Promise<{error: {status?: number} | null}>
): Promise<PasswordResetRequestResult>;
export declare function passwordResetCompletion(
  signOutFailed: boolean,
  logoutSucceeded: boolean
): {phase: "complete" | "warning"; message: string};
