'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// --- TYPE DEFINITIONS ---
interface SettingsState {
  giftNotification: {
    enable: boolean;
    subject: string;
    heading: string;
    type: 'html' | 'plain';
  };
  redeemNotification: {
    enable: boolean;
    recipients: string;
    enableCustomer: boolean;
    enableVendor: boolean;
    subject: string;
    heading: string;
    type: 'html' | 'plain';
  };
}

// --- MAIN COMPONENT ---
export default function GiftNotificationSettings() {
  const [settings, setSettings] = useState<SettingsState>({
    giftNotification: {
      enable: true,
      subject: 'You have received a voucher from {first_name} {last_name}',
      heading: 'Gift Notification',
      type: 'html',
    },
    redeemNotification: {
      enable: true,
      recipients: 'wpweb101@gmail.com',
      enableCustomer: false,
      enableVendor: false,
      subject: 'Voucher code has been redeemed',
      heading: 'Voucher Code Redeemed',
      type: 'html',
    },
  });

  const handleSettingChange = (
    section: keyof SettingsState,
    key: string,
    value: string | boolean
  ) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const giftTemplatePath =
    'woocommerce-pdf-vouchers/includes/templates/emails/gift-notification.php';
  const redeemTemplatePath =
    'woocommerce-pdf-vouchers/includes/templates/emails/vou-redeem-notification.php';

  const copyToClipboard = (path: string) => {
    console.log('Copied to clipboard:', path);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        {/* Gift Notification Section */}
        <div className="p-6 border-b">
          <h1 className="text-3xl font-bold text-gray-800">
            Gift Notification
          </h1>
          <p className="text-base text-gray-600 mt-1">
            Gift notification email will be sent to customer chosen recipient(s)
            when their order gets access to downloads.
          </p>
        </div>
        <div className="space-y-8 p-6">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="enable-gift-notification"
              checked={settings.giftNotification.enable}
              onCheckedChange={checked =>
                handleSettingChange('giftNotification', 'enable', !!checked)
              }
            />
            <Label
              htmlFor="enable-gift-notification"
              className="font-semibold text-base"
            >
              Enable this email notification
            </Label>
          </div>

          <div>
            <Label htmlFor="gift-subject" className="font-semibold text-base">
              Subject
            </Label>
            <Input
              id="gift-subject"
              value={settings.giftNotification.subject}
              onChange={e =>
                handleSettingChange(
                  'giftNotification',
                  'subject',
                  e.target.value
                )
              }
              className="mt-1 text-base"
            />
            <p className="text-base text-gray-500 mt-2 leading-relaxed">
              This is the subject line for the gift notification email.
              Available template tags for subject fields are: <br />
              <code className="text-sm bg-gray-200 p-1 rounded">
                {'{first_name}'}
              </code>{' '}
              - displays the first name of customer <br />
              <code className="text-sm bg-gray-200 p-1 rounded">
                {'{last_name}'}
              </code>{' '}
              - displays the last name of customer <br />
              <code className="text-sm bg-gray-200 p-1 rounded">
                {'{recipient_name}'}
              </code>{' '}
              - displays the recipient name
            </p>
          </div>

          <div>
            <Label
              htmlFor="gift-email-heading"
              className="font-semibold text-base"
            >
              Email Heading
            </Label>
            <Input
              id="gift-email-heading"
              value={settings.giftNotification.heading}
              onChange={e =>
                handleSettingChange(
                  'giftNotification',
                  'heading',
                  e.target.value
                )
              }
              className="mt-1 text-base"
            />
            <p className="text-base text-gray-500 mt-2">
              {
                'This controls the main heading contained within the email notification. Leave blank to use the default heading: "Gift Notification".'
              }
            </p>
          </div>

          <div>
            <Label
              htmlFor="gift-email-type"
              className="font-semibold text-base"
            >
              Email type
            </Label>
            <Select
              value={settings.giftNotification.type}
              onValueChange={(value: 'html' | 'plain') =>
                handleSettingChange('giftNotification', 'type', value)
              }
            >
              <SelectTrigger className="w-full sm:w-64 mt-1 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="html" className="text-base">
                  HTML
                </SelectItem>
                <SelectItem value="plain" className="text-base">
                  Plain text
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-base text-gray-500 mt-2">
              Choose which format of email to send.
            </p>
          </div>

          <div>
            <Label className="font-semibold text-base">HTML template</Label>
            <p className="text-base text-gray-500 mt-2 leading-relaxed">
              To override and edit this email template copy{' '}
              <code className="text-sm bg-gray-200 p-1 rounded">
                {giftTemplatePath}
              </code>{' '}
              to your theme folder:{' '}
              <code className="text-sm bg-gray-200 p-1 rounded">
                twentytwelve-child/woocommerce/emails/gift-notification.php
              </code>
              .
            </p>
            <div className="flex gap-2 mt-3">
              <Button
                variant="outline"
                onClick={() => copyToClipboard(giftTemplatePath)}
                className="text-base"
              >
                Copy file to theme
              </Button>
              <Button variant="outline" className="text-base">
                View template
              </Button>
            </div>
          </div>
        </div>

        {/* Voucher Redeem Notification Section */}
        <div className="p-6 border-t">
          <h1 className="text-3xl font-bold text-gray-800">
            Voucher Redeem Notification
          </h1>
          <p className="text-base text-gray-600 mt-1">
            Voucher Redeem Notification Email are sent to chosen recipient(s)
            when a voucher code is redeemed.
          </p>
        </div>
        <div className="space-y-8 p-6">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="enable-redeem-notification"
              checked={settings.redeemNotification.enable}
              onCheckedChange={checked =>
                handleSettingChange('redeemNotification', 'enable', !!checked)
              }
            />
            <Label
              htmlFor="enable-redeem-notification"
              className="font-semibold text-base"
            >
              Enable this email notification
            </Label>
          </div>

          <div>
            <Label htmlFor="recipients" className="font-semibold text-base">
              Recipient(s)
            </Label>
            <Input
              id="recipients"
              value={settings.redeemNotification.recipients}
              onChange={e =>
                handleSettingChange(
                  'redeemNotification',
                  'recipients',
                  e.target.value
                )
              }
              className="mt-1 text-base"
            />
            <p className="text-base text-gray-500 mt-2">
              Enter recipients (comma separated) for this email. Defaults to{' '}
              <code className="text-sm bg-gray-200 p-1 rounded">
                wpweb101@gmail.com
              </code>
              .
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="enable-customer-notification"
              checked={settings.redeemNotification.enableCustomer}
              onCheckedChange={checked =>
                handleSettingChange(
                  'redeemNotification',
                  'enableCustomer',
                  !!checked
                )
              }
            />
            <Label
              htmlFor="enable-customer-notification"
              className="font-semibold text-base"
            >
              Enable/Disable Customer Email Notification
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox
              id="enable-vendor-notification"
              checked={settings.redeemNotification.enableVendor}
              onCheckedChange={checked =>
                handleSettingChange(
                  'redeemNotification',
                  'enableVendor',
                  !!checked
                )
              }
            />
            <Label
              htmlFor="enable-vendor-notification"
              className="font-semibold text-base"
            >
              Enable/Disable Vendor Email Notification
            </Label>
          </div>

          <div>
            <Label htmlFor="redeem-subject" className="font-semibold text-base">
              Subject
            </Label>
            <Input
              id="redeem-subject"
              value={settings.redeemNotification.subject}
              onChange={e =>
                handleSettingChange(
                  'redeemNotification',
                  'subject',
                  e.target.value
                )
              }
              className="mt-1 text-base"
            />
          </div>

          <div>
            <Label
              htmlFor="redeem-email-heading"
              className="font-semibold text-base"
            >
              Email Heading
            </Label>
            <Input
              id="redeem-email-heading"
              value={settings.redeemNotification.heading}
              onChange={e =>
                handleSettingChange(
                  'redeemNotification',
                  'heading',
                  e.target.value
                )
              }
              className="mt-1 text-base"
            />
          </div>

          <div>
            <Label
              htmlFor="redeem-email-type"
              className="font-semibold text-base"
            >
              Email type
            </Label>
            <Select
              value={settings.redeemNotification.type}
              onValueChange={(value: 'html' | 'plain') =>
                handleSettingChange('redeemNotification', 'type', value)
              }
            >
              <SelectTrigger className="w-full sm:w-64 mt-1 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="html" className="text-base">
                  HTML
                </SelectItem>
                <SelectItem value="plain" className="text-base">
                  Plain text
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="font-semibold text-base">HTML template</Label>
            <p className="text-base text-gray-500 mt-2 leading-relaxed">
              To override and edit this email template copy{' '}
              <code className="text-sm bg-gray-200 p-1 rounded">
                {redeemTemplatePath}
              </code>{' '}
              to your theme folder:{' '}
              <code className="text-sm bg-gray-200 p-1 rounded">
                twentytwelve/woocommerce/emails/vou-redeem-notification.php
              </code>
              .
            </p>
            <div className="flex gap-2 mt-3">
              <Button
                variant="outline"
                onClick={() => copyToClipboard(redeemTemplatePath)}
                className="text-base"
              >
                Copy file to theme
              </Button>
              <Button variant="outline" className="text-base">
                View template
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50 rounded-b-lg">
          <Button className="text-base">Save changes</Button>
        </div>
      </div>
    </div>
  );
}
