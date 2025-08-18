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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trash, Edit } from 'lucide-react';
import WeeklySchedule from './WeeklySchedule';
import AvailabilityCalendar from './AvailabilityCalendar';
import { ListingFormData, Service } from '../types';
import SingleImageInput from '@/components/SingleImageInput';

interface OfferingScheduleStepProps {
  formData: ListingFormData;
  setFormData: (data: ListingFormData) => void;
}

const OfferingScheduleStep: React.FC<OfferingScheduleStepProps> = ({
  formData,
  setFormData,
}) => {
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

  const handleServiceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const handleImageChange = (image: File | null) => {
    setService({ ...service, image: image ? image.name : null });
  };

  const handleSelectChange = (
    name: 'currency' | 'pricingModel',
    value: string
  ) => {
    setService({ ...service, [name]: value });
  };

  const handleAddOrUpdateService = () => {
    if (editingId !== null) {
      const updatedServices = formData.services.map(s =>
        s.id === editingId ? { ...s, ...service } : s
      );
      setFormData({ ...formData, services: updatedServices });
      setEditingId(null);
    } else {
      const newService = { ...service, id: Date.now() };
      setFormData({
        ...formData,
        services: [...formData.services, newService],
      });
    }
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
      s => s.id !== serviceToDelete
    );
    setFormData({ ...formData, services: updatedServices });
    setServiceToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Pricing & Bookable Services</CardTitle>
            <CardDescription>
              Add the services you offer and their prices.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-2 grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label>Service Image</Label>
                  <div className="w-32 h-32">
                    <SingleImageInput onImageChange={handleImageChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={service.title}
                    onChange={handleServiceChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={service.description}
                    onChange={handleServiceChange}
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={service.price}
                    onChange={handleServiceChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select
                    value={service.currency}
                    onValueChange={v => handleSelectChange('currency', v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="NGN">NGN</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Pricing Model</Label>
                  <Select
                    value={service.pricingModel}
                    onValueChange={v => handleSelectChange('pricingModel', v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-time">One-time fee</SelectItem>
                      <SelectItem value="per-guest">
                        Multiply by guest
                      </SelectItem>
                      <SelectItem value="per-day">Multiply by days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <Button onClick={handleAddOrUpdateService} className="mt-4">
              {editingId ? 'Update Service' : 'Add Service'}
            </Button>
            <div className="mt-8">
              <h4 className="font-semibold">Added Services</h4>
              <Card className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.services.map((s: Service) => (
                      <TableRow key={s.id}>
                        <TableCell className="font-medium">{s.title}</TableCell>
                        <TableCell>
                          {s.price} {s.currency}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditService(s)}
                            className="mr-2"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openDeleteDialog(s.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </CardContent>
        </Card>

        <WeeklySchedule
          schedule={formData.schedule}
          setSchedule={schedule => setFormData({ ...formData, schedule })}
        />

        <AvailabilityCalendar
          availability={formData.availability}
          setAvailability={availability =>
            setFormData({ ...formData, availability })
          }
        />
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <p>
          This action cannot be undone. This will permanently delete the
          service.
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDeleteService}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OfferingScheduleStep;
