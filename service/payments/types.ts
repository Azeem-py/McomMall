export enum PlanType {
  PAYG = 'payg',
  COBRANDED = 'cobranded',
}

export enum PaygOption {
  DAYS_90 = '90_days',
  DAYS_180 = '180_days',
  DAYS_270 = '270_days',
}

export enum PaymentGateway {
  STRIPE = 'stripe',
  PAYPAL = 'paypal',
}

export interface RecordPaymentDto {
  amount: number;
  planType: PlanType;
  paygOption?: PaygOption;
  isTrial: boolean;
  paymentGateway: PaymentGateway;
}
