export interface PricingTier {
  name: string;
  price: string;
  features: string[];
  accent?: 'teal' | 'purple' | 'yellow';
}

export interface TableFeature {
  name: string;
  availability: boolean[];
  tooltip?: string;
}

export interface FeatureGroup {
  name: string;
  features: TableFeature[];
}
