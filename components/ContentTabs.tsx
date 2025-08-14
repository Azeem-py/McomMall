// app/components/listing-detail/ContentTabs.tsx
'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ParkingCircle, Briefcase, PawPrint } from 'lucide-react';
import type { DetailedListing } from '@/lib/listing-data';
import ReviewsSection from './ReviewSection';
import LocationSection from './locationSection';
import { GooglePlaceResult } from '@/service/listings/types';

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
}: {
  listing: GooglePlaceResult;
}) {
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
        <LocationSection
          listing={listing.geometry}
          address={listing.formatted_address || listing.vicinity}
        />
      </TabsContent>
      <TabsContent value="reviews">
        {/* <ReviewsSection
          reviews={listing.reviews}
          overallRating={listing.rating}
          breakdown={listing.ratingBreakdown}
        /> */}
      </TabsContent>
    </Tabs>
  );
}
