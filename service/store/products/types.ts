export interface CreateProductDto {
  bussinessId: string;
  title: string;
  category: string;
  productType: string;
  price: number;
  description: string;
  sku: string;
  shortDescription?: string;
  imageUrl?: string;
  productUrl?: string;
  fileUrls?: string[];
  downloadLimit?: number;
  downloadExpiry?: number;
  enableStockManagement?: boolean;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  productStatus?: string;
  visibility?: string;
  purchaseNote?: string;
  enableReviews?: boolean;
  tags?: string[];
}

export interface Product {
  id: string;
  bussinessId: string;
  title: string;
  category: string;
  productType: string;
  price: number;
  salePrice?: number;
  description: string;
  shortDescription?: string;
  sku: string;
  imageUrl?: string;
  productUrl?: string;
  fileUrls?: string[];
  downloadLimit?: number;
  downloadExpiry?: number;
  enableStockManagement?: boolean;
  stock?: number;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  productStatus: string;
  visibility: string;
  purchaseNote?: string;
  enableReviews?: boolean;
  tags?: string[];
  brand?: string;
  views?: number;
  createdAt?: string;
  updatedAt?: string;
}
