'use client';

import type { NextPage } from 'next';
import {
  AlertCircle,
  Eye,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Upload,
  Youtube,
} from 'lucide-react';
import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';

// --- Component Props and Type Definitions ---

type SocialPlatform =
  | 'Twitter'
  | 'Facebook'
  | 'LinkedIn'
  | 'Instagram'
  | 'YouTube';

type SocialLink = {
  platform: SocialPlatform;
  url: string;
  icon: React.ElementType;
};

type UserProfile = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  avatar: string | null;
  socials: SocialLink[];
};

type PasswordFields = {
  current: string;
  new: string;
  confirm: string;
};

type ProfileErrors = {
  [key in keyof Omit<UserProfile, 'socials' | 'avatar'>]?: string;
};

type PasswordErrors = {
  [key in keyof PasswordFields]?: string;
};

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
}

interface PasswordFieldProps extends Omit<InputFieldProps, 'type' | 'id'> {
  id: keyof PasswordFields;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface SocialInputFieldProps {
  social: SocialLink;
  onChange: (platform: SocialPlatform, url: string) => void;
}

// --- UI Components ---

const InputField = ({
  label,
  id,
  type = 'text',
  value,
  placeholder,
  onChange,
  disabled = false,
  error,
}: InputFieldProps) => (
  <div>
    <label
      htmlFor={id}
      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`block w-full rounded-md p-2.5 text-gray-900 shadow-sm sm:text-sm ${
        error
          ? 'border-red-500 ring-1 ring-red-500'
          : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
      } bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400`}
    />
    {error && (
      <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
    )}
  </div>
);

const PasswordField = ({
  label,
  id,
  value,
  placeholder,
  onChange,
  error,
}: PasswordFieldProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={isVisible ? 'text' : 'password'}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`block w-full rounded-md p-2.5 pr-10 text-gray-900 shadow-sm sm:text-sm ${
            error
              ? 'border-red-500 ring-1 ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          } bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400`}
        />
        <button
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label={isVisible ? 'Hide password' : 'Show password'}
        >
          <Eye className="h-5 w-5" />
        </button>
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

const SocialInputField = ({ social, onChange }: SocialInputFieldProps) => (
  <div>
    <label
      htmlFor={social.platform}
      className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      <social.icon className="h-4 w-4" />
      {social.platform}
    </label>
    <input
      type="text"
      id={social.platform}
      value={social.url}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        onChange(social.platform, e.target.value)
      }
      className="block w-full rounded-md border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
    />
  </div>
);

const InfoAlert = ({
  message,
  type,
}: {
  message: string;
  type: 'info' | 'warning';
}) => {
  const baseClasses = 'flex items-start space-x-3 rounded-lg border p-4';
  const typeClasses = {
    info: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
    warning:
      'border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
  };
  const iconColor = type === 'info' ? 'text-blue-500' : 'text-yellow-500';

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <AlertCircle className={`mt-0.5 h-5 w-5 flex-shrink-0 ${iconColor}`} />
      <p className="text-sm">{message}</p>
    </div>
  );
};

/**
 * The main component for the "My Profile" page.
 */
