// app/my-bookings/page.tsx
'use client';

import { useState, useMemo } from 'react';
import type { FC } from 'react';
import {
  Calendar,
  Users,
  User,
  Mail,
  Phone as PhoneIcon,
  MapPin,
  DollarSign,
  Settings2,
  MessageSquare,
  CreditCard,
  Send,
  XCircle,
  Trash2,
  MoreHorizontal,
} from 'lucide-react';

// Import Shadcn UI Components
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type BookingStatus =
  | 'Approved - Unpaid'
  | 'Expired'
  | 'Waiting for owner confirmation'
  | 'Approved - Paid';

interface Owner {
  name: string;
  email: string;
  phone: string;
}

interface BaseBooking {
  id: string;
  title: string;
  status: BookingStatus;
  guests: number;
  owner: Owner;
  location: string;
  price: number;
  extraServices?: string;
  message?: string;
  requestedAt: string;
  paymentDue?: string;
}

// Specific type for appointment-style bookings (e.g., barber, coach)
interface AppointmentBooking extends BaseBooking {
  type: 'APPOINTMENT';
  bookingDate: string;
  bookingTime: string;
}

// Specific type for rental-style bookings (e.g., car, apartment)
interface RentalBooking extends BaseBooking {
  type: 'RENTAL';
  checkInDate: string;
  checkInTime: string;
  checkOutDate: string;
  checkOutTime: string;
}

// The main Booking type is a union of the specific booking types
type Booking = AppointmentBooking | RentalBooking;

// --- 2. MOCK DATA ---
// Data is now structured to match the new, stricter type definitions.

