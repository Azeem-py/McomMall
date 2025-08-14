// app/page.tsx
'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { List, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { categories, listings } from '@/lib/listing-data';
import FilterSidebar, { type FilterState } from '@/components/FilterSidebar';
import CategoryFilter from '@/components/CategoryFilter';
import ListingCard from '@/components/listingCard';
import { useGetGoogleListings } from '@/service/listings/hook';

const initialFilters: FilterState = {
  searchTerm: '',
  category: 'all',
  location: '',
  radius: 100,
  priceRange: [0, 1000],
};

export default function DirectoryPage() {
  const { isLoading, isSuccess, data } = useGetGoogleListings();

  // The sidebar is off by default
  const [filtersVisible, setFiltersVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] =
    useState<FilterState>(initialFilters);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const listingsPerPage = 4;

  const MapComponent = useMemo(
    () =>
      dynamic(() => import('@/components/MapComponent'), {
        loading: () => (
          <div className="bg-gray-200 w-full h-full animate-pulse" />
        ),
        ssr: false,
      }),
    []
  );

  const handleFilterChange = (newFilters: FilterState) => {
    setActiveFilters(newFilters);
    setCurrentPage(1);
  };

  const filteredListings = useMemo(() => {
    return listings.filter(listing => {
      if (selectedCategory !== 'All' && listing.category !== selectedCategory)
        return false;
      if (
        activeFilters.searchTerm &&
        !listing.title
          .toLowerCase()
          .includes(activeFilters.searchTerm.toLowerCase())
      )
        return false;
      if (
        activeFilters.category !== 'all' &&
        listing.category.toLowerCase() !== activeFilters.category.toLowerCase()
      )
        return false;
      if (
        activeFilters.location &&
        !listing.location
          .toLowerCase()
          .includes(activeFilters.location.toLowerCase())
      )
        return false;
      return true;
    });
  }, [selectedCategory, activeFilters]);

  const totalPages = Math.ceil(filteredListings.length / listingsPerPage);
  const paginatedListings = filteredListings.slice(
    (currentPage - 1) * listingsPerPage,
    currentPage * listingsPerPage
  );

  if (isLoading) return <p>Loading...</p>;

  if (isSuccess)
    return (
      <div className="flex h-screen bg-white overflow-hidden">
        <AnimatePresence>
          {filtersVisible && (
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed inset-0 z-40 md:relative md:w-80 md:h-full md:flex-shrink-0"
            >
              <FilterSidebar
                onFilterChange={handleFilterChange}
                onClose={() => setFiltersVisible(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1 flex flex-col">
          <div className="flex-shrink-0 p-4 border-b bg-white z-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setFiltersVisible(!filtersVisible)}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  {filtersVisible ? 'Hide Filters' : 'Show Filters'}
                </Button>
                <div className="hidden md:flex items-center border rounded-md">
                  <Button variant="ghost" size="icon">
                    <LayoutGrid className="h-5 w-5 text-gray-400" />
                  </Button>
                  <Button variant="ghost" size="icon" className="bg-gray-100">
                    <List className="h-5 w-5 text-red-500" />
                  </Button>
                </div>
              </div>
              <Select defaultValue="newest">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest Listings</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <CategoryFilter
              categories={categories}
              onCategoryChange={category => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {data &&
                  data.map(listing => (
                    <ListingCard key={listing.place_id} listing={listing} />
                  ))}
              </div>
              <div className="flex justify-center items-center mt-8 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  page => (
                    <Button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      size="icon"
                      className={
                        currentPage === page
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                      }
                    >
                      {page}
                    </Button>
                  )
                )}
              </div>
            </div>
            <div className="w-1/3 h-full flex-shrink-0 hidden lg:block">
              <MapComponent listings={filteredListings} />
            </div>
          </div>
        </main>
      </div>
    );
}
