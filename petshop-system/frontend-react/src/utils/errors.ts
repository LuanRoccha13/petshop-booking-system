import axios, { AxiosError } from 'axios';

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string; error?: string; errors?: Array<{ message: string }> }>;
    
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }
    
    if (axiosError.response?.data?.error) {
      return axiosError.response.data.error;
    }
    
    if (axiosError.response?.data?.errors && Array.isArray(axiosError.response.data.errors)) {
      return axiosError.response.data.errors.map((e) => e.message).join('; ');
    }
    
    if (axiosError.status === 401) {
      return 'Credenciais inválidas';
    }
    
    if (axiosError.status === 400) {
      return 'Dados inválidos';
    }
    
    if (axiosError.status === 500) {
      return 'Erro interno do servidor';
    }
    
    return axiosError.message || 'Erro desconhecido';
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'Erro desconhecido';
}
