export function shopifyAdminConfigurationReady(
  environment,
  expectedSubdomain,
  expectedApiVersion
) {
  const accessToken = environment.SHOPIFY_ACCESS_TOKEN?.trim() || "";
  const clientId = environment.SHOPIFY_CLIENT_ID?.trim() || "";
  const clientSecret = environment.SHOPIFY_CLIENT_SECRET?.trim() || "";
  const hasClientCredentials = Boolean(clientId && clientSecret);
  const hasPartialClientCredentials = Boolean(clientId) !== Boolean(clientSecret);
  const apiVersion = environment.SHOPIFY_API_VERSION?.trim() || expectedApiVersion;
  return Boolean(
    environment.SHOPIFY_SHOP?.trim().toLowerCase() === expectedSubdomain &&
    apiVersion === expectedApiVersion &&
    !hasPartialClientCredentials &&
    Boolean(accessToken) !== hasClientCredentials
  );
}

export function shopifyIdentityMatches(shop, expectedDomain, expectedId) {
  return Boolean(
    shop?.id === expectedId &&
    shop?.myshopifyDomain?.toLowerCase() === expectedDomain
  );
}

export function missingShopifyScopes(grantedScopes, requiredScopes) {
  const granted = new Set(grantedScopes.filter(Boolean));
  return requiredScopes.filter((scope) => !granted.has(scope));
}
