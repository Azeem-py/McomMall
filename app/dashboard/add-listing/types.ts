// Shared types
export interface Socials {
  website?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  linkedin?: string;
}

export interface Media {
  file: File | null;
  altText: string;
}

export interface TimeRange {
  start: string;
  end:string;
}

export interface WeeklyHours {
  Monday?: TimeRange[];
  Tuesday?: TimeRange[];
  Wednesday?: TimeRange[];
  Thursday?: TimeRange[];
  Friday?: TimeRange[];
  Saturday?: TimeRange[];
  Sunday?: TimeRange[];
}

export interface SpecialDay {
  date: Date;
  isClosed: boolean;
  openingHours?: TimeRange[];
}

// Flow-specific data structures
export interface ProductSellerData {
  primaryCategory: string;
  subCategories: string[];
  showAddressPublicly: boolean;
  deliveryArea: {
    type: 'radius' | 'postcodes';
    value: string;
  };
  is247: boolean;
  weeklyHours: WeeklyHours;
  specialDays: SpecialDay[];
  sellingModes: {
    inStorePickup: boolean;
    localDelivery: boolean;
    ukWideShipping: boolean;
  };
  fulfilmentNotes?: string;
  returnsPolicy?: string;
  storefrontLinks?: {
    amazon?: string;
    ebay?: string;
    etsy?: string;
  };
}

export interface ServiceProviderData {
  tradeCategory: string;
  serviceLocation: {
    atBusinessLocation: boolean;
    customerTravels: boolean;
  };
  serviceArea?: {
    type: 'radius' | 'postcodes';
    value: string;
  };
  hoursType: 'weekly' | 'appointmentOnly';
  weeklyHours?: WeeklyHours;
  bookingMethod: 'call' | 'quote' | 'online';
  bookingURL?: string;
  pricingVisibility: 'fixed' | 'hourly' | 'quote';
  insuranceCertificates?: Media[];
  qualifications?: Media[];
}

// Main form data structure
export interface ListingFormData {
  businessTypes: ('Product' | 'Service')[];

  // Shared Business Information
  businessName: string;
  legalName?: string;
  companyRegNo?: string;
  vatNo?: string;
  shortDesc: string;
  longDesc?: string;
  address?: string;
  phone: string;
  email: string;
  socials: Socials;
  logo: Media | null;
  banner: Media | null;

  // Conditional data
  productData?: Partial<ProductSellerData>;
  serviceData?: Partial<ServiceProviderData>;
}
