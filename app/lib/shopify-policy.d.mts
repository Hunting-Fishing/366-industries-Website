export type ShopifyEnvironment = {
  SHOPIFY_SHOP?: string;
  SHOPIFY_ACCESS_TOKEN?: string;
  SHOPIFY_CLIENT_ID?: string;
  SHOPIFY_CLIENT_SECRET?: string;
  SHOPIFY_API_VERSION?: string;
};

export declare function shopifyAdminConfigurationReady(
  environment: ShopifyEnvironment,
  expectedSubdomain: string,
  expectedApiVersion: string
): boolean;
export declare function shopifyIdentityMatches(
  shop: {id?: string; myshopifyDomain?: string} | undefined,
  expectedDomain: string,
  expectedId: string
): boolean;
export declare function missingShopifyScopes(
  grantedScopes: Array<string | undefined>,
  requiredScopes: readonly string[]
): string[];