const mockBookings: Booking[] = [
  {
    type: 'APPOINTMENT',
    id: '#4349',
    title: "George's Barber Shop",
    status: 'Approved - Unpaid',
    bookingDate: 'August 12, 2025',
    bookingTime: '8:00 am - 9:00 am',
    guests: 1,
    owner: {
      name: 'George Smith',
      email: 'barbershop@listeo.pro',
      phone: '+1 123 456 789',
    },
    location: 'Auburndale, Queens, Nowy Jork, Stany Zjednoczone',
    price: 15.0,
    extraServices: 'Straight Razor Fade $ 15',
    requestedAt: 'August 11, 2025 at 12:22 pm',
    paymentDue: 'August 13, 2025 at 12:22 pm',
  },
  {
    type: 'APPOINTMENT',
    id: '#4348',
    title: 'George Burton - Life Coach',
    status: 'Expired',
    bookingDate: 'August 13, 2025',
    bookingTime: '1:00 pm - 3:00 pm',
    guests: 1,
    owner: {
      name: 'Tom Wilson',
      email: 'tom.smith@listeo.pro',
      phone: '123456789',
    },
    location: 'Nowy Jork, Stany Zjednoczone',
    price: 105.0,
    message: 'coucou voici mon numero 0659870767',
    requestedAt: 'August 10, 2025 at 7:17 pm',
    paymentDue: 'August 10, 2025 at 8:17 pm',
  },
  {
    type: 'APPOINTMENT',
    id: '#4346',
    title: "Tom's Restaurant",
    status: 'Waiting for owner confirmation',
    bookingDate: 'August 10, 2025',
    bookingTime: '12:00 pm',
    guests: 2,
    owner: {
      name: 'Tom Wilson',
      email: 'tom.smith@listeo.pro',
      phone: '+48500360370',
    },
    location: 'Wakefield, Bronx, Nowy Jork, Stany Zjednoczone',
    price: 85.0,
    requestedAt: 'August 10, 2025 at 5:20 pm',
  },
  {
    type: 'APPOINTMENT',
    id: '#4345',
    title: "George's Barber Shop",
    status: 'Approved - Paid',
    bookingDate: 'August 12, 2025',
    bookingTime: '9:00 am - 10:00 am',
    guests: 1,
    owner: {
      name: 'George Smith',
      email: 'barbershop@listeo.pro',
      phone: '+1 123 456 789',
    },
    location: 'Auburndale, Queens, Nowy Jork, Stany Zjednoczone',
    price: 25.0,
    requestedAt: 'August 10, 2025 at 11:50 am',
  },
  {
    type: 'RENTAL',
    id: '#4343',
    title: 'Sports Car',
    status: 'Approved - Unpaid',
    checkInDate: 'August 26, 2025',
    checkInTime: '11:00 am',
    checkOutDate: 'August 29, 2025',
    checkOutTime: '11:00 am',
    guests: 1,
    owner: {
      name: 'Tom Wilson',
      email: 'tom.smith@listeo.pro',
      phone: '123456789',
    },
    location: 'Suffolk County, Nowy Jork, Stany Zjednoczone',
    price: 1455.0,
    requestedAt: 'August 10, 2025 at 7:33 am',
    paymentDue: 'August 12, 2025 at 7:33 am',
  },
  {
    type: 'RENTAL',
    id: '#4341',
    title: 'Sports Car',
    status: 'Expired',
    checkInDate: 'September 22, 2025',
    checkInTime: '6:00 am',
    checkOutDate: 'September 24, 2025',
    checkOutTime: '6:00 am',
    guests: 1,
    owner: {
      name: 'Tom Wilson',
      email: 'tom.smith@listeo.pro',
      phone: '123456789',
    },
    location: 'Suffolk County, Nowy Jork, Stany Zjednoczone',
    price: 1025.0,
    extraServices: 'Delivery & Collection $ 50',
    requestedAt: 'August 8, 2025 at 4:56 pm',
    paymentDue: 'August 10, 2025 at 4:56 pm',
  },
  {
    type: 'RENTAL',
    id: '#4340',
    title: 'Modern Apartment',
    status: 'Approved - Paid',
    checkInDate: 'September 1, 2025',
    checkInTime: '3:00 pm',
    checkOutDate: 'September 7, 2025',
    checkOutTime: '11:00 am',
    guests: 2,
    owner: {
      name: 'Jane Doe',
      email: 'jane@hosting.com',
      phone: '+44 987 654 321',
    },
    location: 'Downtown, London, UK',
    price: 1200.0,
    requestedAt: 'August 5, 2025 at 10:00 am',
  },
  {
    type: 'APPOINTMENT',
    id: '#4339',
    title: 'Lakeside Cabin Tour',
    status: 'Waiting for owner confirmation',
    bookingDate: 'October 10, 2025',
    bookingTime: '2:00 pm - 3:00 pm',
    guests: 4,
    owner: {
      name: 'John Appleseed',
      email: 'john@cabinrentals.com',
      phone: '+1 555 123 4567',
    },
    location: 'Lake Tahoe, California, USA',
    price: 75.0,
    requestedAt: 'August 4, 2025 at 3:30 pm',
  },
];

// --- 3. SUB-COMPONENTS ---

const StatusBadge: FC<{ status: BookingStatus }> = ({ status }) => {
  const statusStyles: { [key in BookingStatus]: string } = {
    'Approved - Unpaid': 'bg-green-100 text-green-800 border-green-200',
    'Approved - Paid': 'bg-green-100 text-green-800 border-green-200',
    Expired: 'bg-gray-100 text-gray-800 border-gray-200',
    'Waiting for owner confirmation':
      'bg-yellow-100 text-yellow-800 border-yellow-200',
  };
  return (
    <Badge variant="outline" className={statusStyles[status]}>
      {status}
    </Badge>
  );
};

const InfoBlock: FC<{
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}> = ({ icon, title, children }) => (
  <div className="bg-gray-50/70 p-3 rounded-lg flex-1">
    <h3 className="text-sm font-semibold text-gray-600 flex items-center mb-2">
      {icon}
      <span className="ml-2">{title}</span>
    </h3>
    <div className="text-sm text-gray-800">{children}</div>
  </div>
);

