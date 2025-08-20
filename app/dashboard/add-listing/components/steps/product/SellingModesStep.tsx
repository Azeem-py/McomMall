import React from 'react';
import { ListingFormData } from '../../../types';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface StepProps {
  formData: ListingFormData;
  setFormData: React.Dispatch<React.SetStateAction<ListingFormData>>;
  errors: Record<string, string>;
}

const SellingModesStep: React.FC<StepProps> = ({
  formData,
  setFormData,
  errors,
}) => {
  const productData = formData.productData || {};
  const sellingModes = productData.sellingModes || {
    inStorePickup: false,
    localDelivery: false,
    ukWideShipping: false,
  };
  const storefrontLinks = productData.storefrontLinks || {};

  const handleSellingModeChange = (id: keyof typeof sellingModes, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      productData: {
        ...prev.productData,
        sellingModes: {
          ...sellingModes,
          [id]: checked,
        },
      },
    }));
  };

  const handleProductDataChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { id, value } = e.target;
      setFormData(prev => ({
          ...prev,
          productData: {
              ...prev.productData,
              [id]: value,
          }
      }))
  }

  const handleStorefrontLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData(prev => ({
          ...prev,
          productData: {
              ...prev.productData,
              storefrontLinks: {
                  ...storefrontLinks,
                  [id]: value,
              }
          }
      }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Selling Modes</CardTitle>
          <CardDescription>
            Select at least one way you get products to customers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStorePickup"
              checked={sellingModes.inStorePickup}
              onCheckedChange={(checked) => handleSellingModeChange('inStorePickup', !!checked)}
            />
            <Label htmlFor="inStorePickup">In-store Pickup</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="localDelivery"
              checked={sellingModes.localDelivery}
              onCheckedChange={(checked) => handleSellingModeChange('localDelivery', !!checked)}
            />
            <Label htmlFor="localDelivery">Local Delivery</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="ukWideShipping"
              checked={sellingModes.ukWideShipping}
              onCheckedChange={(checked) => handleSellingModeChange('ukWideShipping', !!checked)}
            />
            <Label htmlFor="ukWideShipping">UK-wide Shipping</Label>
          </div>
          {errors['productData.sellingModes'] && <p className="text-sm text-red-500">{errors['productData.sellingModes']}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="fulfilmentNotes">Fulfilment Notes</Label>
            <Textarea
              id="fulfilmentNotes"
              value={productData.fulfilmentNotes || ''}
              onChange={handleProductDataChange}
              placeholder="e.g., We deliver on Tuesdays and Fridays between 9am-5pm."
            />
          </div>
          <div>
            <Label htmlFor="returnsPolicy">Returns Policy</Label>
            <Textarea
              id="returnsPolicy"
              value={productData.returnsPolicy || ''}
              onChange={handleProductDataChange}
              placeholder="e.g., 30-day returns accepted for unopened products."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>External Storefronts</CardTitle>
            <CardDescription>Link to your stores on other platforms.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <Label htmlFor="amazon">Amazon Store</Label>
                <Input id="amazon" placeholder="https://amazon.co.uk/your-store" value={storefrontLinks.amazon || ''} onChange={handleStorefrontLinkChange} />
            </div>
            <div>
                <Label htmlFor="ebay">eBay Store</Label>
                <Input id="ebay" placeholder="https://ebay.co.uk/usr/your-store" value={storefrontLinks.ebay || ''} onChange={handleStorefrontLinkChange} />
            </div>
            <div>
                <Label htmlFor="etsy">Etsy Shop</Label>
                <Input id="etsy" placeholder="https://etsy.com/shop/your-shop" value={storefrontLinks.etsy || ''} onChange={handleStorefrontLinkChange} />
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellingModesStep;
