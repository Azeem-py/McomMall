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

interface StepProps {
  formData: ListingFormData;
  setFormData: React.Dispatch<React.SetStateAction<ListingFormData>>;
  errors: Record<string, string>;
}

const FormField = ({
  id,
  label,
  tooltip,
  children,
  error,
}: {
  id: string;
  label: string;
  tooltip: string;
  children: React.ReactNode;
  error?: string;
}) => (
  <div className="space-y-2">
    <div className="flex items-center space-x-2">
      <Label htmlFor={id}>{label}</Label>
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
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

const BusinessInfoStep: React.FC<StepProps> = ({
  formData,
  setFormData,
  errors,
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <FormField
          id="businessName"
          label="Business Name (Required)"
          tooltip="The name your customers will see. Make it catchy!"
          error={errors.businessName}
        >
          <Input
            id="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="e.g., The Grand Cafe"
            required
          />
        </FormField>
      </div>

      <FormField
        id="legalName"
        label="Legal Name"
        tooltip="Your official business name, if different from your trading name."
        error={errors.legalName}
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
          label="Short Description (Required)"
          tooltip="A brief summary (20-180 characters) that appears in search results."
          error={errors.shortDesc}
        >
          <Textarea
            id="shortDesc"
            value={formData.shortDesc}
            onChange={handleChange}
            placeholder="e.g., The best place for coffee and cake in town."
            maxLength={180}
            required
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
        label="Phone Number (Required, UK)"
        tooltip="A valid UK phone number starting with +44."
        error={errors.phone}
      >
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+447123456789"
          required
        />
      </FormField>

      <FormField
        id="email"
        label="Public Email"
        tooltip="The email address customers can contact you on."
        error={errors.email}
      >
        <Input
          id="email"
          type="email"
          value={formData.email || ''}
          onChange={handleChange}
          placeholder="contact@yourbusiness.com"
        />
      </FormField>

      <div className="md:col-span-2">
        <FormField
          id="website"
          label="Website"
          tooltip="Your business website. Must start with https://"
          error={errors.website}
        >
          <Input
            id="website"
            type="url"
            value={formData.socials.website || ''}
            onChange={handleSocialChange}
            placeholder="https://yourbusiness.com"
          />
        </FormField>
      </div>
    </div>
  );
};

export default BusinessInfoStep;
