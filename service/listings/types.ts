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

export interface UserService {
  id: string;
  created_at: string;
  updated_at: string;
  imageUrl: string | null;
  title: string;
  description: string;
  price: string;
  currency: string;
  pricingModel: string;
}

export interface User {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
  isEmailVerified: boolean;
  role: string;
}

export interface UserListing {
  id: string;
  created_at: string;
  updated_at: string;
  category: string;
  title: string;
  description: string;
  logoUrl: string | null;
  keywords: string[];
  address: string;
  googleMapsPlaceId: string;
  socials: {
    twitter: string;
    youtube: string;
    facebook: string;
    instagram: string;
  };
  services: UserService[];
  galleryImages: any[];
  operatingHours: any[];
  availabilityOverrides: any[];
  user: User;
}

export interface Listing {
  category: string;
  title: string;
  logo: File | null;
  keywords: string[];
  address: string;
  googleMapsPlaceId: string;
  gallery: File[];
  services: {
    title: string;
    description: string;
    price: number;
    currency: string;
    pricingModel: string;
  }[];
  schedule: any;
  availability: any;
  description: string;
  socials: {
    youtube?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}
