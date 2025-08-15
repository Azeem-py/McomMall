export interface UserInterface {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirm_password: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = 'admin',
  OWNER = 'owner',
  CUSTOMER = 'customer',
}

export interface AuthInterface {
  email: string;
  password: string;
  role?: string;
}

export interface LoginResponse {
  auth: {
    refreshToken: string;
    accessToken: string;
  };
  name: string;
  role: UserRole;
}

export interface ClaimInterface {
  plaid_id: string;
  returnUrl: string;
}
