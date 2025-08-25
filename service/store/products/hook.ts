import { useMutation, useQuery } from '@tanstack/react-query';
import api from '@/service/api';
import { CreateProductDto, Product } from './types';

const getMyProducts = async (): Promise<Product[]> => {
  const { data } = await api.get('/product/mine');
  return data;
};

export const useGetMyProducts = () => {
  return useQuery({
    queryKey: ['my-products'],
    queryFn: getMyProducts,
  });
};

const addProduct = async (productData: CreateProductDto) => {
  const { data } = await api.post('/product', productData);
  return data;
};

export const useAddProduct = () => {
  return useMutation({
    mutationFn: addProduct,
  });
};
