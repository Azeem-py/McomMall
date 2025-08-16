'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Trash, Edit } from 'lucide-react';
import WeeklySchedule from './WeeklySchedule';
import AvailabilityCalendar from './AvailabilityCalendar';
import { ListingFormData, Service } from '../types';
import SingleImageInput from '@/components/SingleImageInput';

interface OfferingScheduleStepProps {
  formData: ListingFormData;
  setFormData: (data: ListingFormData) => void;
}

const OfferingScheduleStep: React.FC<OfferingScheduleStepProps> = ({ formData, setFormData }) => {
  const [service, setService] = useState<Omit<Service, 'id'>>({
    image: null,
    title: '',
    description: '',
    price: '',
    currency: 'USD',
    pricingModel: 'one-time',
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<number | null>(null);

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const handleImageChange = (image: string | null) => {
    setService({ ...service, image });
  };

  const handleSelectChange = (name: 'currency' | 'pricingModel', value: string) => {
    setService({ ...service, [name]: value });
  };

  const handleAddOrUpdateService = () => {
    if (editingId !== null) {
      // Update existing service
      const updatedServices = formData.services.map((s: Service) =>
        s.id === editingId ? { ...s, ...service } : s
      );
      setFormData({ ...formData, services: updatedServices });
      setEditingId(null);
    } else {
      // Add new service
      const newService = { ...service, id: Date.now() };
      setFormData({ ...formData, services: [...formData.services, newService] });
    }
    // Reset form
    setService({
      image: null,
      title: '',
      description: '',
      price: '',
      currency: 'USD',
      pricingModel: 'one-time',
    });
  };

  const handleEditService = (s: Service) => {
    setEditingId(s.id);
    setService({ ...s });
  };

  const openDeleteDialog = (id: number) => {
    setServiceToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteService = () => {
    if (serviceToDelete === null) return;
    const updatedServices = formData.services.filter(
      (s: Service) => s.id !== serviceToDelete
    );
    setFormData({ ...formData, services: updatedServices });
    setServiceToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <div className="space-y-6">
      {/* Pricing & Bookable Services */}
      <div className="p-6 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Pricing & Bookable Services</h3>

        {/* Service Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Image, Title, Desc */}
            <div className="md:col-span-2 grid grid-cols-1 gap-6">
                <div className="space-y-2">
                    <Label>Service Image</Label>
                    <div className="w-32 h-32">
                        <SingleImageInput onImageChange={handleImageChange} />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" value={service.title} onChange={handleServiceChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" value={service.description} onChange={handleServiceChange} />
                </div>
            </div>
            {/* Price, Currency, Model */}
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" name="price" type="number" value={service.price} onChange={handleServiceChange} />
                </div>
                <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select value={service.currency} onValueChange={(v) => handleSelectChange('currency', v)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="NGN">NGN</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Pricing Model</Label>
                    <Select value={service.pricingModel} onValueChange={(v) => handleSelectChange('pricingModel', v)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="one-time">One-time fee</SelectItem>
                            <SelectItem value="per-guest">Multiply by guest</SelectItem>
                            <SelectItem value="per-day">Multiply by days</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
        <Button onClick={handleAddOrUpdateService} className="mt-4">
          {editingId ? 'Update Service' : 'Add Service'}
        </Button>

        {/* Services Table */}
        <div className="mt-8">
            <h4 className="font-semibold">Added Services</h4>
            <div className="mt-4 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Title</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0"><span className="sr-only">Edit</span></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {formData.services.map((s: Service) => (
                                    <tr key={s.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{s.title}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{s.price} {s.currency}</td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <button onClick={() => handleEditService(s)} className="text-red-600 hover:text-red-900 mr-4"><Edit size={16} /></button>
                                            <DialogTrigger asChild>
                                                <button onClick={() => openDeleteDialog(s.id)} className="text-gray-400 hover:text-gray-600"><Trash size={16} /></button>
                                            </DialogTrigger>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Availability */}
      <WeeklySchedule
        schedule={formData.schedule}
        setSchedule={(schedule) => setFormData({ ...formData, schedule })}
      />

      <AvailabilityCalendar
        availability={formData.availability}
        setAvailability={(availability) => setFormData({ ...formData, availability })}
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <p>This action cannot be undone. This will permanently delete the service.</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDeleteService}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default OfferingScheduleStep;
