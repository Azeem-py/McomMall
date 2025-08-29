import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '../api';
import { RecordPaymentDto, SubscriptionStatusResponse } from './types';
import { ErrorResponse } from '../listings/hook';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { UserRole } from '../auth/types';

export const useGetSubscriptionStatus = () => {
  const { userRole } = useSelector((state: RootState) => state.auth);

  const fetch = async (): Promise<SubscriptionStatusResponse> => {
    try {
      const response = await api.get('/payments/status');
      return response.data;
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      throw new Error(
        err.response?.data?.message ||
          err.message ||
          'Failed to fetch subscription status'
      );
    }
  };

  const query = useQuery({
    queryFn: fetch,
    queryKey: ['FETCH_SUBSCRIPTION_STATUS'],
    enabled: userRole === UserRole.OWNER,
  });

  return query;
};

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
