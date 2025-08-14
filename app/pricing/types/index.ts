// types/index.ts
export interface PlanCardData {
  planName: string;
  price: string; // keep string to allow "Let's talk" or "Seasonal"
  description: string;
  features: string[];
  isFeatured?: boolean;
}

export interface PlanSummary {
  id: 'payg' | 'standard' | 'pro' | 'plus';
  name: string;
  isFeatured?: boolean;
}

export interface FeatureRow {
  id: string;
  name: string;
  tooltip?: string;
  // map planId -> either boolean for ✓/✗ or a label/value
  values: Record<PlanSummary['id'], boolean | string | number>;
}

export interface FeatureCategory {
  id: string;
  label: string;
  features: FeatureRow[];
}
