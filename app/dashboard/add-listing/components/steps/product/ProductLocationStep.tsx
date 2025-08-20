import React from 'react';
import { ListingFormData } from '../../../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface StepProps {
  formData: ListingFormData;
  setFormData: React.Dispatch<React.SetStateAction<ListingFormData>>;
  errors: Record<string, string>;
}

const ProductLocationStep: React.FC<StepProps> = ({
  formData,
  setFormData,
  errors,
}) => {
  const productData = formData.productData || {};
  const deliveryArea = productData.deliveryArea || { type: 'radius', value: '' };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, you would likely have separate fields for address lines, city, etc.
    // For this example, we'll use a single address field.
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      // This assumes a general address field on the main formData, adjust if needed
      [id]: value,
    }));
  };

  const handleProductDataChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      productData: {
        ...prev.productData,
        [key]: value,
      },
    }));
  };

  const handleDeliveryAreaTypeChange = (type: 'radius' | 'postcodes') => {
    handleProductDataChange('deliveryArea', { ...deliveryArea, type });
  };

  const handleDeliveryAreaValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleProductDataChange('deliveryArea', { ...deliveryArea, value: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="address">Business Address (Manual Entry)</Label>
        <div className="space-y-2 mt-2">
            <Input
                id="address"
                placeholder="e.g., 123 High Street, London, SW1A 1AA"
                value={formData.address || ''}
                onChange={handleAddressChange}
            />
        </div>
        <div className="flex items-center space-x-2 mt-4">
          <Switch
            id="showAddressPublicly"
            checked={productData.showAddressPublicly !== false}
            onCheckedChange={(checked) => handleProductDataChange('showAddressPublicly', checked)}
          />
          <Label htmlFor="showAddressPublicly">Show address publicly</Label>
        </div>
        {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
      </div>

      <div className="border-t pt-6">
        <div className="flex items-center space-x-2">
          <Label>Optional: Set Delivery Area</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Define where you can deliver your products.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <RadioGroup
          value={deliveryArea.type}
          onValueChange={handleDeliveryAreaTypeChange}
          className="mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="radius" id="radius" />
            <Label htmlFor="radius">By radius (in miles)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="postcodes" id="postcodes" />
            <Label htmlFor="postcodes">By list of postcodes</Label>
          </div>
        </RadioGroup>

        <div className="mt-4">
          {deliveryArea.type === 'radius' ? (
            <Input
              placeholder="e.g., 10"
              type="number"
              value={deliveryArea.value}
              onChange={handleDeliveryAreaValueChange}
            />
          ) : (
            <Input
              placeholder="e.g., SW1A, WC2N, SE1"
              value={deliveryArea.value}
              onChange={handleDeliveryAreaValueChange}
            />
          )}
        </div>
        {errors['productData.deliveryArea'] && (
            <p className="text-sm text-red-500 mt-1">{errors['productData.deliveryArea']}</p>
        )}
      </div>
    </div>
  );
};

export default ProductLocationStep;
