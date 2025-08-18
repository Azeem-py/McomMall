// components/members-table.tsx

'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  User,
  ShoppingCart,
  DollarSign,
  BarChart2,
} from 'lucide-react';

// Shadcn/ui Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

// Define the type for a member object for type safety
export type Member = {
  id: number;
  name: string;
  pointBalance: number;
  totalOrders: number;
  totalRevenue: number;
};

// Mock Data: An array of member objects
const mockMembers: Member[] = [
  {
    id: 1,
    name: 'A Customer',
    pointBalance: 8250,
    totalOrders: 26,
    totalRevenue: 2813.2,
  },
  {
    id: 2,
    name: 'John Doe',
    pointBalance: 5000,
    totalOrders: 0,
    totalRevenue: 0.0,
  },
  {
    id: 3,
    name: 'Bart Simpson',
    pointBalance: 5000,
    totalOrders: 0,
    totalRevenue: 0.0,
  },
  {
    id: 4,
    name: 'Lisa Simpson',
    pointBalance: 12500,
    totalOrders: 42,
    totalRevenue: 4530.5,
  },
  {
    id: 5,
    name: 'Bruce Wayne',
    pointBalance: 75000,
    totalOrders: 15,
    totalRevenue: 150000.75,
  },
  {
    id: 6,
    name: 'Peter Parker',
    pointBalance: 1500,
    totalOrders: 5,
    totalRevenue: 350.0,
  },
  {
    id: 7,
    name: 'Clark Kent',
    pointBalance: 9800,
    totalOrders: 12,
    totalRevenue: 1240.3,
  },
];

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export function MembersTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Calculate Average Order Value (AOV)
  const getAOV = (member: Member) => {
    return member.totalOrders > 0
      ? member.totalRevenue / member.totalOrders
      : 0;
  };

  // Filter members based on the search term (case-insensitive)
  const filteredMembers = mockMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
      <p className="text-gray-600 mb-4">
        Members are customers who have signed up for your rewards program. Click
        the View Details button to see transactions and other information.
      </p>

      {/* Search Bar */}
      <div className="flex items-center mb-4">
        <div className="relative w-full max-w-sm">
          <Input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-4 pr-12 h-10"
          />
          <Button
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8"
          >
            <Search className="h-4 w-4 mr-2" /> Search
          </Button>
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-blue-950">
              <TableRow className="">
                <TableHead className="text-white font-bold">Member</TableHead>
                <TableHead className="text-white font-bold">
                  Point Balance
                </TableHead>
                <TableHead className="text-white font-bold">
                  Total orders
                </TableHead>
                <TableHead className="text-white font-bold">
                  Total revenue
                </TableHead>
                <TableHead className="text-white font-bold">
                  Average order value
                </TableHead>
                <TableHead className="text-white font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map(member => (
                    <motion.tr
                      key={member.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="odd:bg-white even:bg-yellow-50/50 hover:bg-gray-100"
                    >
                      <TableCell className="font-medium">
                        <a href="#" className="text-blue-600 hover:underline">
                          {member.name}
                        </a>
                      </TableCell>
                      <TableCell>
                        {member.pointBalance.toLocaleString()}
                      </TableCell>
                      <TableCell>{member.totalOrders}</TableCell>
                      <TableCell>
                        {formatCurrency(member.totalRevenue)}
                      </TableCell>
                      <TableCell>{formatCurrency(getAOV(member))}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedMember(member)}
                          >
                            View details
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700"
                          >
                            + Add points
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-orange-600 border-orange-600 hover:bg-red-50 hover:text-orange-700"
                          >
                            - Subtract points
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">
                      No members found.
                    </TableCell>
                  </TableRow>
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Details Modal (Dialog) */}
      <Dialog
        open={!!selectedMember}
        onOpenChange={isOpen => !isOpen && setSelectedMember(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          {selectedMember && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {selectedMember.name}
                </DialogTitle>
                <DialogDescription>
                  {
                    "Detailed overview of the member's activity and rewards status."
                  }
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4">
                  <User className="h-5 w-5 text-gray-500" />
                  <span>Member ID: #{selectedMember.id}</span>
                </div>
                <div className="flex items-center gap-4">
                  <BarChart2 className="h-5 w-5 text-gray-500" />
                  <span>
                    Point Balance:{' '}
                    <strong>
                      {selectedMember.pointBalance.toLocaleString()}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <ShoppingCart className="h-5 w-5 text-gray-500" />
                  <span>
                    Total Orders: <strong>{selectedMember.totalOrders}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <DollarSign className="h-5 w-5 text-gray-500" />
                  <span>
                    Total Revenue:{' '}
                    <strong>
                      {formatCurrency(selectedMember.totalRevenue)}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <DollarSign className="h-5 w-5 text-gray-500" />
                  <span>
                    Average Order Value:{' '}
                    <strong>{formatCurrency(getAOV(selectedMember))}</strong>
                  </span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
