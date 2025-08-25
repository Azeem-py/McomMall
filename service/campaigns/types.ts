export enum CampaignType {
  PAY_PER_VIEW = 'pay_per_view',
  PAY_PER_CLICK = 'pay_per_click',
}

export enum AdPlacement {
  HOMEPAGE = 'homepage',
  TOP_OF_SEARCH_RESULT = 'top_of_search_result',
  SIDE_BAR = 'side_bar',
}

export interface CreateCampaignDto {
  businessId: string;
  type: CampaignType;
  startDate: Date;
  budget: number;
  displayOnlyIfCategory?: string;
  displayOnlyIfRegion?: string;
  enabledForLoggedInUser?: boolean;
  adPlacement: AdPlacement[];
}
