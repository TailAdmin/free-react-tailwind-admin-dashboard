export interface User {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'MODERATOR';
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  username?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  loginStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  signupStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  logoutStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  profileUpdateStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  passwordResetStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export interface ProfileUpdateData {
  name?: string;
  email?: string;
  [key: string]: any;
}

export interface PasswordResetData {
  token: string;
  password: string;
}