import { useMutation } from '@tanstack/react-query';
import api from '@/service/api';
import { CreateProductDto } from './types';

const addProduct = async (productData: CreateProductDto) => {
  const { data } = await api.post('/product', productData);
  return data;
};

export const useAddProduct = () => {
  return useMutation({
    mutationFn: addProduct,
  });
};
