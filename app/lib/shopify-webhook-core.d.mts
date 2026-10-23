export type ShopifyOrderSummary = {
  orderId: string;
  total: number;
  currency: string;
  financialStatus: string;
  createdAt: string;
  occurredAt: string;
};

export declare function selectShopifyWebhookSecret(
  adminConfigured: boolean,
  clientSecretValue?: string,
  webhookSecretValue?: string
): string;
export declare function verifyShopifyWebhookHmac(
  bytes: Uint8Array,
  suppliedHmac: string,
  secret: string
): Promise<boolean>;
export declare function parseShopifyOrderSummary(
  payload: Record<string, unknown>,
  triggeredAt: string
): ShopifyOrderSummary | null;
