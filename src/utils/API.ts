import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { CK_JWT_TOKEN } from 'src/states/common';

interface RequestConfig {
  url: string;
  baseUrl?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  params?: Record<string, unknown>;
  headers?: Record<string, unknown>;
  isUpload?: boolean;
}

export const API = {
  request: (config: RequestConfig) => {
    const { baseUrl = import.meta.env.VITE_API_DOMAIN, method = 'GET', url, params, headers, isUpload } = config;
    const token = Cookies.get(CK_JWT_TOKEN);
    const requestConfig: AxiosRequestConfig = {
      url: `${baseUrl}${url}`,
      method,
      headers: {
        'Content-Type': isUpload ? 'multipart/form-data' : 'application/json',
        Authorization: token ? `Bearer ${token}` : undefined,
        ...headers
      },
      data: method !== 'GET' ? params : undefined,
      params: method === 'GET' ? params : undefined,
      timeout: 60000,
      timeoutErrorMessage: 'Hệ thống không phản hồi. Vui lòng thử lại sau!'
    };

    return axios(requestConfig)
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        const error = e?.response?.data ? { message: e?.response?.data?.description } : e;
        return Promise.reject(error);
      });
  }
};
