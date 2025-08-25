'use client';

import {
  useForm,
  useFieldArray,
  FieldErrors,
  FieldError,
} from 'react-hook-form';
import { useGetUserListings } from '@/service/listings/hook';
import {
  UploadCloud,
  Plus,
  Settings,
  Box,
  Trash2,
  Link as LinkIcon,
  Download,
} from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { useAddProduct } from '@/service/store/products/hook';
import { SuccessDialog } from '../components/SuccessDialog';
import { CreateProductDto } from '@/service/store/products/types';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface Listing {
  id: string;
  businessName: string;
}

interface ProductFormValues {
  title: string;
  productType: 'physical' | 'downloadable' | 'virtual';
  category: string;
  price: number;
  discountedPrice?: number;
  brand: string;
  tags: string;
  shortDescription: string;
  description: string;
  sku: string;
  enableStockManagement: boolean;
  stockQuantity?: number;
  lowStockThreshold?: number;
  allowBackorders: 'no' | 'notify' | 'yes';
  allowSingleOrder: boolean;
  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };
  files?: { fileList: FileList | null }[];
  downloadLimit?: number;
  downloadExpiry?: number;
  productUrl?: string;
  productStatus: 'draft' | 'published' | 'archived';
  visibility: 'public' | 'private' | 'password-protected';
  purchaseNote?: string;
  enableReviews: boolean;
  productImage: FileList | null;
  businessId?: string;
}

const customResolver = (data: ProductFormValues) => {
  const errors: FieldErrors<ProductFormValues> = {};

  if (!data.title.trim()) {
    errors.title = { type: 'required', message: 'Product title is required.' };
  }
  if (!data.productType) {
    errors.productType = {
      type: 'required',
      message: 'You must select a product type.',
    };
  }
  if (!data.category.trim()) {
    errors.category = {
      type: 'required',
      message: 'Please select a category.',
    };
  }
  if (data.price === undefined || data.price < 0) {
    errors.price = {
      type: 'min',
      message: 'Price must be a positive number.',
    };
  }
  if (!data.brand.trim()) {
    errors.brand = { type: 'required', message: 'Brand is required.' };
  }
  if (!data.tags.trim()) {
    errors.tags = { type: 'required', message: 'Tags are required.' };
  }
  if (!data.shortDescription.trim()) {
    errors.shortDescription = {
      type: 'required',
      message: 'Short description is required.',
    };
  }
  if (!data.description.trim()) {
    errors.description = {
      type: 'required',
      message: 'Description is required.',
    };
  }
  if (!data.sku.trim()) {
    errors.sku = { type: 'required', message: 'SKU is required.' };
  }
  if (data.enableStockManagement && data.stockQuantity === undefined) {
    errors.stockQuantity = {
      type: 'required',
      message: 'Stock quantity is required when stock management is enabled.',
    };
  }
  if (data.productType === 'physical' && data.weight === undefined) {
    errors.weight = {
      type: 'required',
      message: 'Weight is required for physical products.',
    };
  }
  if (data.productType === 'physical') {
    const dimErrors: {
      length?: FieldError;
      width?: FieldError;
      height?: FieldError;
    } = {};
    if (data.dimensions?.length === undefined) {
      dimErrors.length = { type: 'required', message: 'Length is required.' };
    }
    if (data.dimensions?.width === undefined) {
      dimErrors.width = { type: 'required', message: 'Width is required.' };
    }
    if (data.dimensions?.height === undefined) {
      dimErrors.height = { type: 'required', message: 'Height is required.' };
    }
    if (Object.keys(dimErrors).length > 0) {
      errors.dimensions = dimErrors;
    }
  }
  if (!data.productImage) {
    errors.productImage = {
      type: 'required',
      message: 'Product image is required.',
    };
  }
  if (!data.businessId) {
    errors.businessId = {
      type: 'required',
      message: 'Please select a business.',
    };
  }

  if (data.productType === 'downloadable') {
    if (
      !data.files ||
      data.files.length === 0 ||
      data.files.every(f => f === null)
    ) {
      errors.files = {
        type: 'required',
        message: 'You must add at least one file for a downloadable product.',
      };
    } else {
      let totalSize = 0;
      data.files.forEach(fileObject => {
        if (fileObject && fileObject.fileList) {
          Array.from(fileObject.fileList).forEach(file => {
            totalSize += file.size;
          });
        }
      });

      if (totalSize > 100 * 1024 * 1024) {
        (errors.files as { root?: FieldError }).root = {
          type: 'maxSize',
          message: 'Total file size cannot exceed 100 MB.',
        };
      }
    }
  }

  if (data.productType === 'virtual') {
    if (!data.productUrl || data.productUrl.trim() === '') {
      errors.productUrl = {
        type: 'required',
        message: 'Product URL is required for virtual products.',
      };
    } else {
      try {
        new URL(data.productUrl);
      } catch {
        errors.productUrl = {
          type: 'pattern',
          message: 'Please enter a valid URL.',
        };
      }
    }
  }

  return {
    values: Object.keys(errors).length > 0 ? {} : data,
    errors: errors,
  };
};

