const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
  
  async submitContactForm(formData: ContactFormData): Promise<ApiResponse> {
    return this.makeRequest('/contact/submit', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }
  
  async getContactInfo(): Promise<ApiResponse> {
    return this.makeRequest('/contact/info');
  }
  
  async healthCheck(): Promise<ApiResponse> {
    return this.makeRequest('/health');
  }
}

export const apiService = new ApiService();