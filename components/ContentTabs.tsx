// app/components/listing-detail/ContentTabs.tsx
'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ParkingCircle, Briefcase, PawPrint } from 'lucide-react';
import type { DetailedListing } from '@/lib/listing-data';
import ReviewsSection from './ReviewSection';
import LocationSection from './locationSection';
import {
  GooglePlaceResult,
  InHouseBusiness,
} from '@/service/listings/types';
import { ReviewsTabContent } from '@/app/listings/[id]/components/ReviewsTabContent';

function isGoogleResult(
  listing: GooglePlaceResult | InHouseBusiness
): listing is GooglePlaceResult {
  return 'place_id' in listing;
}

// You would create more detailed components for each tab
function OverviewSection({ listing }: { listing: DetailedListing }) {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 leading-relaxed">{listing.description}</p>
      <h3 className="text-xl font-bold border-t pt-6">Features</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {listing.features.map(feature => (
          <div key={feature.name} className="flex items-center space-x-2">
            {feature.icon === 'Parking' && (
              <ParkingCircle className="h-5 w-5 text-red-500" />
            )}
            {feature.icon === 'Workspace' && (
              <Briefcase className="h-5 w-5 text-red-500" />
            )}
            {feature.icon === 'Pet' && (
              <PawPrint className="h-5 w-5 text-red-500" />
            )}
            <span className="text-gray-600">{feature.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ContentTabs({
  listing,
  isLoading,
}: {
  listing: GooglePlaceResult | InHouseBusiness;
  isLoading: boolean;
}) {
  const isGoogle = isGoogleResult(listing);
  const location = isGoogle ? listing.geometry : listing.location;
  const address = isGoogle
    ? listing.formatted_address || listing.vicinity
    : `${listing.location.addressLine1}, ${listing.location.city}`;
  const reviews = isGoogle ? listing.reviews : []; // In-house doesn't have reviews yet

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 mb-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="location">Location</TabsTrigger>
        <TabsTrigger value="faq">FAQ</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        {/* <OverviewSection listing={listing} /> */}
      </TabsContent>
      <TabsContent value="location">
        <LocationSection listing={location} address={address} />
      </TabsContent>
      <TabsContent value="reviews">
        <ReviewsTabContent reviews={reviews} isLoading={isLoading} />
      </TabsContent>
    </Tabs>
  );
}
