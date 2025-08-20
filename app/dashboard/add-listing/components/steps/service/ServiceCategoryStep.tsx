import React from 'react';
import { ListingFormData } from '../../../types';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface StepProps {
  formData: ListingFormData;
  setFormData: React.Dispatch<React.SetStateAction<ListingFormData>>;
  errors: Record<string, string>;
}

// Mock data
const serviceCategories = [
  'Plumbing',
  'Electrical',
  'Consulting',
  'Cleaning',
  'Landscaping',
  'Hairdressing',
  'Tutoring',
];

const ServiceCategoryStep: React.FC<StepProps> = ({
  formData,
  setFormData,
  errors,
}) => {
  const serviceData = formData.serviceData || {};

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      serviceData: {
        ...prev.serviceData,
        tradeCategory: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="tradeCategory">Trade/Industry Category (Required)</Label>
        <Select
          value={serviceData.tradeCategory}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger id="tradeCategory">
            <SelectValue placeholder="Select your trade or industry" />
          </SelectTrigger>
          <SelectContent>
            {serviceCategories.map(cat => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors['serviceData.tradeCategory'] && (
          <p className="text-sm text-red-500">{errors['serviceData.tradeCategory']}</p>
        )}
      </div>
    </div>
  );
};

export default ServiceCategoryStep;