// The BookingCard now uses the discriminated union to render the correct date info.
const BookingCard: FC<{ booking: Booking }> = ({ booking }) => (
  <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 w-full">
    <CardContent className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{booking.title}</h2>
          <p className="text-sm text-gray-500">Booking {booking.id}</p>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoBlock icon={<Calendar className="h-4 w-4" />} title="Booking Date">
          {/* Type narrowing based on the 'type' property */}
          {booking.type === 'APPOINTMENT' ? (
            <>
              <p>{booking.bookingDate}</p>
              <p className="text-gray-500">{booking.bookingTime}</p>
            </>
          ) : (
            <>
              <p>
                Check-in: {booking.checkInDate} at {booking.checkInTime}
              </p>
              <p>
                Check-out: {booking.checkOutDate} at {booking.checkOutTime}
              </p>
            </>
          )}
        </InfoBlock>
        <InfoBlock icon={<Users className="h-4 w-4" />} title="Booking Details">
          <p>
            {booking.guests} Guest{booking.guests > 1 ? 's' : ''}
          </p>
        </InfoBlock>
      </div>

      <InfoBlock icon={<User className="h-4 w-4" />} title="Owner">
        <p className="font-semibold">{booking.owner.name}</p>
        <div className="flex items-center text-gray-600 mt-1">
          <Mail className="h-4 w-4 mr-2" />
          <span>{booking.owner.email}</span>
        </div>
        <div className="flex items-center text-gray-600 mt-1">
          <PhoneIcon className="h-4 w-4 mr-2" />
          <span>{booking.owner.phone}</span>
        </div>
      </InfoBlock>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoBlock
          icon={<MapPin className="h-4 w-4" />}
          title="Booking Location"
        >
          <p>{booking.location}</p>
        </InfoBlock>
        <InfoBlock icon={<DollarSign className="h-4 w-4" />} title="Price">
          <p className="font-bold text-green-600">
            ${booking.price.toFixed(2)}
          </p>
        </InfoBlock>
      </div>

      {booking.extraServices && (
        <InfoBlock
          icon={<Settings2 className="h-4 w-4" />}
          title="Extra Services"
        >
          <p>{booking.extraServices}</p>
        </InfoBlock>
      )}
      {booking.message && (
        <InfoBlock icon={<MessageSquare className="h-4 w-4" />} title="Message">
          <p>{booking.message}</p>
        </InfoBlock>
      )}

      <div className="text-xs text-gray-500 flex flex-wrap gap-x-4 gap-y-2 pt-4 border-t">
        <p>Booking requested on: {booking.requestedAt}</p>
        {booking.paymentDue && (
          <p className="text-yellow-600">Payment due: {booking.paymentDue}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {booking.status === 'Approved - Unpaid' && (
          <>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <CreditCard className="mr-2 h-4 w-4" />
              Pay
            </Button>
            <Button size="sm" variant="outline">
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </>
        )}
        {booking.status === 'Expired' && (
          <>
            <Button size="sm" variant="outline">
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </>
        )}
        {booking.status === 'Waiting for owner confirmation' && (
          <>
            <Button size="sm" variant="outline">
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </>
        )}
        {booking.status === 'Approved - Paid' && (
          <Button size="sm" variant="outline">
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
);

// --- 4. MAIN PAGE COMPONENT ---

const MyBookingsPage: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 4;

  const totalPages: number = Math.ceil(mockBookings.length / itemsPerPage);

  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return mockBookings.slice(startIndex, endIndex);
  }, [currentPage]);

  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
        <Breadcrumb className="mt-2 sm:mt-0">
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

      <Card className="mb-8 shadow-sm">
        <CardContent className="p-4 flex justify-between items-center">
          <h2 className="font-semibold text-gray-700">Your Bookings</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                July 13, 2025 - August 12, 2025
                <MoreHorizontal className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
              <DropdownMenuItem>Last 90 Days</DropdownMenuItem>
              <DropdownMenuItem>All Time</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>

      <main className="space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {paginatedBookings.map(booking => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handlePageChange(currentPage - 1);
                }}
                className={
                  currentPage === 1 ? 'pointer-events-none text-gray-400' : ''
                }
              />
            </PaginationItem>
            <div className="hidden sm:flex">
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i + 1}
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.preventDefault();
                      handlePageChange(i + 1);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </div>
            <div className="sm:hidden">
              <PaginationItem>
                <PaginationLink isActive>{currentPage}</PaginationLink>
              </PaginationItem>
            </div>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handlePageChange(currentPage + 1);
                }}
                className={
                  currentPage === totalPages
                    ? 'pointer-events-none text-gray-400'
                    : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
    </div>
  );
};

export default MyBookingsPage;
