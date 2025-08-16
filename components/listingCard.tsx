'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  MapPin,
  Star,
  Heart,
  Wifi,
  ParkingSquare,
  Zap,
  Gauge,
  CheckCircle,
} from 'lucide-react';
import { Amenity, Listing } from '@/lib/listing-data';
import Link from 'next/link';
import { GooglePlaceResult } from '@/service/listings/types';

// Helper objects to map amenities to icons and tooltips
const amenityIcons: Record<Amenity, React.ReactNode> = {
  wifi: <Wifi className="w-4 h-4 text-gray-500" />,
  parking: <ParkingSquare className="w-4 h-4 text-gray-500" />,
  power: <Zap className="w-4 h-4 text-gray-500" />,
  transmission: <Gauge className="w-4 h-4 text-gray-500" />,
  storage: <Gauge className="w-4 h-4 text-gray-500" />,
  condition: <Gauge className="w-4 h-4 text-gray-500" />,
  remote: <Gauge className="w-4 h-4 text-gray-500" />,
  pets: <Gauge className="w-4 h-4 text-gray-500" />,
};

const amenityTooltips: Record<Amenity, string> = {
  wifi: 'Free WiFi',
  parking: 'Parking Available',
  power: '443 Power (hp)',
  transmission: '8-speed PDK',
  storage: 'Ample Storage',
  condition: 'Excellent Condition',
  remote: 'Remote Start',
  pets: 'Pet Friendly',
};

export default function ListingCard({
  listing,
}: {
  listing: GooglePlaceResult;
}) {
  let imgUrl;

  if (listing.photos) {
    const { photo_reference } = listing?.photos[0];
    const API_URL =
      process.env.NEXT_PUBLIC_API_URL ||
      'https://mcom-mall-api.vercel.app/api/v1';
    imgUrl = `${API_URL}/listings/photo/${photo_reference}`;
  } else {
    imgUrl =
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
  }

  console.log(listing.photos);
  return (
    <Link href={`/listings/${listing.place_id}`} className="block">
      <Card className="w-full overflow-hidden shadow-md border rounded-xl hover:shadow-xl transition-shadow duration-300">
        <div className="relative">
          {/* Category Tag */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 text-xs text-white bg-red-500 rounded-md">
              {listing.types[0]}
            </span>
          </div>

          {/* Wishlist Button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-md">
                  <Heart className="w-5 h-5 text-gray-700" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to Wishlist</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Listing Image */}
          <Image
            src={imgUrl}
            alt={listing.name}
            width={400}
            height={250}
            className="object-cover w-full h-56"
          />
        </div>

        {/* Card Content */}
        <CardContent className="p-4 bg-white">
          <h3 className="text-lg font-bold truncate text-gray-800">
            {listing.name}
          </h3>
          {false && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Verified Listing</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="truncate">{listing.vicinity}</span>
          </div>

          {/* Amenities */}
          {/* <div className="flex items-center space-x-3 my-4">
            <TooltipProvider>
              {listing.amenities.map(amenity => (
                <Tooltip key={amenity}>
                  <TooltipTrigger>{amenityIcons[amenity]}</TooltipTrigger>
                  <TooltipContent>
                    <p>{amenityTooltips[amenity]}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div> */}

          {/* Rating and Price */}
          <div className="flex justify-between items-center pt-3 border-t">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-sm font-semibold ml-1">
                {listing.rating?.toFixed(1)}
              </span>
              <span className="text-sm text-gray-500 ml-1">
                ({listing.user_ratings_total})
              </span>
            </div>
            <p className="text-base font-semibold text-gray-900">
              {listing.price_level}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
