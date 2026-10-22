export type AdminAccessTokenClaims = {
  exp?: number;
  iat?: number;
  session_id?: string;
  sub?: string;
};

export type AdminSupabaseConfig = {
  url: string;
  anonKey: string;
  serviceRoleKey?: string;
};

export declare function accessTokenClaims(token: string): AdminAccessTokenClaims | null;
export declare function validLiveAccessTokenClaims(
  claims: AdminAccessTokenClaims | null,
  nowSeconds?: number
): boolean;
export declare function validateAdminAccessToken(input: {
  accessToken: string;
  config: AdminSupabaseConfig | null;
  ownerEmail: string;
  fetchImpl?: typeof fetch;
  nowSeconds?: number;
}): Promise<string | null>;
