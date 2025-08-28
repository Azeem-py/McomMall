import React from 'react';
import { ListingFormData, Media } from '../../../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info, UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { cn } from '@/lib/utils';

interface StepProps {
  formData: ListingFormData;
  setFormData: React.Dispatch<React.SetStateAction<ListingFormData>>;
  errors: Record<string, string>;
  schema?: z.ZodSchema<unknown>;
}

interface ImageUploadProps {
  id: 'logo' | 'banner';
  label: string;
  recommendedSize: string;
  value: Media | null;
  onChange: (id: 'logo' | 'banner', value: Media | null) => void;
  error?: string;
  isOptional: boolean;
  isBanner?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  id,
  label,
  recommendedSize,
  value,
  onChange,
  error,
  isOptional,
  isBanner = false,
}) => {
  const [preview, setPreview] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (value?.file) {
      const newPreview = URL.createObjectURL(value.file);
      setPreview(newPreview);
      return () => URL.revokeObjectURL(newPreview);
    } else if (value?.url) {
      setPreview(value.url);
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(id, { file, altText: value?.altText || '' });
    }
  };

  const handleAltTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id, {
      file: value?.file,
      url: value?.url,
      altText: e.target.value,
    });
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Label htmlFor={`${id}-alt`}>
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
              <p>Recommended size: {recommendedSize}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div
        className={cn(
          'flex flex-col gap-4',
          isBanner ? 'w-full' : 'md:flex-row'
        )}
      >
        <div
          className={cn(
            'relative border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/50 cursor-pointer hover:border-orange-700 transition-colors',
            isBanner ? 'w-full h-64' : 'w-48 h-48 flex-shrink-0'
          )}
          onClick={() => fileInputRef.current?.click()}
        >
          {preview ? (
            <Image
              src={preview}
              alt={value?.altText || 'Image preview'}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          ) : (
            <div className="text-center text-muted-foreground p-4">
              <UploadCloud className="mx-auto w-10 h-10" />
              <p className="mt-2 text-sm">
                Click to upload an image
              </p>
            </div>
          )}
          <Input
            ref={fileInputRef}
            id={`${id}-file-upload`}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
            className="sr-only"
          />
        </div>
        <div className="flex-grow space-y-2">
          <Label htmlFor={`${id}-alt`}>
            Alt Text{' '}
            <span className="text-muted-foreground font-normal text-sm">
              (optional)
            </span>
          </Label>
          <Input
            id={`${id}-alt`}
            value={value?.altText || ''}
            onChange={handleAltTextChange}
            placeholder="A descriptive caption for the image"
          />
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

const MediaStep: React.FC<StepProps> = ({
  formData,
  setFormData,
  errors,
}) => {
  const handleMediaChange = (id: 'logo' | 'banner', value: Media | null) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="space-y-8">
      <ImageUpload
        id="logo"
        label="Business Logo"
        recommendedSize="512x512px"
        value={formData.logo}
        onChange={handleMediaChange}
        error={errors.logo}
        isOptional={true}
      />
      <ImageUpload
        id="banner"
        label="Business Banner"
        recommendedSize="1600x600px"
        value={formData.banner}
        onChange={handleMediaChange}
        error={errors.banner}
        isOptional={true}
        isBanner={true}
      />
    </div>
  );
};

export default MediaStep;
