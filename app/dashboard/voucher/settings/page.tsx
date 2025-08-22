'use client';

import React, { useState } from 'react';

import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// --- TYPE DEFINITIONS ---
interface SettingsState {
  accessForLoggedIn: boolean;
  allowRedemption: boolean;
  accessForGuest: boolean;
}

// --- MAIN COMPONENT ---
export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState>({
    accessForLoggedIn: true,
    allowRedemption: true,
    accessForGuest: true,
  });

  const handleSettingChange = (key: keyof SettingsState, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const SettingRow = ({
    id,
    title,
    description,
    checked,
    onCheckedChange,
  }: {
    id: string;
    title: string;
    description: string[];
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
  }) => (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex-grow mr-4">
        <Label htmlFor={id} className="text-base font-semibold text-gray-800">
          {title}
        </Label>
        <div className="text-sm text-gray-600 mt-1">
          {description.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="data-[state=checked]:bg-orange-700"
      />
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        </div>
        <div>
          <SettingRow
            id="access-logged-in"
            title="Access for Logged-in Users"
            description={[
              'Check this box to allow logged-in users to access the check voucher code page and voucher report pages.',
              'Logged-in users have access to check voucher code page and they can see their own purchased, used and expired voucher codes. By default admin and vendors have access to check voucher code page and voucher codes assigned to them.',
            ]}
            checked={settings.accessForLoggedIn}
            onCheckedChange={checked =>
              handleSettingChange('accessForLoggedIn', checked)
            }
          />
          <SettingRow
            id="allow-redemption"
            title="Allow Redemption of Own Purchased Vouchers for Logged-in Users"
            description={[
              'Allow redemption of own purchased vouchers for logged-in users.',
              'Check this box to allow logged-in users to redeem own purchased vouchers.',
            ]}
            checked={settings.allowRedemption}
            onCheckedChange={checked =>
              handleSettingChange('allowRedemption', checked)
            }
          />
          <SettingRow
            id="access-guest"
            title="Access for Guest Users"
            description={[
              'Check this box to allow guest users to access check voucher code page.',
              'By default admin and vendors have access to check voucher code page.',
            ]}
            checked={settings.accessForGuest}
            onCheckedChange={checked =>
              handleSettingChange('accessForGuest', checked)
            }
          />
        </div>
      </div>
    </div>
  );
}
