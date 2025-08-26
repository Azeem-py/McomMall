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

  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    let h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12; // the hour '0' should be '12'
    return `${h}:${minutes} ${ampm}`;
  };

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

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

      {listing.businessHours && listing.businessHours.length > 0 && (
        <div>
          <h3 className="text-xl font-bold border-t pt-6">
            Opening Hours
          </h3>
          <ul className="text-gray-700 mt-2 space-y-1">
            {listing.businessHours
              .sort((a, b) => a.dayOfWeek - b.dayOfWeek)
              .map(hour => (
                <li key={hour.id} className="flex justify-between">
                  <span>{daysOfWeek[hour.dayOfWeek]}</span>
                  <span>
                    {hour.is24h
                      ? '24 Hours'
                      : `${formatTime(hour.openTime)} - ${formatTime(
                          hour.closeTime
                        )}`}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      )}

      {listing.productSellerProfile && (
        <div>
          <h3 className="text-xl font-bold border-t pt-6">
            Seller Information
          </h3>
          <div className="text-gray-700 mt-2 space-y-2">
            <p>
              <strong>Selling Modes:</strong>{' '}
              {listing.productSellerProfile.sellingModes.join(', ')}
            </p>
            {listing.productSellerProfile.returnsPolicy && (
              <p>
                <strong>Returns Policy:</strong>{' '}
                {listing.productSellerProfile.returnsPolicy}
              </p>
            )}
            {listing.productSellerProfile.fulfilmentNotes && (
              <p>
                <strong>Fulfilment Notes:</strong>{' '}
                {listing.productSellerProfile.fulfilmentNotes}
              </p>
            )}
          </div>
        </div>
      )}

      {listing.serviceProviderProfile && (
        <div>
          <h3 className="text-xl font-bold border-t pt-6">
            Service Information
          </h3>
          <div className="text-gray-700 mt-2 space-y-2">
            <p>
              <strong>Booking Method:</strong>{' '}
              {listing.serviceProviderProfile.bookingMethod}
            </p>
            {listing.serviceProviderProfile.bookingUrl && (
              <p>
                <strong>Book Online:</strong>{' '}
                <a
                  href={listing.serviceProviderProfile.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:underline"
                >
                  {listing.serviceProviderProfile.bookingUrl}
                </a>
              </p>
            )}
          </div>
        </div>
      )}

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
