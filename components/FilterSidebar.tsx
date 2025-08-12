'use client';

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
import { Calendar, MapPin, Search } from 'lucide-react';

export default function FilterSidebar() {
  return (
    <aside className="h-full lg:w-80 flex-shrink-0 hidden lg:block p-4 space-y-6 bg-white border-r">
      <h2 className="text-xl font-bold">Filters</h2>

      <div>
        <Label htmlFor="search">AI Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            id="search"
            placeholder="Search for anything..."
            className="pl-10"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="category">All Categories</Label>
        <Select>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apartments">Apartments</SelectItem>
            <SelectItem value="cars">Cars</SelectItem>
            <SelectItem value="services">Services</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input id="location" placeholder="New York, USA" className="pl-10" />
        </div>
      </div>

      <div>
        <Label htmlFor="check-in">Check-In - Check-Out</Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input id="check-in" placeholder="Select dates" className="pl-10" />
        </div>
      </div>

      <div>
        <Label>Radius around selected destination</Label>
        <Slider defaultValue={[50]} max={100} step={1} />
        <p className="text-sm text-gray-500 mt-2">50km</p>
      </div>

      <div>
        <Label>Price Filter</Label>
        <Slider defaultValue={[20, 500]} max={1000} step={10} />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>$20</span>
          <span>$500</span>
        </div>
      </div>

      <Button className="w-full bg-red-500 hover:bg-red-600">
        Apply Filters
      </Button>
    </aside>
  );
}
