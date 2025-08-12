export interface LoginResponse {
  access_token: string;
  token_type: 'bearer'; // Usualmente el tipo de token es 'bearer'
}


export interface User {
  id: number;
  email: string;
  full_name?: string; // El '?' indica que es un campo opcional
  is_active?: boolean;
}

export interface ChangePasswordPayload {
  user: string;
  old_password: string;
  new_password: string;
}