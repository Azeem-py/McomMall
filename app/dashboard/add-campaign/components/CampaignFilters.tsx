'use client';
import { AdFormData, FormErrors, SearchableSelectItem } from '../types';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { HelpCircle, MapPin, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import React from 'react';

interface CampaignFiltersProps {
  formData: AdFormData;
  setFormData: React.Dispatch<React.SetStateAction<AdFormData>>;
  categories: SearchableSelectItem[];
  regions: SearchableSelectItem[];
}

// Reusable Tooltip Component
const InfoTooltip = ({ message }: { message: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <HelpCircle className="h-4 w-4 text-gray-400 cursor-pointer" />
      </TooltipTrigger>
      <TooltipContent className="bg-orange-800 text-white border-orange-800">
        <p>{message}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

// Reusable Searchable Select (Combobox)
const SearchableSelect = ({
  open,
  setOpen,
  value,
  setValue,
  items,
  placeholder,
  notFoundMessage,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  items: { value: string; label: string }[];
  placeholder: string;
  notFoundMessage: string;
}) => (
  <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="w-full justify-between font-normal"
      >
        {value
          ? items.find(
              (item: { value: string; label: string }) => item.value === value
            )?.label
          : placeholder}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
      <Command>
        <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
        <CommandEmpty>{notFoundMessage}</CommandEmpty>
        <CommandGroup>
          {items.map((item: { value: string; label: string }) => (
            <CommandItem
              key={item.value}
              value={item.value}
              onSelect={currentValue => {
                setValue(currentValue === value ? '' : currentValue);
                setOpen(false);
              }}
            >
              <Check
                className={cn(
                  'mr-2 h-4 w-4',
                  value === item.value ? 'opacity-100' : 'opacity-0'
                )}
              />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </Command>
    </PopoverContent>
  </Popover>
);

export const CampaignFilters = ({
  formData,
  setFormData,
  categories,
  regions,
}: CampaignFiltersProps) => {
  const [openCategory, setOpenCategory] = React.useState(false);
  const [openRegion, setOpenRegion] = React.useState(false);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
        <Settings2 size={24} />
        Campaign Filters
      </h2>
      <div className="bg-blue-50 text-blue-700 p-3 rounded-md text-sm mb-6">
        Filters apply only to sidebar and search results placement options
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
            Display only if category{' '}
            <InfoTooltip message="Show ad only on these category pages." />
          </label>
          <SearchableSelect
            open={openCategory}
            setOpen={setOpenCategory}
            value={formData.category}
            setValue={val =>
              setFormData(prev => ({
                ...prev,
                category: typeof val === 'string' ? val : prev.category,
              }))
            }
            items={categories}
            placeholder="Choose Category"
            notFoundMessage="No category found."
          />
        </div>

        {/* Region */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
            Display only if region{' '}
            <InfoTooltip message="Show ad only to users in this region." />
          </label>
          <SearchableSelect
            open={openRegion}
            setOpen={setOpenRegion}
            value={formData.region}
            setValue={val =>
              setFormData(prev => ({
                ...prev,
                region: typeof val === 'string' ? val : prev.region,
              }))
            }
            items={regions}
            placeholder="Choose region"
            notFoundMessage="No region found."
          />
        </div>

        {/* Location Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
            Display only for location search{' '}
            <InfoTooltip message="Show ad for specific location searches." />
          </label>
          <div className="relative">
            <Input
              type="text"
              placeholder="e.g., Downtown Zurich"
              value={formData.locationSearch}
              onChange={e =>
                setFormData(prev => ({
                  ...prev,
                  locationSearch: e.target.value,
                }))
              }
              className="pl-10"
            />
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Logged in users */}
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md border">
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-1.5">
            Enable only for logged in users{' '}
            <InfoTooltip message="Restrict ad visibility to logged-in users." />
          </label>
          <Switch
            checked={formData.forLoggedInUsers}
            onCheckedChange={checked =>
              setFormData(prev => ({ ...prev, forLoggedInUsers: checked }))
            }
          />
        </div>
      </div>
    </div>
  );
};
