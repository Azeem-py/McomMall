'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import * as z from 'zod';
import {
  UploadCloud,
  Plus,
  HelpCircle,
  Settings,
  Box,
  Trash2,
  Link as LinkIcon,
  Download,
} from 'lucide-react';
import React from 'react';

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

// Define the validation schema for the form using Zod
const productFormSchema = z
  .object({
    title: z.string().min(1, { message: 'Product title is required.' }),
    productType: z.enum(['physical', 'downloadable', 'virtual'], {
      message: 'You must select a product type.',
    }),
    category: z.string().min(1, { message: 'Please select a category.' }),
    price: z.coerce
      .number()
      .min(0, { message: 'Price must be a positive number.' }),
    discountedPrice: z.coerce.number().optional(),
    brand: z.string().optional(),
    tags: z.string().optional(),
    shortDescription: z.string().optional(),
    description: z.string().optional(),

    // Physical Product Fields
    sku: z.string().optional(),
    enableStockManagement: z.boolean().default(false),
    stockQuantity: z.coerce.number().optional(),
    lowStockThreshold: z.coerce.number().optional(),
    allowBackorders: z.enum(['no', 'notify', 'yes']).default('no'),
    allowSingleOrder: z.boolean().default(false),
    weight: z.coerce.number().optional(),
    dimensions: z
      .object({
        length: z.coerce.number().optional(),
        width: z.coerce.number().optional(),
        height: z.coerce.number().optional(),
      })
      .optional(),

    // Downloadable Product Fields
    files: z
      .array(
        z.object({
          name: z.string().min(1, 'File name is required.'),
          url: z.string().url('Must be a valid URL.'),
        })
      )
      .optional(),
    downloadLimit: z.coerce.number().optional(),
    downloadExpiry: z.coerce.number().optional(),

    // Virtual Product Fields
    productUrl: z.string().optional(),

    // Other Options
    productStatus: z.enum(['pending', 'published', 'draft']).default('pending'),
    visibility: z.enum(['visible', 'hidden']).default('visible'),
    purchaseNote: z.string().optional(),
    enableReviews: z.boolean().default(true),
  })
  .superRefine((data, ctx) => {
    if (data.productType === 'downloadable') {
      if (!data.files || data.files.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'You must add at least one file for a downloadable product.',
          path: ['files'],
        });
      }
    }
    if (data.productType === 'virtual') {
      if (!data.productUrl) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Product URL is required for virtual products.',
          path: ['productUrl'],
        });
      } else {
        try {
          new URL(data.productUrl);
        } catch (error) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Please enter a valid URL.',
            path: ['productUrl'],
          });
        }
      }
    }
  });

type ProductFormValues = z.infer<typeof productFormSchema>;

export default function AddProductPage() {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
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
      downloadLimit: undefined,
      downloadExpiry: undefined,
      productUrl: '',
      productStatus: 'pending',
      visibility: 'visible',
      purchaseNote: '',
      enableReviews: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'files',
  });

  const productType = form.watch('productType');

  function onSubmit(data: ProductFormValues) {
    console.log('Form submitted successfully:', data);
    // Here you would typically handle the form submission,
    // e.g., send the data to your API.
  }

  return (
    <div className="bg-gray-50 h-fit p-4 sm:p-6 lg:p-8 text-base">
      <div className="max-w-7xl mx-auto">
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
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xl font-semibold">
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
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-lg">
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
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
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
                            </FormItem>
                          )}
                        />
                        <div>
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
                                </FormItem>
                              )}
                            />
                          </div>
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
                        <FormLabel className="text-lg">Files</FormLabel>
                        <div className="space-y-4 mt-2">
                          {fields.map((field, index) => (
                            <div
                              key={field.id}
                              className="grid grid-cols-1 md:grid-cols-[1fr,1fr,auto] gap-4 p-4 border rounded-md"
                            >
                              <FormField
                                control={form.control}
                                name={`files.${index}.name`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-base">
                                      Name
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="File name"
                                        {...field}
                                        className="text-base py-6"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-base" />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`files.${index}.url`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-base">
                                      File URL
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="https://..."
                                        {...field}
                                        className="text-base py-6"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-base" />
                                  </FormItem>
                                )}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => remove(index)}
                                className="self-end text-red-500 hover:text-red-600"
                              >
                                <Trash2 className="h-6 w-6" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="lg"
                          className="mt-4 text-base"
                          onClick={() => append({ name: '', url: '' })}
                        >
                          <Plus className="mr-2 h-5 w-5" /> Add File
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
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
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
                                <SelectItem
                                  value="pending"
                                  className="text-base"
                                >
                                  Pending Review
                                </SelectItem>
                                <SelectItem
                                  value="published"
                                  className="text-base"
                                >
                                  Published
                                </SelectItem>
                                <SelectItem value="draft" className="text-base">
                                  Draft
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
                                  value="visible"
                                  className="text-base"
                                >
                                  Visible
                                </SelectItem>
                                <SelectItem
                                  value="hidden"
                                  className="text-base"
                                >
                                  Hidden
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
                {/* Product Image */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Product Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
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
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                        />
                      </label>
                    </div>
                  </CardContent>
                </Card>

                {/* Category */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="text-base py-6">
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
                className="bg-red-500 hover:bg-red-600 text-white text-lg py-7 px-8"
              >
                Save Product
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
