'use client';

import { Star, Bookmark, CheckCircle } from 'lucide-react';

import { useGetGoogleListing } from '@/service/listings/hook';
import { Button } from '@/components/ui/button';
import { ClaimBusinessModal } from '@/components/ClaimBusinessModal';
import BookingSidebar from '@/components/BookingSidebar';
import ContentTabs from '@/components/ContentTabs';
import ImageGallery from '@/components/ImageGallery';

type ClientListingDetailProps = {
  placeId: string;
};

export default function ClientListingDetail({
  placeId,
}: ClientListingDetailProps) {
  const {
    data: listing,
    isSuccess,
    isLoading,
  } = useGetGoogleListing({
    place_id: placeId,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isSuccess) console.log(listing);

  let imgUrl;
  if (isSuccess && listing) {
    if (listing.photos) {
      const { photo_reference } = listing?.photos[0];
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3009/api/v1';
      imgUrl = `${API_URL}/listings/photo/${photo_reference}`;
    } else {
      imgUrl =
        'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
    }

    return (
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <header className="mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-3 py-1 text-xs text-white bg-red-500 rounded-md">
                    {/* {listing.categoryTag} */}
                  </span>
                  <span className="px-3 py-1 text-xs text-green-700 bg-green-100 rounded-md">
                    {listing?.price_level}
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  {listing?.name}
                </h1>
                <p className="text-md text-gray-500 mt-1">
                  {listing?.formatted_address || listing?.vicinity}
                </p>
                <div className="flex items-center space-x-1 mt-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-bold">
                    {listing?.rating?.toFixed(1)}
                  </span>
                  <span className="text-gray-500">
                    ({listing?.user_ratings_total} reviews)
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-4">
                <Button variant="outline">
                  <Bookmark className="mr-2 h-4 w-4" />
                  Bookmark this listing
                </Button>
                {false ? (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-semibold text-green-600">
                      Verified Listing
                    </span>
                  </div>
                ) : (
                  <ClaimBusinessModal />
                )}
              </div>
            </div>
          </header>

          {/* Image Gallery */}
          <ImageGallery images={[imgUrl]} />

          {/* Main Content Layout */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-2">
              {listing && <ContentTabs listing={listing} />}
            </div>

            {/* Right Column (Sidebar) */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <BookingSidebar
                  priceDisplay={String(listing?.price_level ?? '')}
                  author={{
                    name: listing?.name ?? '',
                    avatarUrl: '', // Provide a default or actual avatar URL if available
                    bio: '', // Provide a default or actual bio if available
                  }}
                  isVerified={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
