import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserRole } from '@/service/auth/types';

interface AuthState {
  access_token: string | null;
  user_name: string | null;
  user_role: UserRole | null;
}

const initialState: AuthState = {
  access_token: null,
  user_name: null,
  user_role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ access_token: string; user_name: string; user_role: UserRole }>) => {
      state.access_token = action.payload.access_token;
      state.user_name = action.payload.user_name;
      state.user_role = action.payload.user_role;
    },
    clearAuth: (state) => {
      state.access_token = null;
      state.user_name = null;
      state.user_role = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
