'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Edit, Trash2, Calendar } from 'lucide-react';
import Image from 'next/image';

// --- Type Definitions ---

type Listing = {
  id: number;
  title: string;
  location: string;
  imageUrl: string;
};

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

// --- Data (Mock Listings) ---

const listingsData: Listing[] = [
  {
    id: 1,
    title: 'io',
    location: 'Northampton County, Pennsylvania, Verenigde Staten',
    imageUrl: 'https://placehold.co/200x200/e2e8f0/e2e8f0',
  },
  {
    id: 2,
    title: 'Maxime voluptate rer',
    location: 'Enim vero sunt qui',
    imageUrl: 'https://placehold.co/200x200/e2e8f0/e2e8f0',
  },
  {
    id: 3,
    title: 'TESTE',
    location: 'Anterior Lemos 585',
    imageUrl: "https://placehold.co/200x200/000000/ffffff?text=SELK'NAM",
  },
  {
    id: 4,
    title: 'test',
    location: 'Lahore',
    imageUrl: 'https://placehold.co/200x200/9333ea/ffffff?text=35+Ways',
  },
  {
    id: 5,
    title: 'MR',
    location: '46 AKASIA',
    imageUrl: 'https://placehold.co/200x200/e2e8f0/e2e8f0',
  },
  {
    id: 6,
    title: 'gghh',
    location: 'Never/not set',
    imageUrl: 'https://placehold.co/200x200/e2e8f0/e2e8f0',
  },
  {
    id: 7,
    title: 'bnrtbtrb',
    location: 'Pilane Masia, Gaza, Zona Sul, Mocambique',
    imageUrl: 'https://placehold.co/200x200/3b82f6/ffffff?text=Interior',
  },
  {
    id: 8,
    title: 'The GuestHouse',
    location: 'Never/not set',
    imageUrl: 'https://placehold.co/200x200/e2e8f0/e2e8f0',
  },
  {
    id: 9,
    title: 'Blino Tech Soluxions',
    location: '1st avenue, waterdal, De Aar, 7000',
    imageUrl: 'https://placehold.co/200x200/e2e8f0/e2e8f0',
  },
  {
    id: 10,
    title: 'Modern Apartment',
    location: 'Downtown, Metropolis',
    imageUrl: 'https://placehold.co/200x200/10b981/ffffff?text=Modern',
  },
  {
    id: 11,
    title: 'Cozy Cottage',
    location: 'Green Valley, Suburbia',
    imageUrl: 'https://placehold.co/200x200/f97316/ffffff?text=Cozy',
  },
  {
    id: 12,
    title: 'Beachfront Villa',
    location: 'Sunset Beach, Coastline',
    imageUrl: 'https://placehold.co/200x200/0ea5e9/ffffff?text=Beach',
  },
];

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

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const [imgSrc, setImgSrc] = useState(listing.imageUrl);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={cardVariants}>
      <Card className="w-full overflow-hidden">
        <div className="flex flex-col md:flex-row items-start gap-6 p-4">
          <Image
            src={imgSrc}
            alt={listing.title}
            width={128}
            height={128}
            className="h-32 w-full md:h-32 md:w-32 rounded-lg object-cover bg-slate-200"
            onError={() => {
              setImgSrc(
                'https://placehold.co/128x128/e2e8f0/64748b?text=Error'
              );
            }}
          />
          <div className="flex-grow">
            <h3 className="text-lg font-bold text-slate-800">
              {listing.title}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>{listing.location}</span>
            </div>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
              <Calendar className="h-3 w-3" />
              <span>Expiring: Never/not set</span>
            </div>
          </div>
          <div className="flex w-full shrink-0 flex-row items-center justify-end gap-2 md:w-auto">
            <Button variant="default" className="text-xs px-3 py-1.5">
              iCal
            </Button>
            <Button variant="default" className="text-xs px-3 py-1.5">
              <Edit className="mr-1 h-3 w-3" /> Edit
            </Button>
            <Button variant="default" className="text-xs px-3 py-1.5">
              <Trash2 className="mr-1 h-3 w-3" /> Delete
            </Button>
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
  const itemsPerPage = 5;

  const filteredListings = useMemo(() => {
    if (!searchTerm) return listingsData;
    return listingsData.filter(
      listing =>
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

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
            {paginatedListings.length > 0 ? (
              paginatedListings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))
            ) : (
              <div className="py-12 text-center text-slate-500">
                <p>No listings found for &quot;{searchTerm}&quot;.</p>
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
            <Button variant="primary" className="w-full">
              Submit New Listing
            </Button>
          </div>
        </footer>
      </main>
    </div>
  );
}
