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

export interface GooglePlaceResult {
  business_status: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours?: OpeningHours;
  photos?: Photo[];
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
