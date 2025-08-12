'use client';

import dynamic from 'next/dynamic';
import type { DetailedListing } from '@/lib/listing-data';

// Dynamically import the map to prevent SSR issues
const ListingMap = dynamic(() => import('./ListingMap'), {
  loading: () => (
    <div className="h-[400px] w-full bg-gray-200 rounded-xl animate-pulse" />
  ),
  ssr: false,
});

export default function LocationSection({
  listing,
}: {
  listing: DetailedListing;
}) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Location</h2>
      <p className="text-gray-600">{listing.location}</p>
      <ListingMap lat={listing.lat} lng={listing.lng} />
    </section>
  );
}
