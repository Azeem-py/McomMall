// app/page.tsx
'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { ChevronRight, PlusCircle, Search, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

// --- MOCK DATA ---
// Expanded mock data for better filtering examples
const allProducts = [
  {
    id: 'prod_1',
    name: 'Versace T-shirt',
    image: '/placeholder-tshirt.svg',
    status: 'Pending Review',
    sku: 'SKU-VTS-01',
    stock: 10,
    price: 49.99,
    salePrice: 44.99,
    type: 'T-shirts',
    brand: 'Versace',
    views: 6,
    date: '2025-07-28',
  },
  {
    id: 'prod_2',
    name: 'Gucci Handbag',
    image: '/placeholder-handbag.svg',
    status: 'Online',
    sku: 'SKU-GUC-HB-12',
    stock: 25,
    price: 1250.0,
    salePrice: 1199.99,
    type: 'Accessories',
    brand: 'Gucci',
    views: 150,
    date: '2025-07-27',
  },
  {
    id: 'prod_3',
    name: 'Nike Air Jordans',
    image: '/placeholder-shoes.svg',
    status: 'Draft',
    sku: 'SKU-NIK-AJ-45',
    stock: 50,
    price: 180.0,
    salePrice: 180.0,
    type: 'Shoes',
    brand: 'Nike',
    views: 320,
    date: '2025-07-26',
  },
  {
    id: 'prod_4',
    name: 'Rolex Watch',
    image: '/placeholder-watch.svg',
    status: 'In stock',
    sku: 'SKU-RLX-W-88',
    stock: 5,
    price: 8500.0,
    salePrice: 8500.0,
    type: 'Watches',
    brand: 'Rolex',
    views: 85,
    date: '2025-07-25',
  },
  {
    id: 'prod_5',
    name: 'Adidas Ultraboost',
    image: '/placeholder-shoes.svg',
    status: 'Online',
    sku: 'SKU-ADI-UB-02',
    stock: 150,
    price: 160.0,
    salePrice: 139.99,
    type: 'Shoes',
    brand: 'Adidas',
    views: 550,
    date: '2025-07-20',
  },
  {
    id: 'prod_6',
    name: "Levi's 501 Jeans",
    image: '/placeholder-jeans.svg',
    status: 'In stock',
    sku: 'SKU-LVS-501-32',
    stock: 80,
    price: 98.0,
    salePrice: 98.0,
    type: 'Apparel',
    brand: "Levi's",
    views: 210,
    date: '2025-07-15',
  },
  {
    id: 'prod_7',
    name: 'Prada Sunglasses',
    image: '/placeholder-sunglasses.svg',
    status: 'Pending Review',
    sku: 'SKU-PRA-SG-07',
    stock: 15,
    price: 350.0,
    salePrice: 320.0,
    type: 'Accessories',
    brand: 'Prada',
    views: 45,
    date: '2025-08-01',
  },
  {
    id: 'prod_8',
    name: 'Unpublished Nike T-Shirt',
    image: '/placeholder-tshirt.svg',
    status: 'Draft',
    sku: 'SKU-NIK-TS-99',
    stock: 0,
    price: 35.0,
    salePrice: 35.0,
    type: 'T-shirts',
    brand: 'Nike',
    views: 0,
    date: '2025-08-02',
  },
];

// --- HELPER COMPONENTS & TYPES ---
type ProductStatus = 'All' | 'Online' | 'Draft' | 'Pending Review' | 'In stock';

const PlaceholderImage = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 20 L80 80 M80 20 L20 80" />
  </svg>
);

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

