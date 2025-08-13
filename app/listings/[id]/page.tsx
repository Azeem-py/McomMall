import { Star, Bookmark, CheckCircle, AlertTriangle } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getListingById } from '@/lib/listing-data';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import ImageGallery from '@/components/ImageGallery';
import BookingSidebar from '@/components/BookingSidebar';
import ContentTabs from '@/components/ContentTabs';
import { ClaimBusinessModal } from '@/components/ClaimBusinessModal';

// Define the expected params type
type PageProps = {
  params: Promise<{ id: string }>; // Update to account for Promise
};

export default async function ListingDetailPage({ params }: PageProps) {
  // Resolve the params Promise to get the id
  const { id } = await params;

  const listing = await getListingById(id);

  if (!listing) {
    notFound();
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
                  {listing.categoryTag}
                </span>
                <span className="px-3 py-1 text-xs text-green-700 bg-green-100 rounded-md">
                  {listing.priceDisplay}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900">
                {listing.title}
              </h1>
              <p className="text-md text-gray-500 mt-1">{listing.location}</p>
              <div className="flex items-center space-x-1 mt-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="font-bold">{listing.rating.toFixed(1)}</span>
                <span className="text-gray-500">
                  ({listing.reviewCount} reviews)
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-4">
              <Button variant="outline">
                <Bookmark className="mr-2 h-4 w-4" />
                Bookmark this listing
              </Button>
              {listing.isVerified ? (
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
        <ImageGallery images={listing.images} />

        {/* Main Content Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <ContentTabs listing={listing} />
          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BookingSidebar
                priceDisplay={listing.priceDisplay}
                author={listing.author}
                isVerified={listing.isVerified}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
