import axios from 'axios';

// In a real application, this would be configured via environment variables
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication if needed
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export interface GraduateData {
  id: string;
  name: string;
  graduationYear: number;
  degree: string;
  major: string;
  employmentStatus: 'employed' | 'unemployed' | 'further_study';
  company?: string;
  salary?: number;
  location?: string;
  furtherStudyInstitution?: string;
  furtherStudyProgram?: string;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  uploadedCount: number;
  errors?: string[];
}

export const graduateApi = {
  uploadGraduateData: async (data: GraduateData[]): Promise<UploadResponse> => {
    try {
      const response = await apiClient.post('/graduates/batch', { graduates: data });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to upload graduate data');
      }
      throw error;
    }
  },

  getGraduateStats: async () => {
    try {
      const response = await apiClient.get('/graduates/stats');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch graduate stats:', error);
      throw error;
    }
  },
};