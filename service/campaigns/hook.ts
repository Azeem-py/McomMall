import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '../api';
import { CreateCampaignDto } from './types';
import { ErrorResponse } from '../listings/hook';

export const useAddCampaign = () => {
  const create = async (payload: CreateCampaignDto) => {
    try {
      const response = await api.post('/campaigns', payload);
      return response.data;
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      throw new Error(
        err.response?.data?.message ||
          err.message ||
          'Failed to create campaign'
      );
    }
  };

  const mutation = useMutation({
    mutationFn: create,
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
