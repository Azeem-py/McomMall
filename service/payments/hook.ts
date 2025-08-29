import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

  console.log(userRole, 'userRole in hook');
  const query = useQuery({
    queryFn: fetch,
    queryKey: ['FETCH_SUBSCRIPTION_STATUS'],
    enabled: true,
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
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Failed to record payment';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const mutation = useMutation({
    mutationFn: create,
  });

  return mutation;
};

export const usePauseOrPlay = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => api.patch('/payments/trial'),
    onSuccess: () => {
      toast.success('Trial status updated successfully');
      queryClient.invalidateQueries({ queryKey: ['FETCH_SUBSCRIPTION_STATUS'] });
    },
    onError: (error: unknown) => {
      const err = error as ErrorResponse;
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Failed to update trial status';
      toast.error(errorMessage);
    },
  });

  return mutation;
};
