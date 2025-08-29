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

export interface Photo {
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

interface Category {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string | null;
}

export interface Location {
  id: string;
  created_at: string;
  updated_at: string;
  postcode: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  lat: number;
  lng: number;
  showPublicly: boolean;
  deliveryRadiusKm: number | null;
  servicePostcodes: string[];
  serviceModel: string | null;
}

export interface UserListing {
  id: string;
  created_at: string;
  updated_at: string;
  listingType: string[];
  businessName: string;
  legalName: string;
  companyRegistrationNumber: string;
  vatNumber: string;
  shortDescription: string;
  about: string;
  website: string;
  businessPhone: string;
  businessEmail: string;
  logoUrl: string | null;
  bannerUrl: string | null;
  logoAltText: string;
  bannerAltText: string;
  status: string;
  categories: Category[];
  location: Location;
  isGoogleVerified: boolean;
}

// --- Enums as String Literal Types ---
export type ListingType = 'product' | 'service';
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type ServiceModel = 'at_location' | 'travel_to_customer' | 'both';
export type SellingMode = 'pickup' | 'local_delivery' | 'uk_shipping';
export type StorefrontPlatform =
  | 'shopify'
  | 'amazon'
  | 'ebay'
  | 'etsy'
  | 'woocommerce';
export type BookingMethod = 'call_to_book' | 'request_a_quote' | 'book_online';

// --- Nested Payload Interfaces ---

export interface LocationPayload {
  postcode: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  showPublicly: boolean;
  deliveryRadiusKm?: number;
  servicePostcodes?: string[];
  serviceModel?: ServiceModel;
}

export interface SocialLinkPayload {
  platform: string;
  url: string;
}

export interface BusinessHourPayload {
  dayOfWeek: DayOfWeek;
  openTime: string; // "HH:MM"
  closeTime: string; // "HH:MM"
  is24h?: boolean;
}

export interface SpecialDayPayload {
  date: string; // ISO 8601 Date string, e.g., "2024-12-25"
  description: string;
  isOpen: boolean;
  openTime?: string; // "HH:MM"
  closeTime?: string; // "HH:MM"
}

export interface StorefrontLinkPayload {
  platform: StorefrontPlatform;
  url: string;
}

export interface ProductSellerProfilePayload {
  sellingModes: SellingMode[];
  fulfilmentNotes?: string;
  returnsPolicy?: string;
  hasAgeRestrictedItems: boolean;
  storefrontLinks?: StorefrontLinkPayload[];
}

export interface CertificationPayload {
  name: string;
  fileUrl: string;
}

export interface ServiceProviderProfilePayload {
  bookingMethod: BookingMethod;
  bookingUrl?: string;
  fixedPriceFrom?: number;
  hourlyRateFrom?: number;
  quoteOnly: boolean;
  hasPublicLiabilityInsurance: boolean;
  insuranceProvider?: string;
  insuranceExpiryDate?: string; // ISO 8601 Date string
  certifications?: CertificationPayload[];
}

// --- Main Payload Interface ---

export interface CreateBusinessPayload {
  listingType: ListingType[];
  businessName: string;
  legalName?: string;
  companyRegistrationNumber?: string;
  vatNumber?: string;
  shortDescription: string;
  about?: string;
  website?: string;
  businessPhone: string;
  businessEmail?: string;
  logoUrl?: string;
  bannerUrl?: string;
  logoAltText?: string;
  bannerAltText?: string;
  location: LocationPayload;
  socialLinks?: SocialLinkPayload[];
  categoryIds: string[]; // Array of category UUIDs
  businessHours?: BusinessHourPayload[];
  specialDays?: SpecialDayPayload[];
  productSellerProfile?: ProductSellerProfilePayload;
  serviceProviderProfile?: ServiceProviderProfilePayload;
}

export type BusinessStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

// --- Detailed In-House Business Types ---

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

export interface BusinessHour {
  id: string;
  dayOfWeek: DayOfWeek;
  openTime: string;
  closeTime: string;
  is24h: boolean;
}

export interface SpecialDay {
  id: string;
  date: string;
  description: string;
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
}

export interface StorefrontLink {
  id: string;
  platform: StorefrontPlatform;
  url: string;
}

export interface ProductSellerProfile {
  id: string;
  sellingModes: SellingMode[];
  fulfilmentNotes?: string;
  returnsPolicy?: string;
  hasAgeRestrictedItems: boolean;
  storefrontLinks: StorefrontLink[];
}

export interface Certification {
  id: string;
  name: string;
  fileUrl: string;
}

export interface ServiceProviderProfile {
  id: string;
  bookingMethod: BookingMethod;
  bookingUrl?: string;
  fixedPriceFrom?: number;
  hourlyRateFrom?: number;
  quoteOnly: boolean;
  hasPublicLiabilityInsurance: boolean;
  insuranceProvider?: string;
  insuranceExpiryDate?: string;
  certifications: Certification[];
}

export interface Product {
  id: string;
  title: string;
  productType: string;
  price: number;
  shortDescription?: string;
  description: string;
  imageUrl?: string;
  productUrl?: string;
  fileUrls?: string[];
  downloadLimit: number;
  downloadExpiry: number;
  sku?: string;
  enableStockManagement: boolean;
  weight: number;
  length: number;
  width: number;
  height: number;
  productStatus: string;
  visibility: string;
  purchaseNote?: string;
  enableReviews: boolean;
  tags?: string[];
  category: string;
}

export type CampaignType = string;
export type AdPlacement = string;

export interface Campaign {
  id: string;
  type: CampaignType;
  startDate: string;
  budget: number;
  displayOnlyIfCategory?: string;
  displayOnlyIfRegion?: string;
  enabledForLoggedInUser: boolean;
  adPlacement: AdPlacement[];
}

export interface InHouseBusiness {
  id: string;
  created_at: string;
  updated_at: string;
  listingType: ListingType[];
  businessName: string;
  legalName?: string;
  companyRegistrationNumber?: string;
  vatNumber?: string;
  shortDescription: string;
  about?: string;
  website?: string;
  businessPhone: string;
  businessEmail?: string;
  logoUrl?: string;
  bannerUrl?: string;
  logoAltText?: string;
  bannerAltText?: string;
  status: BusinessStatus;
  googlePlaceId?: string;
  isGoogleVerified: boolean;
  isClaimed: boolean;
  location: Location;
  categories: Category[];
  socialLinks: SocialLink[];
  businessHours: BusinessHour[];
  specialDays: SpecialDay[];
  productSellerProfile?: ProductSellerProfile;
  serviceProviderProfile?: ServiceProviderProfile;
  products: Product[];
  campaigns: Campaign[];
  user: User;
}

export type InHouseBusinessResults = InHouseBusiness[];
