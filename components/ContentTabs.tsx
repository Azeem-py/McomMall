// app/components/listing-detail/ContentTabs.tsx
'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
function OverviewSection({
  listing,
}: {
  listing: GooglePlaceResult | InHouseBusiness;
}) {
  const isGoogle = isGoogleResult(listing);

  if (isGoogle) {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Business Status</h3>
          <p className="text-gray-600">{listing.business_status}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Types</h3>
          <p className="text-gray-600">{listing.types?.join(', ')}</p>
        </div>
        {listing.opening_hours && (
          <div>
            <h3 className="text-lg font-semibold">Availability</h3>
            <p className="text-gray-600">
              {listing.opening_hours.open_now ? 'Open Now' : 'Closed'}
            </p>
          </div>
        )}
      </div>
    );
  }

  // InHouseBusiness
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold">
          About {listing.businessName}
        </h3>
        <p className="text-gray-700 leading-relaxed mt-2">
          {listing.about || listing.shortDescription}
        </p>
      </div>
      {(listing.website || listing.businessEmail) && (
        <div>
          <h3 className="text-xl font-bold border-t pt-6">
            Contact Information
          </h3>
          <div className="flex flex-col space-y-2 mt-2">
            {listing.website && (
              <a
                href={listing.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:underline"
              >
                {listing.website}
              </a>
            )}
          </div>
        </div>
      )}
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
        <OverviewSection listing={listing} />
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
