export interface AuthResponse {
  token: string;
  refreshToken: string;
  tokenType: string;
  email: string;
  expiresAt: number;
}