const MyProfilePage: NextPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'Tom',
    lastName: 'Smith',
    phone: '',
    email: 'owner@listeo.pro',
    avatar: 'https://placehold.co/150x150/EFEFEF/333333?text=User',
    socials: [
      { platform: 'Twitter', url: '', icon: Twitter },
      { platform: 'Facebook', url: '', icon: Facebook },
      { platform: 'LinkedIn', url: '', icon: Linkedin },
      { platform: 'Instagram', url: '', icon: Instagram },
      { platform: 'YouTube', url: '', icon: Youtube },
    ],
  });

  const [passwords, setPasswords] = useState<PasswordFields>({
    current: '',
    new: '',
    confirm: '',
  });

  const [profileErrors, setProfileErrors] = useState<ProfileErrors>({});
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({});

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setProfile({ ...profile, [id]: value });
    if (profileErrors[id as keyof ProfileErrors]) {
      setProfileErrors({ ...profileErrors, [id]: undefined });
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setPasswords({ ...passwords, [id]: value });
    if (passwordErrors[id as keyof PasswordErrors]) {
      setPasswordErrors({ ...passwordErrors, [id]: undefined });
    }
  };

  const handleSocialChange = (platform: SocialPlatform, url: string): void => {
    setProfile({
      ...profile,
      socials: profile.socials.map(social =>
        social.platform === platform ? { ...social, url } : social
      ),
    });
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateProfile = (): boolean => {
    const errors: ProfileErrors = {};
    if (!profile.firstName.trim()) errors.firstName = 'First name is required.';
    if (!profile.lastName.trim()) errors.lastName = 'Last name is required.';
    if (profile.phone && !/^\+?[0-9\s-()]{7,20}$/.test(profile.phone)) {
      errors.phone = 'Please enter a valid phone number.';
    }
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePasswords = (): boolean => {
    const errors: PasswordErrors = {};
    if (!passwords.current) errors.current = 'Current password is required.';
    if (passwords.new.length < 12)
      errors.new = 'New password must be at least 12 characters long.';
    if (passwords.new !== passwords.confirm)
      errors.confirm = 'Passwords do not match.';
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (validateProfile()) {
      console.log('Profile data submitted:', {
        ...profile,
      });
      // In a real app, you'd show a success toast or message instead of an alert.
      alert('Profile details saved successfully!');
    } else {
      console.log('Profile validation failed.');
    }
  };

  const handlePasswordSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (validatePasswords()) {
      console.log('Password change submitted:', {
        current: '******',
        new: '******',
      });
      // In a real app, you'd show a success toast or message instead of an alert.
      alert('Password changed successfully!');
      setPasswords({ current: '', new: '', confirm: '' });
    } else {
      console.log('Password validation failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              My Profile
            </h1>
            <nav className="text-sm text-muted-foreground">
              <span>Home</span>
              <span className="mx-2">/</span>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Dashboard
              </span>
            </nav>
          </div>
        </header>

        <main className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <form
            onSubmit={handleProfileSubmit}
            className="space-y-6 lg:col-span-2"
            noValidate
          >
            <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                Profile Details
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="flex flex-col items-center md:col-span-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <div
                    className="group relative mb-2 h-36 w-36 cursor-pointer rounded-md border-2 border-dashed border-gray-300 p-2 dark:border-gray-600"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {profile.avatar ? (
                      <Image
                        src={profile.avatar}
                        alt="User Avatar"
                        width="130"
                        height="130"
                        className="h-full w-full rounded-md object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center bg-gray-50 dark:bg-gray-700">
                        <Upload className="h-8 w-8 text-gray-400" />
                        <p className="text-xs text-gray-500">Upload</p>
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-100">
                      <p className="text-sm text-white">Change</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setProfile({ ...profile, avatar: null })}
                    className="text-sm text-red-600 hover:underline dark:text-red-500"
                  >
                    Remove file
                  </button>
                </div>
                <div className="space-y-6 md:col-span-2">
                  <InputField
                    label="First Name"
                    id="firstName"
                    value={profile.firstName}
                    onChange={handleProfileChange}
                    error={profileErrors.firstName}
                  />
                  <InputField
                    label="Last Name"
                    id="lastName"
                    value={profile.lastName}
                    onChange={handleProfileChange}
                    error={profileErrors.lastName}
                  />
                </div>
              </div>
              <div className="mt-6 space-y-6">
                <InfoAlert
                  message="For demo purposes you can type fake phone number"
                  type="warning"
                />
                <InputField
                  label="Phone"
                  id="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  error={profileErrors.phone}
                />
                <InputField
                  label="E-mail"
                  id="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  disabled={true}
                />
                {profile.socials.map(social => (
                  <SocialInputField
                    key={social.platform}
                    social={social}
                    onChange={handleSocialChange}
                  />
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>

          <form
            onSubmit={handlePasswordSubmit}
            className="lg:col-span-1"
            noValidate
          >
            <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                Change Password
              </h2>
              <div className="space-y-6">
                <InfoAlert
                  message="Your password should be at least 12 random characters long to be safe"
                  type="info"
                />
                <PasswordField
                  label="Current Password"
                  id="current"
                  value={passwords.current}
                  onChange={handlePasswordChange}
                  error={passwordErrors.current}
                />
                <PasswordField
                  label="New Password"
                  id="new"
                  value={passwords.new}
                  onChange={handlePasswordChange}
                  error={passwordErrors.new}
                />
                <PasswordField
                  label="Confirm New Password"
                  id="confirm"
                  value={passwords.confirm}
                  onChange={handlePasswordChange}
                  error={passwordErrors.confirm}
                />
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default MyProfilePage;
