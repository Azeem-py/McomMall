'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TermsCondtion } from './terms-condition';
import { useState } from 'react';
import { RememberMe } from './remember-me';

const Auth = ({ children }: { children?: React.ReactNode }) => {
  const [newAccount, setNewAccount] = useState(false);
  const [selectedRole, setSelectedRole] = useState<
    'customer' | 'business' | null
  >(null);
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: '',
    terms: '',
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleToggleMode = (mode: boolean) => {
    setNewAccount(mode);
    setSelectedRole(null);
    setFormData({
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      role: '',
      terms: '',
    });
    setTermsAccepted(false);
  };

  const handleRoleSelect = (role: 'customer' | 'business') => {
    setSelectedRole(role);
    setErrors(prev => ({ ...prev, role: '' }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleTermsChange = (checked: boolean) => {
    setTermsAccepted(checked);
    setErrors(prev => ({ ...prev, terms: '' }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? '' : 'Please enter a valid email address.';
  };

  const validatePhoneNumber = (phone: string) => {
    // Regex to handle formats like +1 (XXX) XXX-XXXX
    const phoneRegex =
      /^\+?(\d{1,4}(?:\s?|\s*\(\d{3}\)\s*))?\d{3}[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return phoneRegex.test(phone)
      ? ''
      : 'Please enter a valid phone number (e.g., +1 (123) 456-7890).';
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      role: '',
      terms: '',
    };

    if (!formData.email) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else {
      const emailError = validateEmail(formData.email);
      if (emailError) {
        newErrors.email = emailError;
        isValid = false;
      }
    }

    if (newAccount) {
      if (!formData.phoneNumber) {
        newErrors.phoneNumber = 'Phone number is required.';
        isValid = false;
      } else {
        const phoneError = validatePhoneNumber(formData.phoneNumber);
        if (phoneError) {
          newErrors.phoneNumber = phoneError;
          isValid = false;
        }
      }

      if (!formData.password) {
        newErrors.password = 'Password is required.';
        isValid = false;
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
        isValid = false;
      }

      if (!selectedRole) {
        newErrors.role = 'Please select a role (Customer or Business).';
        isValid = false;
      }

      if (!termsAccepted) {
        newErrors.terms = 'You must accept the Terms and Conditions.';
        isValid = false;
      }
    } else {
      if (!formData.password) {
        newErrors.password = 'Password is required.';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const submitData = {
        email: formData.email,
        password: formData.password,
        ...(newAccount && {
          phoneNumber: formData.phoneNumber,
          role: selectedRole,
        }),
      };
      console.log('Form Data:', submitData);
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-rose-700">
            {children || 'Sign In'}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:min-w-[425px] mx-2">
          <DialogHeader>
            <div>
              <div className="flex justify-center mb-4">
                <Button
                  variant="link"
                  className={`mr-4 text-lg ${
                    !newAccount ? 'text-red-500' : 'text-gray-400'
                  }`}
                  onClick={() => handleToggleMode(false)}
                >
                  Log In
                </Button>
                <Button
                  variant="link"
                  className={`text-lg ${
                    newAccount ? 'text-red-500' : 'text-gray-400'
                  }`}
                  onClick={() => handleToggleMode(true)}
                >
                  Register
                </Button>
              </div>
              <hr className="w-full bg-gray-400 " />
            </div>
            <DialogTitle className="text-2xl text-red-500 hover:text-red-600">
              {newAccount
                ? `Create ${
                    selectedRole === 'customer'
                      ? 'Customer'
                      : selectedRole === 'business'
                      ? 'Business'
                      : ''
                  } Account`
                : 'Login'}
            </DialogTitle>
            <DialogDescription className="">
              {newAccount
                ? `Create a new ${
                    selectedRole === 'customer'
                      ? 'customer'
                      : selectedRole === 'business'
                      ? 'business'
                      : ''
                  } account to get started.`
                : 'Login to your account to continue.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-1">
            <div>
              {newAccount && (
                <div className="flex gap-4 mb-4">
                  <Button
                    variant="outline"
                    className={`flex-1 px-4 py-2 text-gray-700 ${
                      selectedRole === 'customer'
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    } rounded`}
                    onClick={() => handleRoleSelect('customer')}
                  >
                    <span className="mr-2">👤</span> Customer
                  </Button>
                  <Button
                    variant="outline"
                    className={`flex-1 px-4 py-2 text-gray-700 ${
                      selectedRole === 'business'
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    } rounded`}
                    onClick={() => handleRoleSelect('business')}
                  >
                    <span className="mr-2">🏠</span> Business
                  </Button>
                </div>
              )}
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email" className="text-lg">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@doe.com"
                className={`sm:h-[3rem] ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            {newAccount && (
              <div className="grid gap-3">
                <Label htmlFor="phoneNumber" className="text-lg">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+44 ... ... ..."
                  className={`sm:h-[3rem] ${
                    errors.phoneNumber ? 'border-red-500' : ''
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                )}
              </div>
            )}
            <div className="grid gap-3">
              <Label htmlFor="password" className="text-lg">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="your password"
                className={`sm:h-[3rem] ${
                  errors.password ? 'border-red-500' : ''
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            {newAccount && (
              <div className="grid gap-3">
                <Label htmlFor="password2" className="text-lg">
                  Confirm Password
                </Label>
                <Input
                  id="password2"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="confirm password"
                  className={`sm:h-[3rem] ${
                    errors.confirmPassword ? 'border-red-500' : ''
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}
          </div>
          {!newAccount && (
            <Button variant="link" className="justify-start primaryText p-0">
              Forgotten your password? Reset
            </Button>
          )}
          {/* TERMS AND CONDITION STARTS */}
          {newAccount && (
            <TermsCondtion
              isChecked={termsAccepted}
              onChange={handleTermsChange}
            />
          )}
          {newAccount && errors.terms && (
            <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
          )}
          {/* TERMS AND CONDITIONS ENDS */}

          {!newAccount && <RememberMe />}

          <DialogFooter className="flex flex-col justify-between mt-4">
            <DialogClose asChild className="hidden sm:block">
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="button"
              className="justify-start w-fit bg-red-500 hover:bg-red-600"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default Auth;
