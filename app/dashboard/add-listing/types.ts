export interface Service {
  id: number;
  image: string | null;
  title: string;
  description: string;
  price: string;
  currency: string;
  pricingModel: string;
}

export interface TimeRange {
  start: string;
  end: string;
}

export interface Schedule {
  [key: string]: TimeRange[];
}

export interface Availability {
  [key: string]: {
    blocked: boolean;
    price?: number;
  };
}

export interface Socials {
    youtube?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
}

export interface ListingFormData {
  category: string;
  title: string;
  logo: File | null;
  keywords: string;
  address: string;
  googleMapsPlaceId: string;
  gallery: File[];
  services: Service[];
  schedule: Schedule;
  availability: Availability;
  description: string;
  socials: Socials;
}
