'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  MapPin,
  Edit,
  Trash2,
  Calendar,
  Building2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useDeleteListing, useGetUserListings } from '@/service/listings/hook';
import { UserListing } from '@/service/listings/types';
import GoogleLogo from '@/app/components/GoogleLogo';
import { GoogleVerificationModal } from '@/components/GoogleVerificationModal';
import { useClaimBusiness } from '@/service/auth/hook';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';

// --- Type Definitions ---

type Listing = UserListing;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'primary' | 'ghost';
  children: React.ReactNode;
};

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

type CardProps = React.HTMLAttributes<HTMLDivElement>;

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

type ListingCardProps = {
  listing: Listing;
  onVerifyClick: (listingId: string) => void;
};

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

// --- Reusable UI Components (shadcn/ui style) ---

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';
  const variants = {
    default: 'bg-slate-200 text-slate-900 hover:bg-slate-300',
    primary: 'bg-pink-600 text-white hover:bg-pink-700',
    ghost: 'hover:bg-slate-100 hover:text-slate-900',
  };
  return (
    <button
      className={`${baseClasses} ${variants[variant]} px-4 py-2`}
      {...props}
    >
      {children}
    </button>
  );
};

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={`rounded-xl border bg-white text-slate-900 shadow ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// --- Reusable Components ---

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => (
  <div className="relative w-full max-w-xs">
    <Input
      type="text"
      placeholder="Search listing"
      className="pl-10"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
    />
    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
  </div>
);

const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  onVerifyClick,
  onDeleteClick,
}) => {
  const [imgSrc, setImgSrc] = useState(listing.logoUrl);
  const router = useRouter();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={cardVariants}>
      <Card className="w-full overflow-hidden">
        <div className="flex flex-col md:flex-row items-start gap-6 p-4">
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={listing.businessName}
              width={128}
              height={128}
              className="h-32 w-full md:h-32 md:w-32 rounded-lg object-cover bg-slate-200"
              onError={() => {
                setImgSrc(null);
              }}
            />
          ) : (
            <div className="h-32 w-full md:h-32 md:w-32 rounded-lg bg-slate-200 flex items-center justify-center">
              <Building2 className="h-16 w-16 text-slate-400" />
            </div>
          )}
          <div className="flex-grow">
            <h3 className="text-lg font-bold text-slate-800">
              {listing.businessName}
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {listing.listingType.map(type => (
                <Badge key={type} variant="secondary">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Badge>
              ))}
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>{listing.location.addressLine1}</span>
            </div>
          </div>
          <div className="flex w-full shrink-0 flex-col items-end justify-between gap-2 md:w-auto">
            <div className="flex flex-row items-center gap-2">
              <Button
                variant="ghost"
                className="p-2"
                onClick={() =>
                  router.push(`/dashboard/edit-listing/${listing.id}`)
                }
              >
                <Edit className="h-5 w-5 text-slate-500" />
              </Button>
              <Button
                variant="ghost"
                className="p-2"
                onClick={() => onDeleteClick(listing.id)}
              >
                <Trash2 className="h-5 w-5 text-red-500" />
              </Button>
            </div>
            {!listing.isGoogleVerified && (
              <Button
                variant="primary"
                className="px-3 py-2 mt-2 bg-blue-600 text-white font-medium rounded-lg flex items-center justify-center cursor-pointer"
                onClick={() => onVerifyClick(listing.id)}
              >
                <GoogleLogo className="mr-2 h-4 w-4" />
                <p className="te">Verify with Google</p>
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers: (number | string)[] = [];
  const maxPagesToShow = 5;

  if (totalPages <= maxPagesToShow) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pageNumbers.push(1, 2, 3, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      pageNumbers.push(
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages
      );
    }
  }

  return (
    <nav className="flex items-center justify-center gap-2">
      <Button
        variant="ghost"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-2"
      >
        &lt;
      </Button>
      {pageNumbers.map((num, index) => (
        <Button
          key={index}
          variant={num === currentPage ? 'primary' : 'ghost'}
          onClick={() => typeof num === 'number' && onPageChange(num)}
          disabled={typeof num !== 'number'}
          className={`px-4 py-2 ${
            num === currentPage ? 'bg-slate-800 text-white' : 'bg-white'
          }`}
        >
          {num}
        </Button>
      ))}
      <Button
        variant="ghost"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-2"
      >
        &gt;
      </Button>
    </nav>
  );
};

// --- Main Page Component ---

export default function MyListingsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(
    null
  );
  const [modalPlaceId, setModalPlaceId] = useState('');
  const itemsPerPage = 5;

  const {
    data: listingsData,
    isLoading,
    isError,
    error,
  } = useGetUserListings();
  const { mutate: claimBusiness } = useClaimBusiness();
  const { mutate: deleteListing } = useDeleteListing();

  const handleVerifyClick = (listingId: string) => {
    setSelectedListingId(listingId);
    setModalPlaceId('');
    setIsVerificationModalOpen(true);
  };

  const handleDeleteClick = (listingId: string) => {
    setSelectedListingId(listingId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedListingId) {
      deleteListing(selectedListingId);
      setIsDeleteDialogOpen(false);
      setSelectedListingId(null);
    }
  };

  const handleModalContinue = () => {
    if (modalPlaceId) {
      claimBusiness({ place_id: modalPlaceId });
      setIsVerificationModalOpen(false);
      setSelectedListingId(null);
      setModalPlaceId('');
    }
  };

  const filteredListings = useMemo(() => {
    if (!listingsData) return [];
    if (!searchTerm) return listingsData;
    return listingsData.filter(
      (listing: Listing) =>
        listing.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.addressLine1
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, listingsData]);

  const paginatedListings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredListings.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredListings]);

  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <h1 className="text-3xl font-bold text-slate-800">My Listings</h1>
            <p className="text-sm text-slate-500">Home &gt; Dashboard</p>
          </div>
        </header>

        {/* Main Content */}
        <div className="rounded-xl border bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <h2 className="text-lg font-semibold">Pending Listings</h2>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>

          <motion.div
            className="mt-6 space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {isLoading ? (
              <div className="py-12 text-center text-slate-500">
                <p>Loading...</p>
              </div>
            ) : isError ? (
              <div className="py-12 text-center text-red-500">
                <p>Error fetching listings: {error?.message}</p>
              </div>
            ) : paginatedListings.length > 0 ? (
              paginatedListings.map((listing: Listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onVerifyClick={handleVerifyClick}
                  onDeleteClick={handleDeleteClick}
                />
              ))
            ) : (
              <div className="py-12 text-center text-slate-500">
                <p>
                  {searchTerm
                    ? `No listings found for "${searchTerm}".`
                    : 'You have no listings yet.'}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Pagination and Submit Button */}
        <footer className="mt-8 flex flex-col items-center justify-between gap-6 sm:flex-row">
          {totalPages > 1 && (
            <div className="flex-grow flex justify-center sm:justify-start">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
          <div className="w-full sm:w-auto">
            <Button
              variant="primary"
              className="w-full bg-orange-600 px-3 py-3 rounded-xl text-white font-medium"
            >
              Submit New Listing
            </Button>
          </div>
        </footer>
      </main>
      <GoogleVerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        onContinue={handleModalContinue}
        placeId={modalPlaceId}
        onPlaceIdChange={setModalPlaceId}
      />
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              listing and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Yes, I'm sure
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
