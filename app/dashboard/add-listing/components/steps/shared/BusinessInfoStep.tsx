import React from 'react';
import { ListingFormData } from '../../../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
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

  const shape = (schema as z.ZodObject<z.ZodRawShape>).shape;

  if (fieldName.includes('.')) {
    const [objectName, propertyName] = fieldName.split('.');
    let objectSchema = shape[objectName];
    if (!objectSchema) return true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((objectSchema as any)._def.typeName === 'ZodOptional') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      objectSchema = (objectSchema as any)._def.innerType;
    }

    if (objectSchema && 'shape' in objectSchema) {
      const nestedFieldSchema = (objectSchema as z.ZodObject<z.ZodRawShape>)
        .shape[propertyName];
      if (!nestedFieldSchema) return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (nestedFieldSchema as any)._def.typeName === 'ZodOptional';
    }
    return true;
  }

  const fieldSchema = shape[fieldName];
  if (!fieldSchema) {
    return true;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (fieldSchema as any)._def.typeName === 'ZodOptional';
};

const FormField = ({
  id,
  label,
  tooltip,
  children,
  error,
  isOptional,
}: {
  id: string;
  label: string;
  tooltip: string;
  children: React.ReactNode;
  error?: string;
  isOptional: boolean;
}) => (
  <div className="space-y-2 mb-4">
    <div className="flex items-center space-x-2">
      <Label htmlFor={id}>
        {label}
        {isOptional && (
          <span className="text-muted-foreground font-normal text-sm">
            {' '}
            (optional)
          </span>
        )}
      </Label>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="w-4 h-4 text-muted-foreground cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    {children}
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);

const BusinessInfoStep: React.FC<StepProps> = ({
  formData,
  setFormData,
  errors,
  schema,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      socials: { ...prev.socials, [id]: value },
    }));
  };

  const shortDescLength = formData.shortDesc?.length || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="md:col-span-2">
        <FormField
          id="businessName"
          label="Business Name"
          tooltip="The name your customers will see. Make it catchy!"
          error={errors.businessName}
          isOptional={isFieldOptional(schema!, 'businessName')}
        >
          <Input
            id="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="e.g., The Grand Cafe"
          />
        </FormField>
      </div>

      <FormField
        id="legalName"
        label="Legal Name"
        tooltip="Your official business name, if different from your trading name."
        error={errors.legalName}
        isOptional={isFieldOptional(schema!, 'legalName')}
      >
        <Input
          id="legalName"
          value={formData.legalName || ''}
          onChange={handleChange}
          placeholder="e.g., The Grand Cafe Ltd."
        />
      </FormField>

      <FormField
        id="companyRegNo"
        label="Company Reg. No."
        tooltip="Your official company registration number."
        error={errors.companyRegNo}
        isOptional={isFieldOptional(schema!, 'companyRegNo')}
      >
        <Input
          id="companyRegNo"
          value={formData.companyRegNo || ''}
          onChange={handleChange}
        />
      </FormField>

      <div className="md:col-span-2">
        <FormField
          id="shortDesc"
          label="Short Description"
          tooltip="A brief summary (20-180 characters) that appears in search results."
          error={errors.shortDesc}
          isOptional={isFieldOptional(schema!, 'shortDesc')}
        >
          <Textarea
            id="shortDesc"
            value={formData.shortDesc}
            onChange={handleChange}
            placeholder="e.g., The best place for coffee and cake in town."
            maxLength={180}
          />
          <p className="text-xs text-right text-muted-foreground">
            {shortDescLength} / 180
          </p>
        </FormField>
      </div>

      <div className="md:col-span-2">
        <FormField
          id="longDesc"
          label="Long Description"
          tooltip="A detailed description of your business, its history, and what makes it special."
          error={errors.longDesc}
          isOptional={isFieldOptional(schema!, 'longDesc')}
        >
          <Textarea
            id="longDesc"
            value={formData.longDesc || ''}
            onChange={handleChange}
            rows={5}
          />
        </FormField>
      </div>

      <FormField
        id="phone"
        label="Phone Number"
        tooltip="A valid UK phone number starting with +44."
        error={errors.phone}
        isOptional={isFieldOptional(schema!, 'phone')}
      >
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+447123456789"
        />
      </FormField>

      <FormField
        id="email"
        label="Public Email"
        tooltip="The email address customers can contact you on."
        error={errors.email}
        isOptional={isFieldOptional(schema!, 'email')}
      >
        <Input
          id="email"
          type="email"
          value={formData.email || ''}
          onChange={handleChange}
          placeholder="contact@yourbusiness.com"
        />
      </FormField>

      <FormField
        id="vatNo"
        label="VAT No."
        tooltip="Your business VAT number, if applicable."
        error={errors.vatNo}
        isOptional={isFieldOptional(schema!, 'vatNo')}
      >
        <Input
          id="vatNo"
          value={formData.vatNo || ''}
          onChange={handleChange}
        />
      </FormField>

      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          id="website"
          label="Website"
          tooltip="Your business website. Must start with https://"
          error={errors['socials.website']}
          isOptional={isFieldOptional(schema!, 'socials.website')}
        >
          <Input
            id="website"
            type="url"
            value={formData.socials?.website || ''}
            onChange={handleSocialChange}
            placeholder="https://yourbusiness.com"
          />
        </FormField>
        <FormField
          id="facebook"
          label="Facebook"
          tooltip="Your Facebook page URL."
          error={errors['socials.facebook']}
          isOptional={isFieldOptional(schema!, 'socials.facebook')}
        >
          <Input
            id="facebook"
            type="url"
            value={formData.socials?.facebook || ''}
            onChange={handleSocialChange}
            placeholder="https://facebook.com/yourbusiness"
          />
        </FormField>
        <FormField
          id="instagram"
          label="Instagram"
          tooltip="Your Instagram profile URL."
          error={errors['socials.instagram']}
          isOptional={isFieldOptional(schema!, 'socials.instagram')}
        >
          <Input
            id="instagram"
            type="url"
            value={formData.socials?.instagram || ''}
            onChange={handleSocialChange}
            placeholder="https://instagram.com/yourbusiness"
          />
        </FormField>
        <FormField
          id="twitter"
          label="Twitter"
          tooltip="Your Twitter profile URL."
          error={errors['socials.twitter']}
          isOptional={isFieldOptional(schema!, 'socials.twitter')}
        >
          <Input
            id="twitter"
            type="url"
            value={formData.socials?.twitter || ''}
            onChange={handleSocialChange}
            placeholder="https://twitter.com/yourbusiness"
          />
        </FormField>
        <FormField
          id="youtube"
          label="YouTube"
          tooltip="Your YouTube channel URL."
          error={errors['socials.youtube']}
          isOptional={isFieldOptional(schema!, 'socials.youtube')}
        >
          <Input
            id="youtube"
            type="url"
            value={formData.socials?.youtube || ''}
            onChange={handleSocialChange}
            placeholder="https://youtube.com/yourbusiness"
          />
        </FormField>
        <FormField
          id="linkedin"
          label="LinkedIn"
          tooltip="Your LinkedIn profile URL."
          error={errors['socials.linkedin']}
          isOptional={isFieldOptional(schema!, 'socials.linkedin')}
        >
          <Input
            id="linkedin"
            type="url"
            value={formData.socials?.linkedin || ''}
            onChange={handleSocialChange}
            placeholder="https://linkedin.com/company/yourbusiness"
          />
        </FormField>
      </div>
    </div>
  );
};

export default BusinessInfoStep;
