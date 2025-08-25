export enum CampaignType {
  PPV = 'ppv',
  PPC = 'ppc',
}

export enum AdPlacement {
  HOMEPAGE = 'homepage',
  SEARCH_TOP = 'search_top',
  SIDEBAR = 'sidebar',
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
