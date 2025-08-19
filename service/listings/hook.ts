import { useMutation, useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import api, { setBearerToken } from '../api';
import {
  GooglePlaceResult,
  GooglePlaceResults,
  ListingFormData,
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
      const response = await api.get('listings/google-business', {
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

export const useCreateListing = () => {
  const create = async (payload: ListingFormData) => {
    try {
      const token = Cookies.get('access');
      if (token) {
        setBearerToken(token);
      }
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
  });
  return mutation;
};
