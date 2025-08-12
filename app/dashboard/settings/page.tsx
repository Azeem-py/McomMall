// app/dashboard/settings/page.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, ControllerRenderProps } from 'react-hook-form';
import * as z from 'zod';
import { useState, ChangeEvent } from 'react';
import type { FC } from 'react'; // Import FC for component type

// Import Shadcn UI Components
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

// 1. Define the validation schema with Zod
const storeSettingsSchema = z.object({
  storeName: z.string().min(2, {
    message: 'Store name must be at least 2 characters.',
  }),
  addressStreet: z.string().min(1, 'Street is required.'),
  addressStreet2: z.string().optional(),
  city: z.string().min(1, 'City is required.'),
  postCode: z.string().min(1, 'Post/ZIP code is required.'),
  country: z.string().min(1, 'Please select a country.'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits.')
    .regex(/^\+?[0-9\s-]{10,}$/, 'Please enter a valid phone number.'),
  email: z.string().email('Please enter a valid email address.'),
  showEmail: z.boolean().default(false).optional(),
  hasOpenCloseTime: z.boolean().default(false).optional(),
  // For file uploads, we handle validation separately but define the type
  // Explicitly type `val` as `unknown` to avoid implicit `any`
  banner: z
    .custom<File | null>(
      (val: unknown) => val instanceof File || val === null,
      {
        message: 'Banner image is required',
      }
    )
    .nullable(),
  profilePicture: z
    .custom<File | null>(
      (val: unknown) => val instanceof File || val === null,
      {
        message: 'Profile picture is required',
      }
    )
    .nullable(),
});

// Infer the TypeScript type from the schema
type StoreSettingsFormValues = z.infer<typeof storeSettingsSchema>;

// Main Page Component
const StoreDashboardPage: FC = () => {
  // 2. State for file previews
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  // 3. Define the form using react-hook-form
  const form = useForm<StoreSettingsFormValues>({
    resolver: zodResolver(storeSettingsSchema),
    defaultValues: {
      storeName: 'Tom Smiths Store',
      addressStreet: 'Test',
      addressStreet2: '',
      city: 'Test',
      postCode: 'Test',
      country: 'Poland',
      phone: '123123123',
      email: 'store@example.com',
      showEmail: false,
      hasOpenCloseTime: false,
      banner: null,
      profilePicture: null,
    },
    mode: 'onChange', // Validate on input change
  });

  // 4. Handle file input changes and create previews
  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: 'banner' | 'profilePicture'
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (field === 'banner') {
          setBannerPreview(reader.result as string);
          form.setValue('banner', file);
        } else if (field === 'profilePicture') {
          setProfilePreview(reader.result as string);
          form.setValue('profilePicture', file);
        }
        form.trigger(field); // Manually trigger validation for the file field
      };
      reader.readAsDataURL(file);
    } else {
      if (field === 'banner') {
        setBannerPreview(null);
        form.setValue('banner', null);
      } else if (field === 'profilePicture') {
        setProfilePreview(null);
        form.setValue('profilePicture', null);
      }
    }
  };

  // 5. Define the submit handler
  function onSubmit(data: StoreSettingsFormValues) {
    // When all validation is well, log the data
    console.log('Form submitted successfully!');
    console.log({
      ...data,
      banner: data.banner?.name, // logging file name for demonstration
      profilePicture: data.profilePicture?.name,
    });
    alert(
      'Form is valid! Check the console for the submitted data. (JSON.stringify(data, null, 2))'
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Store Dashboard</h1>
        <Breadcrumb className="mt-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-2xl">Settings</CardTitle>
          <Button
            type="submit"
            form="store-settings-form"
            className="mt-4 sm:mt-0"
            disabled={!form.formState.isValid}
          >
            Update Settings
          </Button>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="store-settings-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              {/* Banner Upload Section */}
              <FormField
                control={form.control}
                name="banner"
                render={() => (
                  <FormItem>
                    <FormLabel>Banner</FormLabel>
                    <FormControl>
                      <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-center p-4 relative">
                        {bannerPreview ? (
                          <Image
                            src={bannerPreview}
                            alt="Banner preview"
                            className="absolute inset-0 w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <>
                            <UploadCloud className="w-12 h-12 text-gray-400 mb-2" />
                            <p className="text-gray-500 mb-1">
                              Upload a banner for your store.
                            </p>
                            <p className="text-sm text-gray-400">
                              Banner size is (625x300) pixels.
                            </p>
                          </>
                        )}
                        <Input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={e => handleFileChange(e, 'banner')}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Profile Picture Upload Section */}
              <FormField
                control={form.control}
                name="profilePicture"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    StoreSettingsFormValues,
                    'profilePicture'
                  >;
                }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <FormLabel className="w-full sm:w-1/4 mb-2 sm:mb-0">
                      Profile Picture
                    </FormLabel>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center relative overflow-hidden border">
                        {profilePreview ? (
                          <img
                            src={profilePreview}
                            alt="Profile preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      <Button type="button" variant="outline" asChild>
                        <label className="cursor-pointer">
                          Upload Photo
                          <Input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e =>
                              handleFileChange(e, 'profilePicture')
                            }
                          />
                        </label>
                      </Button>
                    </div>
                    <FormMessage className="sm:ml-auto mt-2 sm:mt-0" />
                  </FormItem>
                )}
              />

              {/* Store Name */}
              <FormField
                control={form.control}
                name="storeName"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    StoreSettingsFormValues,
                    'storeName'
                  >;
                }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <FormLabel className="w-full sm:w-1/4">
                      Store Name
                    </FormLabel>
                    <FormControl className="flex-1">
                      <Input placeholder="Your Store Name" {...field} />
                    </FormControl>
                    <FormMessage className="sm:ml-auto" />
                  </FormItem>
                )}
              />

              {/* Address Fields */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="addressStreet"
                  render={({
                    field,
                  }: {
                    field: ControllerRenderProps<
                      StoreSettingsFormValues,
                      'addressStreet'
                    >;
                  }) => (
                    <FormItem className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                      <FormLabel className="w-full sm:w-1/4">Address</FormLabel>
                      <FormControl className="flex-1">
                        <Input placeholder="Street" {...field} />
                      </FormControl>
                      <FormMessage className="sm:ml-auto" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="addressStreet2"
                  render={({
                    field,
                  }: {
                    field: ControllerRenderProps<
                      StoreSettingsFormValues,
                      'addressStreet2'
                    >;
                  }) => (
                    <FormItem className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                      <FormLabel className="w-full sm:w-1/4">
                        Street 2 (Optional)
                      </FormLabel>
                      <FormControl className="flex-1">
                        <Input
                          placeholder="Apartment, suite, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="sm:ml-auto" />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col sm:flex-row sm:gap-4 sm:ml-[25%]">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({
                      field,
                    }: {
                      field: ControllerRenderProps<
                        StoreSettingsFormValues,
                        'city'
                      >;
                    }) => (
                      <FormItem className="flex-1 mt-4 sm:mt-0">
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postCode"
                    render={({
                      field,
                    }: {
                      field: ControllerRenderProps<
                        StoreSettingsFormValues,
                        'postCode'
                      >;
                    }) => (
                      <FormItem className="flex-1 mt-4 sm:mt-0">
                        <FormLabel>Post/ZIP Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Post/ZIP Code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="country"
                  render={({
                    field,
                  }: {
                    field: ControllerRenderProps<
                      StoreSettingsFormValues,
                      'country'
                    >;
                  }) => (
                    <FormItem className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                      <FormLabel className="w-full sm:w-1/4">
                        Country *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="flex-1">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Poland">Poland</SelectItem>
                          <SelectItem value="United Kingdom">
                            United Kingdom
                          </SelectItem>
                          <SelectItem value="United States">
                            United States
                          </SelectItem>
                          <SelectItem value="Germany">Germany</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="sm:ml-auto" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Phone and Email */}
              <FormField
                control={form.control}
                name="phone"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    StoreSettingsFormValues,
                    'phone'
                  >;
                }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <FormLabel className="w-full sm:w-1/4">Phone No</FormLabel>
                    <FormControl className="flex-1">
                      <Input
                        type="tel"
                        placeholder="Your Phone Number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="sm:ml-auto" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    StoreSettingsFormValues,
                    'email'
                  >;
                }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <FormLabel className="w-full sm:w-1/4">Email</FormLabel>
                    <FormControl className="flex-1">
                      <Input
                        type="email"
                        placeholder="Your Contact Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="sm:ml-auto" />
                  </FormItem>
                )}
              />

              {/* Store Policies */}
              <div className="space-y-4 sm:ml-[25%]">
                <FormField
                  control={form.control}
                  name="showEmail"
                  render={({
                    field,
                  }: {
                    field: ControllerRenderProps<
                      StoreSettingsFormValues,
                      'showEmail'
                    >;
                  }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Show email address in store</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hasOpenCloseTime"
                  render={({
                    field,
                  }: {
                    field: ControllerRenderProps<
                      StoreSettingsFormValues,
                      'hasOpenCloseTime'
                    >;
                  }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Store has open close time</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoreDashboardPage;
