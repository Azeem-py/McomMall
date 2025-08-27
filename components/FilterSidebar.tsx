// app/components/FilterSidebar.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { MapPin, Search, X } from 'lucide-react';

export type FilterState = {
  searchTerm: string;
  category: string;
  location: string;
  radius: number;
  priceRange: [number, number];
};

interface FilterSidebarProps {
  onFilterChange: (filters: FilterState) => void;
  onClose: () => void;
}

export default function FilterSidebar({
  onFilterChange,
  onClose,
}: FilterSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState([50]);
  const [priceRange, setPriceRange] = useState([20, 500]);

  const handleApplyFilters = () => {
    let query = searchTerm;
    if (location) {
      query = `${searchTerm} in ${location}`;
    }
    onFilterChange({
      searchTerm: query,
      category,
      location,
      radius: radius[0],
      priceRange: [priceRange[0] ?? 0, priceRange[1] ?? 0] as [number, number],
    });
    onClose();
  };

  return (
    <aside className="relative h-full w-full flex flex-col bg-gray-50 border-r">
      {/* This button is only visible on mobile and closes the sidebar */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 md:hidden"
      >
        <X className="h-6 w-6" />
      </Button>

      <div className="p-3">
        <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
        <div className="flex-1 overflow-y-auto pr-4 -mr-4 space-y-7">
          <div>
            <Label
              htmlFor="search"
              className="text-sm font-medium text-gray-600"
            >
              AI Search
            </Label>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="search"
                placeholder="Search for anything..."
                className="pl-10 focus-visible:ring-red-500"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <Label
              htmlFor="category"
              className="text-sm font-medium text-gray-600"
            >
              All Categories
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category" className="mt-2 focus:ring-red-500">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="apartments">Apartments</SelectItem>
                <SelectItem value="cars">Cars</SelectItem>
                <SelectItem value="services">Services</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div>
            <Label
              htmlFor="location"
              className="text-sm font-medium text-gray-600"
            >
              Location
            </Label>
            <div className="relative mt-2">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="location"
                placeholder="Type in a location..."
                className="pl-10 focus-visible:ring-red-500"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </div>
          </div>

          {/* Radius Slider */}
          <div>
            <Label className="text-sm font-medium text-gray-600">
              Radius around destination
            </Label>
            <Slider
              value={radius}
              onValueChange={setRadius}
              max={100}
              step={1}
              className="mt-3"
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              {radius[0]}km
            </p>
          </div>
        </div>

        <div className="pt-6 mt-4 border-t">
          <Button
            onClick={handleApplyFilters}
            className="w-full bg-red-500 text-base font-semibold text-white hover:bg-red-600 transition-colors"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </aside>
  );
}