// --- MAIN DASHBOARD COMPONENT ---
export default function StoreDashboard() {
  // --- STATE MANAGEMENT ---
  const [products, setProducts] = React.useState(allProducts);
  const [activeTab, setActiveTab] = React.useState<ProductStatus>('All');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedBrand, setSelectedBrand] = React.useState('all');
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);

  // --- FILTERING LOGIC ---
  const filteredProducts = React.useMemo(() => {
    let tempProducts = [...products];

    // 1. Filter by active tab
    if (activeTab !== 'All') {
      tempProducts = tempProducts.filter(p => p.status === activeTab);
    }

    // 2. Filter by search term (name or SKU)
    if (searchTerm) {
      tempProducts = tempProducts.filter(
        p =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 3. Filter by category
    if (selectedCategory !== 'all') {
      tempProducts = tempProducts.filter(p => p.type === selectedCategory);
    }

    // 4. Filter by brand
    if (selectedBrand !== 'all') {
      tempProducts = tempProducts.filter(p => p.brand === selectedBrand);
    }

    return tempProducts;
  }, [products, activeTab, searchTerm, selectedCategory, selectedBrand]);

  // --- EVENT HANDLERS ---
  const handleResetFilters = () => {
    setActiveTab('All');
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedBrand('all');
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedRows(checked ? filteredProducts.map(p => p.id) : []);
  };

  const handleSelectRow = (productId: string, checked: boolean) => {
    setSelectedRows(prev =>
      checked ? [...prev, productId] : prev.filter(id => id !== productId)
    );
  };

  const handleBulkAction = (action: string) => {
    if (selectedRows.length === 0) {
      // In a real app, use a toast notification instead of alert.
      alert('Please select products to perform a bulk action.');
      return;
    }

    if (action === 'delete') {
      // In a real app, you'd call an API here.
      console.log('Deleting products:', selectedRows);
      setProducts(prev => prev.filter(p => !selectedRows.includes(p.id)));
      setSelectedRows([]);
    }
    // Add logic for other bulk actions like 'publish' or 'unpublish' here.
    console.log(`Performing '${action}' on products:`, selectedRows);
  };

  // --- DERIVED STATE & CONSTANTS ---
  const TABS: ProductStatus[] = [
    'All',
    'Online',
    'Draft',
    'Pending Review',
    'In stock',
  ];
  const categories = [...new Set(allProducts.map(p => p.type))];
  const brands = [...new Set(allProducts.map(p => p.brand))];
  const isAllSelected =
    selectedRows.length > 0 && selectedRows.length === filteredProducts.length;

  return (
    <>
      {/* Custom CSS for mobile table view */}
      <style jsx global>{`
        @media (max-width: 767px) {
          .mobile-table-card {
            display: block;
            width: 100%;
            border-bottom: 1px solid #e5e7eb;
            padding: 1rem 0;
          }
          .mobile-table-card:last-child {
            border-bottom: none;
          }
          .mobile-table-cell {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 1rem;
            text-align: right;
          }
          .mobile-table-cell::before {
            content: attr(data-label);
            font-weight: 600;
            text-align: left;
            margin-right: 1rem;
          }
          .mobile-table-cell-checkbox {
            padding: 0.5rem 1rem;
          }
        }
      `}</style>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Store Dashboard
            </h1>
            <div className="flex items-center text-sm text-gray-500">
              <span>Home</span>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-gray-700">Dashboard</span>
            </div>
          </header>

          {/* Main Content Area */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            {/* Tabs and Add Product Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-4">
              <div className="flex flex-wrap items-center text-sm text-gray-600 -mb-2">
                {TABS.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 sm:pb-0 px-3 py-2 rounded-md mb-2 ${
                      activeTab === tab
                        ? 'bg-gray-100 font-semibold text-gray-800'
                        : ''
                    }`}
                  >
                    {tab} (
                    {tab === 'All'
                      ? products.length
                      : products.filter(p => p.status === tab).length}
                    )
                  </button>
                ))}
              </div>
              <Button className="mt-4 sm:mt-0 w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white">
                <PlusCircle className="mr-2 h-4 w-4" /> Add new product
              </Button>
            </div>

            {/* Filters and Search Section */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex flex-col sm:flex-row gap-4 flex-grow">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full sm:w-auto md:w-[180px]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger className="w-full sm:w-auto md:w-[180px]">
                    <SelectValue placeholder="Select a brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {brands.map(brand => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  onClick={handleResetFilters}
                  className="w-full sm:w-auto"
                >
                  Reset
                </Button>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Search Products..."
                  className="flex-grow"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Bulk Actions */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="select-all-mobile"
                  onCheckedChange={handleSelectAll}
                  checked={isAllSelected}
                  aria-label="Select all rows"
                />
                <label
                  htmlFor="select-all-mobile"
                  className="text-sm font-medium"
                >
                  Select All
                </label>
              </div>
              <Select onValueChange={handleBulkAction}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Bulk Actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delete">Delete Selected</SelectItem>
                  <SelectItem value="publish">Publish Selected</SelectItem>
                  <SelectItem value="unpublish">Unpublish Selected</SelectItem>
                </SelectContent>
              </Select>
              {/* The "Apply" button is removed in favor of direct action from the Select dropdown for simplicity */}
            </div>

            {/* Products Table */}
            <div className="rounded-md border overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader className="hidden md:table-header-group bg-gray-50">
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        onCheckedChange={handleSelectAll}
                        checked={isAllSelected}
                        aria-label="Select all rows"
                      />
                    </TableHead>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="hidden lg:table-cell">Type</TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Views
                    </TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="block md:table-row-group">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                      <TableRow
                        key={product.id}
                        className={`mobile-table-card md:table-row ${
                          product.status === 'Pending Review' ? 'bg-red-50' : ''
                        }`}
                        data-state={
                          selectedRows.includes(product.id) ? 'selected' : ''
                        }
                      >
                        <TableCell className="mobile-table-cell-checkbox md:table-cell">
                          <Checkbox
                            checked={selectedRows.includes(product.id)}
                            onCheckedChange={checked =>
                              handleSelectRow(product.id, !!checked)
                            }
                            aria-label={`Select row for ${product.name}`}
                          />
                        </TableCell>
                        <TableCell
                          data-label="Image"
                          className="mobile-table-cell md:table-cell"
                        >
                          <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                            <PlaceholderImage className="w-8 h-8 text-gray-400" />
                          </div>
                        </TableCell>
                        <TableCell
                          data-label="Name"
                          className="mobile-table-cell md:table-cell font-medium text-gray-800"
                        >
                          {product.name}
                        </TableCell>
                        <TableCell
                          data-label="Status"
                          className="mobile-table-cell md:table-cell"
                        >
                          <Badge
                            variant={
                              product.status === 'Pending Review'
                                ? 'destructive'
                                : product.status === 'Online' ||
                                  product.status === 'In stock'
                                ? 'default'
                                : 'secondary'
                            }
                            className={
                              product.status === 'Online' ||
                              product.status === 'In stock'
                                ? 'bg-green-100 text-green-800'
                                : ''
                            }
                          >
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell
                          data-label="SKU"
                          className="mobile-table-cell md:table-cell text-gray-600"
                        >
                          {product.sku}
                        </TableCell>
                        <TableCell
                          data-label="Stock"
                          className="mobile-table-cell md:table-cell text-gray-600"
                        >
                          {product.stock > 0 ? (
                            <span className="text-green-600 font-semibold">
                              In stock
                            </span>
                          ) : (
                            <span className="text-red-600 font-semibold">
                              Out of stock
                            </span>
                          )}
                          {` (${product.stock})`}
                        </TableCell>
                        <TableCell
                          data-label="Price"
                          className="mobile-table-cell md:table-cell text-gray-600"
                        >
                          <div className="flex flex-col items-end md:items-start">
                            {product.price !== product.salePrice && (
                              <span className="line-through text-gray-400">
                                ${product.price.toFixed(2)}
                              </span>
                            )}
                            <span>${product.salePrice.toFixed(2)}</span>
                          </div>
                        </TableCell>
                        <TableCell
                          data-label="Type"
                          className="mobile-table-cell md:table-cell lg:table-cell hidden text-gray-600"
                        >
                          {product.type}
                        </TableCell>
                        <TableCell
                          data-label="Views"
                          className="mobile-table-cell md:table-cell lg:table-cell hidden text-gray-600"
                        >
                          {product.views}
                        </TableCell>
                        <TableCell
                          data-label="Date"
                          className="mobile-table-cell md:table-cell text-gray-600"
                        >
                          <div className="flex flex-col text-xs items-end md:items-start">
                            <span>{formatDate(product.date)}</span>
                            <span className="text-gray-400">Last Modified</span>
                          </div>
                        </TableCell>
                        <TableCell className="mobile-table-cell md:table-cell">
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="block md:table-row">
                      <TableCell
                        colSpan={11}
                        className="h-24 text-center block md:table-cell"
                      >
                        No products found. Try adjusting your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
