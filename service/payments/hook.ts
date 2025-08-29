import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '../api';
import { RecordPaymentDto } from './types';
import { ErrorResponse } from '../listings/hook';

export const useRecordPayment = () => {
  const create = async (payload: RecordPaymentDto) => {
    try {
      const response = await api.post('/payments/record', payload);
      return response.data;
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      throw new Error(
        err.response?.data?.message ||
          err.message ||
          'Failed to record payment'
      );
    }
  };

  const mutation = useMutation({
    mutationFn: create,
    onSuccess: () => {
      toast.success('Payment recorded successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
