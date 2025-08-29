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

export enum SubscriptionStatusEnum {
  TRIAL_ACTIVE = 'TRIAL_ACTIVE',
  TRIAL_EXPIRED = 'TRIAL_EXPIRED',
  PAID = 'PAID',
  INACTIVE = 'INACTIVE',
}

export enum PlanTypeEnum {
  CO_BRANDED = 'CO_BRANDED',
  PAYG = 'PAYG',
}

export enum PaygOptionEnum {
  NINETY_DAYS = 'NINETY_DAYS',
  ONE_EIGHTY_DAYS = 'ONE_EIGHTY_DAYS',
  TWO_SEVENTY_DAYS = 'TWO_SEVENTY_DAYS',
}

export interface SubscriptionStatusResponse {
  status: SubscriptionStatusEnum;
  planType: PlanTypeEnum;
  paygOption: PaygOptionEnum | null;
  trialEndDate: string | null;
}
