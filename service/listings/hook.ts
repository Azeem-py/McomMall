import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import api from '../api';
import {
  CreateBusinessPayload,
  GooglePlaceResult,
  GooglePlaceResults,
} from './types';

export interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const useGetGoogleListings = ({
  lat,
  lng,
  queryText,
}: {
  lat: number;
  lng: number;
  queryText: string | null;
}) => {
  const fetch = async () => {
    try {
      const response = await api.get('google/google-business', {
        params: { lat, lng, queryText },
      });
      return response.data.results as GooglePlaceResults;
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      throw new Error(
        err.response?.data?.message ||
          err.message ||
          'Failed to fetch businesses'
      );
    }
  };

  const query = useQuery({
    queryFn: fetch,
    queryKey: ['FETCH_GOOGLE_BUSINESSES', lat, lng, queryText],
    enabled: lat && lng ? true : false,
    refetchOnMount: false,
  });
  return query;
};

export const useAddListing = () => {
  const router = useRouter();
  const create = async (payload: CreateBusinessPayload) => {
    try {
      const response = await api.post('listings', { ...payload });
      return response.data;
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      throw new Error(
        err.response?.data?.message ||
          err.message ||
          'Failed to create listing'
      );
    }
  };

  const mutation = useMutation({
    mutationFn: create,
    onSuccess: data => {
      toast.success(data.message || 'Listing created successfully!');
      router.push('/dashboard/my-listings');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

export const useGetGoogleListing = ({ place_id }: { place_id: string }) => {
  const fetch = async () => {
    try {
      const response = await api.get(`google/google-business/${place_id}`);
      return response.data.result as GooglePlaceResult;
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      throw new Error(
        err.response?.data?.message || err.message || 'Failed to fetch business'
      );
    }
  };

  const query = useQuery({
    queryFn: fetch,
    queryKey: ['FETCH_GOOGLE_BUSINESS', place_id],
    refetchOnMount: false,
    staleTime: Infinity,
  });
  return query;
};

export const useGetPlacePhoto = (photoReference: string) => {
  const fetch = async () => {
    try {
      const response = await api.get(`photos/photo/${photoReference}`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      throw new Error(
        err.response?.data?.message || err.message || 'Failed to fetch photo'
      );
    }
  };

  const query = useQuery({
    queryFn: fetch,
    queryKey: ['FETCH_PLACE_PHOTO', photoReference],
    enabled: !!photoReference,
  });

  return query;
};

export const useGetUserListings = () => {
  const fetch = async () => {
    try {
      const response = await api.get('listings/mine');
      return response.data;
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      throw new Error(
        err.response?.data?.message ||
          err.message ||
          'Failed to fetch user listings'
      );
    }
  };

  const query = useQuery({
    queryFn: fetch,
    queryKey: ['FETCH_USER_LISTINGS'],
  });
  return query;
};
