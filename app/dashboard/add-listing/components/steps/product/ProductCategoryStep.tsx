import React, { useState } from 'react';
import { ListingFormData } from '../../../types';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface StepProps {
  formData: ListingFormData;
  setFormData: React.Dispatch<React.SetStateAction<ListingFormData>>;
  errors: Record<string, string>;
}

// Mock data - in a real app, this would come from an API
const categories = {
  'Electronics': ['Smartphones', 'Laptops', 'Cameras', 'Headphones'],
  'Fashion': ['T-shirts', 'Jeans', 'Dresses', 'Shoes'],
  'Home & Garden': ['Furniture', 'Lighting', 'Gardening Tools'],
  'Books': ['Fiction', 'Non-fiction', 'Sci-Fi', 'Biographies'],
};

const ProductCategoryStep: React.FC<StepProps> = ({
  formData,
  setFormData,
  errors,
}) => {
  const [availableSubcategories, setAvailableSubcategories] = useState<string[]>([]);

  const productData = formData.productData || {};
  const selectedSubcategories = productData.subCategories || [];

  const handlePrimaryCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      productData: {
        ...prev.productData,
        primaryCategory: value,
        subCategories: [], // Reset subcategories when primary changes
      },
    }));
    setAvailableSubcategories(categories[value as keyof typeof categories] || []);
  };

  const handleSubcategorySelect = (subcategory: string) => {
    if (selectedSubcategories.length < 3 && !selectedSubcategories.includes(subcategory)) {
      const newSubcategories = [...selectedSubcategories, subcategory];
      setFormData(prev => ({
        ...prev,
        productData: {
          ...prev.productData,
          subCategories: newSubcategories,
        },
      }));
    }
  };

  const handleSubcategoryRemove = (subcategory: string) => {
    const newSubcategories = selectedSubcategories.filter(s => s !== subcategory);
    setFormData(prev => ({
      ...prev,
      productData: {
        ...prev.productData,
        subCategories: newSubcategories,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="primaryCategory">Primary Category (Required)</Label>
        <Select
          value={productData.primaryCategory}
          onValueChange={handlePrimaryCategoryChange}
        >
          <SelectTrigger id="primaryCategory">
            <SelectValue placeholder="Select a primary category" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(categories).map(cat => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors['productData.primaryCategory'] && (
          <p className="text-sm text-red-500">{errors['productData.primaryCategory']}</p>
        )}
      </div>

      <div>
        <Label>Subcategories (Optional, up to 3)</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
              disabled={!productData.primaryCategory}
            >
              Select subcategories...
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
            <Command>
              <CommandInput placeholder="Search subcategories..." />
              <CommandList>
                {availableSubcategories.map(sub => (
                  <CommandItem
                    key={sub}
                    onSelect={() => handleSubcategorySelect(sub)}
                    disabled={selectedSubcategories.includes(sub)}
                    className="cursor-pointer"
                  >
                    {sub}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedSubcategories.map(sub => (
            <Badge key={sub} variant="secondary">
              {sub}
              <button
                onClick={() => handleSubcategoryRemove(sub)}
                className="ml-2 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
        </div>
        {!productData.primaryCategory && (
          <p className="text-xs text-muted-foreground mt-1">
            Please select a primary category to see available subcategories.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCategoryStep;
