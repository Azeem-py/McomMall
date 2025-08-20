import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import api, { setBearerToken } from '../api';
import {
  UserInterface,
  AuthInterface,
  LoginResponse,
  ClaimInterface,
} from './types';
import { useDispatch } from 'react-redux';
import {
  setAuthTokens,
  setUserData,
  logout as logoutAction,
} from '../store/authSlice';
import { AppDispatch } from '../store/store';

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

export const useLogin = () => {
  const dispatch: AppDispatch = useDispatch();
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
      dispatch(
        setAuthTokens({
          accessToken: data.auth.accessToken,
        })
      );
      dispatch(
        setUserData({
          userName: data.name,
          userRole: String(data.role),
        })
      );
      setBearerToken(data.auth.accessToken);
      Cookies.set('refresh', data.auth.refreshToken, { expires: 7 });
    },
  });
  return mutation;
};

export const useLogout = () => {
  const dispatch: AppDispatch = useDispatch();
  const logout = () => {
    dispatch(logoutAction());
  };
  return logout;
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
