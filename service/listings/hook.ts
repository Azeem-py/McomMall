import { useQuery } from '@tanstack/react-query';
import api from '../api';
import { GooglePlaceResult, GooglePlaceResults } from './types';

export interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const useGetGoogleListings = () => {
  const fetch = async () => {
    try {
      const response = await api.get('listings/google-business');
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
    queryKey: ['FETCH_GOOGLE_BUSINESSES'],
    refetchOnMount: false,
  });
  return query;
};

export const useGetGoogleListing = ({ place_id }: { place_id: string }) => {
  const fetch = async () => {
    try {
      const response = await api.get(`listings/google-business/${place_id}`);
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