export default function AddProductPage() {
  const router = useRouter();
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const form = useForm<ProductFormValues>({
    resolver: customResolver,
    defaultValues: {
      title: '',
      productType: 'physical',
      category: '',
      price: 0,
      discountedPrice: undefined,
      brand: '',
      tags: '',
      shortDescription: '',
      description: '',
      sku: '',
      enableStockManagement: false,
      stockQuantity: undefined,
      lowStockThreshold: undefined,
      allowBackorders: 'no',
      allowSingleOrder: false,
      weight: undefined,
      dimensions: {
        length: undefined,
        width: undefined,
        height: undefined,
      },
      files: [],
      productStatus: 'draft',
      visibility: 'public',
      purchaseNote: '',
      enableReviews: true,
      productImage: null,
      businessId: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'files',
  });

  const { data: userListings, isLoading: isLoadingListings } =
    useGetUserListings();

  const { mutate: addProduct, isPending } = useAddProduct();

  const productType = form.watch('productType');

  async function onSubmit(data: ProductFormValues) {
    const productData: CreateProductDto = {
      bussinessId: data.businessId as string,
      title: data.title,
      category: data.category,
      productType: data.productType,
      price: Number(data.price),
      description: data.description,
      sku: data.sku,
      shortDescription: data.shortDescription,
      imageUrl: `https://source.unsplash.com/random/800x600?sig=${Math.random()}`,
      productUrl: data.productUrl,
      fileUrls: [], // Note: file uploads not handled in this implementation
      downloadLimit: data.downloadLimit
        ? Number(data.downloadLimit)
        : undefined,
      downloadExpiry: data.downloadExpiry
        ? Number(data.downloadExpiry)
        : undefined,
      enableStockManagement: data.enableStockManagement,
      weight: data.weight ? Number(data.weight) : undefined,
      length: data.dimensions?.length
        ? Number(data.dimensions.length)
        : undefined,
      width: data.dimensions?.width ? Number(data.dimensions.width) : undefined,
      height: data.dimensions?.height
        ? Number(data.dimensions.height)
        : undefined,
      productStatus: data.productStatus,
      visibility: data.visibility,
      purchaseNote: data.purchaseNote,
      enableReviews: data.enableReviews,
      tags: data.tags.split(',').map(tag => tag.trim()),
    };

    addProduct(productData, {
      onSuccess: () => {
        form.reset();
        setIsSuccessDialogOpen(true);
      },
      onError: (error: Error) => {
        console.error('Failed to save product:', error);
        toast.error(
          error.message || 'Failed to save product. Please try again.',
          {
            style: {
              minWidth: '300px',
              minHeight: '60px',
              fontSize: '1.25rem',
              backgroundColor: 'hsl(var(--destructive))',
              color: 'hsl(var(--destructive-foreground))',
            },
          }
        );
      },
    });
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8 text-base">
      <div className="max-w-7xl mx-auto">
        <SuccessDialog
          open={isSuccessDialogOpen}
          onOpenChange={setIsSuccessDialogOpen}
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Add New Product
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Product Title */}
                <Card>
                  <CardContent className="p-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field, fieldState: { error } }) => (
                        <FormItem>
                          <FormLabel
                            className={cn(
                              'text-xl font-semibold',
                              error && 'text-red-500'
                            )}
                          >
                            Title
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter product title"
                              {...field}
                              className="text-base py-6"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-base font-medium" />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Product Data Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Product Data</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="productType"
                      render={({ field, fieldState: { error } }) => (
                        <FormItem className="space-y-3">
                          <FormLabel
                            className={cn('text-lg', error && 'text-red-500')}
                          >
                            Product Type
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="physical" />
                                </FormControl>
                                <FormLabel className="font-normal text-base">
                                  Physical
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="downloadable" />
                                </FormControl>
                                <FormLabel className="font-normal text-base">
                                  Downloadable
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="virtual" />
                                </FormControl>
                                <FormLabel className="font-normal text-base">
                                  Virtual
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage className="text-red-500 text-base font-medium" />
                        </FormItem>
                      )}
                    />

                    {/* Pricing */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field, fieldState: { error } }) => (
                          <FormItem>
                            <FormLabel
                              className={cn(
                                'text-base',
                                error && 'text-red-500'
                              )}
                            >
                              Price ($)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0.00"
                                {...field}
                                className="text-base py-6"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 text-base font-medium" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="discountedPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
                              Discounted Price ($)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0.00"
                                {...field}
                                className="text-base py-6"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 text-base font-medium" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Short Description */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      Short Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="shortDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Write a short description for the product..."
                              className="min-h-[150px] text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-base font-medium" />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Description */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Provide a detailed description of the product..."
                              className="min-h-[200px] text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-base font-medium" />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Conditional Sections based on Product Type */}
                {productType === 'physical' && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <Box className="w-6 h-6" /> Inventory & Shipping
                      </CardTitle>
                      <CardDescription className="text-base">
                        Manage inventory and shipping details for this product.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="sku"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
                              SKU (Stock Keeping Unit)
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., TSHIRT-RED-L"
                                {...field}
                                className="text-base py-6"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="enableStockManagement"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-base">
                              Enable product stock management
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      {form.watch('enableStockManagement') && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                          <FormField
                            control={form.control}
                            name="stockQuantity"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base">
                                  Stock quantity
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="0"
                                    {...field}
                                    className="text-base py-6"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500 text-base font-medium" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="lowStockThreshold"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base">
                                  Low stock threshold
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="0"
                                    {...field}
                                    className="text-base py-6"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="allowBackorders"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base">
                                  Allow Backorders?
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="text-base py-6">
                                      <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem
                                      value="no"
                                      className="text-base"
                                    >
                                      Do not allow
                                    </SelectItem>
                                    <SelectItem
                                      value="notify"
                                      className="text-base"
                                    >
                                      Allow, but notify customer
                                    </SelectItem>
                                    <SelectItem
                                      value="yes"
                                      className="text-base"
                                    >
                                      Allow
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />
                          <div className="md:col-span-2">
                            <FormField
                              control={form.control}
                              name="allowSingleOrder"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0 mt-4">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal text-base">
                                    Allow only one quantity of this product to
                                    be bought in a single order
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}
                      <div className="space-y-4 pt-4 border-t">
                        <FormLabel className="text-lg">Shipping</FormLabel>
                        <FormField
                          control={form.control}
                          name="weight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-normal text-base">
                                Weight (kg)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="0"
                                  {...field}
                                  className="text-base py-6"
                                />
                              </FormControl>
                              <FormMessage className="text-red-500 text-base font-medium" />
                            </FormItem>
                          )}
                        />
                        <div>
                          <FormField
                            control={form.control}
                            name="dimensions"
                            render={() => (
                              <FormItem>
                                <FormLabel className="font-normal text-base">
                                  Dimensions (cm)
                                </FormLabel>
                                <div className="grid grid-cols-3 gap-4 mt-2">
                                  <FormField
                                    control={form.control}
                                    name="dimensions.length"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input
                                            type="number"
                                            placeholder="Length"
                                            {...field}
                                            className="text-base py-6"
                                          />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-base font-medium" />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="dimensions.width"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input
                                            type="number"
                                            placeholder="Width"
                                            {...field}
                                            className="text-base py-6"
                                          />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-base font-medium" />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="dimensions.height"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input
                                            type="number"
                                            placeholder="Height"
                                            {...field}
                                            className="text-base py-6"
                                          />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-base font-medium" />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {productType === 'downloadable' && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <Download className="w-6 h-6" />
                        Downloadable Options
                      </CardTitle>
                      <CardDescription className="text-base">
                        Configure your downloadable product settings.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <FormLabel
                          className={cn(
                            'text-lg',
                            form.formState.errors.files && 'text-red-500'
                          )}
                        >
                          Files
                        </FormLabel>
                        <div className="space-y-4 mt-2">
                          {fields.map((field, index) => (
                            <div
                              key={field.id}
                              className="flex items-center gap-4 p-4 border rounded-md"
                            >
                              <FormField
                                control={form.control}
                                name={`files.${index}.fileList`}
                                render={({
                                  field: { onChange, value, ...rest },
                                }) => (
                                  <div className="w-full">
                                    <div className="flex items-center gap-4">
                                      <Input
                                        type="file"
                                        multiple
                                        {...rest}
                                        onChange={event => {
                                          onChange(event.target.files);
                                        }}
                                        className="w-full"
                                      />
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => remove(index)}
                                        className="text-red-500 hover:text-red-600"
                                      >
                                        <Trash2 className="h-6 w-6" />
                                      </Button>
                                    </div>
                                    {value instanceof FileList &&
                                      value.length > 0 &&
                                      Array.from(value).map((file: File) => (
                                        <div
                                          key={file.name}
                                          className="text-sm text-gray-500 mt-2"
                                        >
                                          {file.name} (
                                          {(file.size / 1024 / 1024).toFixed(2)}{' '}
                                          MB)
                                        </div>
                                      ))}
                                  </div>
                                )}
                              />
                            </div>
                          ))}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="lg"
                          className="mt-4 text-base"
                          onClick={() => append({ fileList: null })}
                        >
                          <Plus className="mr-2 h-5 w-5" /> Add More Files
                        </Button>
                        <FormMessage className="text-red-500 text-base font-medium mt-2">
                          {form.formState.errors.files?.message}
                        </FormMessage>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                        <FormField
                          control={form.control}
                          name="downloadLimit"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base">
                                Download Limit
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="-1"
                                  {...field}
                                  className="text-base py-6"
                                />
                              </FormControl>
                              <FormDescription className="text-sm">
                                Leave blank or -1 for unlimited.
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="downloadExpiry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base">
                                Download Expiry
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="-1"
                                  {...field}
                                  className="text-base py-6"
                                />
                              </FormControl>
                              <FormDescription className="text-sm">
                                Enter number of days. Leave blank or -1 for
                                never.
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {productType === 'virtual' && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <LinkIcon className="w-6 h-6" />
                        Virtual Product
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="productUrl"
                        render={({ field, fieldState: { error } }) => (
                          <FormItem>
                            <FormLabel
                              className={cn(
                                'text-base',
                                error && 'text-red-500'
                              )}
                            >
                              Product URL
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://example.com/virtual-product"
                                {...field}
                                className="text-base py-6"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 text-base font-medium" />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                )}

                {/* Other Options */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Settings className="w-6 h-6" /> Other Options
                    </CardTitle>
                    <CardDescription className="text-base">
                      Set your extra product options.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="productStatus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
                              Product Status
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="text-base py-6">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="draft" className="text-base">
                                  Draft
                                </SelectItem>
                                <SelectItem
                                  value="published"
                                  className="text-base"
                                >
                                  Published
                                </SelectItem>
                                <SelectItem
                                  value="archived"
                                  className="text-base"
                                >
                                  Archived
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="visibility"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
                              Visibility
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="text-base py-6">
                                  <SelectValue placeholder="Select visibility" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem
                                  value="public"
                                  className="text-base"
                                >
                                  Public
                                </SelectItem>
                                <SelectItem
                                  value="private"
                                  className="text-base"
                                >
                                  Private
                                </SelectItem>
                                <SelectItem
                                  value="password-protected"
                                  className="text-base"
                                >
                                  Password Protected
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="purchaseNote"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">
                            Purchase Note
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Customer will get this info in their order email."
                              {...field}
                              className="text-base"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="enableReviews"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-base">
                            Enable product reviews
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Column */}
              <div className="space-y-8">
                {/* Business Listing */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Business</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="businessId"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={isLoadingListings}
                          >
                            <FormControl>
                              <SelectTrigger className="text-base py-6">
                                <SelectValue placeholder="Select a business" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {isLoadingListings ? (
                                <SelectItem value="loading" disabled>
                                  Loading businesses...
                                </SelectItem>
                              ) : (
                                userListings?.map((listing: Listing) => (
                                  <SelectItem
                                    key={listing.id}
                                    value={listing.id}
                                  >
                                    {listing.businessName}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500 text-base font-medium" />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Product Image */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Product Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="productImage"
                      render={({ field: { onChange, value, ...rest } }) => (
                        <>
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="dropzone-file"
                              className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                            >
                              {value?.[0] ? (
                                <Image
                                  src={URL.createObjectURL(value[0])}
                                  alt="Product preview"
                                  layout="fill"
                                  objectFit="cover"
                                  className="rounded-lg"
                                />
                              ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <UploadCloud className="w-12 h-12 mb-4 text-gray-400" />
                                  <p className="mb-2 text-base text-gray-500">
                                    <span className="font-semibold">
                                      Click to upload
                                    </span>{' '}
                                    or drag and drop
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                                  </p>
                                </div>
                              )}
                              <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                {...rest}
                                onChange={event => {
                                  onChange(event.target.files);
                                }}
                              />
                            </label>
                          </div>
                          <FormMessage className="text-red-500 text-base font-medium" />
                        </>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Category */}
                <Card>
                  <CardContent className="pt-6">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field, fieldState: { error } }) => (
                        <FormItem>
                          <FormLabel
                            className={cn(
                              'text-2xl font-semibold',
                              error && 'text-red-500'
                            )}
                          >
                            Category
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="text-base py-6 w-full">
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem
                                value="uncategorized"
                                className="text-base"
                              >
                                Uncategorized
                              </SelectItem>
                              <SelectItem
                                value="electronics"
                                className="text-base"
                              >
                                Electronics
                              </SelectItem>
                              <SelectItem
                                value="clothing"
                                className="text-base"
                              >
                                Clothing
                              </SelectItem>
                              <SelectItem value="books" className="text-base">
                                Books
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500 text-base font-medium" />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Brand */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Brand</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="brand"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="text-base py-6">
                                <SelectValue placeholder="Select brand" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="apple" className="text-base">
                                Apple
                              </SelectItem>
                              <SelectItem value="samsung" className="text-base">
                                Samsung
                              </SelectItem>
                              <SelectItem value="nike" className="text-base">
                                Nike
                              </SelectItem>
                              <SelectItem value="adidas" className="text-base">
                                Adidas
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500 text-base font-medium" />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Tags */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="e.g., summer, new, sale"
                              {...field}
                              className="text-base py-6"
                            />
                          </FormControl>
                          <FormDescription className="text-sm">
                            Separate tags with commas.
                          </FormDescription>
                          <FormMessage className="text-red-500 text-base font-medium" />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Submission Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                size="lg"
                className="bg-red-500 hover:bg-red-600 text-white text-lg py-7 px-8 flex items-center"
                disabled={isPending}
              >
                {isPending ? 'Saving...' : 'Save Product'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
