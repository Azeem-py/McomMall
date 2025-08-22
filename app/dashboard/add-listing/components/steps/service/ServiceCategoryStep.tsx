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
import { z } from 'zod';

interface StepProps {
  formData: ListingFormData;
  setFormData: React.Dispatch<React.SetStateAction<ListingFormData>>;
  errors: Record<string, string>;
  schema?: z.ZodSchema<unknown>;
}

const isFieldOptional = (schema: z.ZodSchema<unknown>, fieldName: string) => {
    if (!schema || !('shape' in schema)) {
      return true; // Default to optional if schema is not as expected
    }
    const fieldSchema = (schema as z.ZodObject<z.ZodRawShape>).shape[fieldName];
    if (!fieldSchema) {
        return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (fieldSchema as any)._def.typeName === 'ZodOptional';
  };

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
  schema,
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
        <Label htmlFor="tradeCategory">
            Trade/Industry Category
            {isFieldOptional(schema!, 'serviceData.tradeCategory') && (
                <span className="text-muted-foreground font-normal text-sm">
                    {' '}
                    (optional)
                </span>
            )}
        </Label>
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
