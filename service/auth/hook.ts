import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import api from '../api';
import {
  UserInterface,
  AuthInterface,
  LoginResponse,
  ClaimInterface,
} from './types';

export interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const useCreateUser = () => {
  const create = async (payload: UserInterface) => {
    try {
      const response = await api.post('users/create', { ...payload });
      return response.data;
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      throw new Error(
        err.response?.data?.message ||
          err.message ||
          'Failed to create user account'
      );
    }
  };

  const mutation = useMutation({
    mutationFn: create,
  });
  return mutation;
};

import { store } from '@/lib/redux/store';
import { setAuth } from '@/lib/redux/authSlice';

export const useLogin = () => {
  const login = async (payload: AuthInterface): Promise<LoginResponse> => {
    try {
      const response = await api.post('auth', {
        ...payload,
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      throw new Error(
        err.response?.data?.message ||
          err.message ||
          'Failed to create business'
      );
    }
  };

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: data => {
      localStorage.setItem('user-type', String(data.role));
      localStorage.setItem('user-name', data.name);

      // Set access token for 30 minutes
      Cookies.set('access', data.auth.accessToken, { expires: 1 / 48 }); // 30 minutes

      // Set refresh token for 7 days
      Cookies.set('refresh', data.auth.refreshToken, { expires: 7 });

      store.dispatch(
        setAuth({
          access_token: data.auth.accessToken,
          user_name: data.name,
          user_role: data.role,
        })
      );
    },
  });
  return mutation;
};

export const useClaimBusiness = () => {
  const claim = async (payload: ClaimInterface) => {
    try {
      const response = await api.post('claim/start', {
        ...payload,
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      throw new Error(
        err.response?.data?.message ||
          err.message ||
          'Failed to create business'
      );
    }
  };

  const mutation = useMutation({
    mutationFn: claim,
    onSuccess: data => {
      if (data.authUrl) {
        window.location.href = data.authUrl;
      } else {
        alert('Unable to start Google verification.');
      }
    },
  });
  return mutation;
};
