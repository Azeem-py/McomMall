export interface Geometry {
  location: {
    lat: number;
    lng: number;
  };
  viewport: {
    northeast: {
      lat: number;
      lng: number;
    };
    southwest: {
      lat: number;
      lng: number;
    };
  };
}

interface Photo {
  height: number;
  width: number;
  html_attributions: string[];
  photo_reference: string;
}

interface PlusCode {
  compound_code: string;
  global_code: string;
}

interface OpeningHours {
  open_now: boolean;
}

export interface Review {
  author_name: string;
  author_url: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export interface GooglePlaceResult {
  business_status: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours?: OpeningHours;
  photos?: Photo[];
  reviews?: Review[];
  place_id: string;
  plus_code: PlusCode;
  price_level?: number;
  rating?: number;
  reference: string;
  scope: string;
  types: string[];
  user_ratings_total?: number;
  vicinity: string;

  formatted_address?: string;
  formatted_phone_number?: string;
}

export type GooglePlaceResults = GooglePlaceResult[];

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
