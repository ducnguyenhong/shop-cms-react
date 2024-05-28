import { notification } from 'antd';
import queryString from 'query-string';
import { useLocation, useSearchParams } from 'react-router-dom';

interface ToastConfig {
  message: string;
  content?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

export const showToast = (config: ToastConfig) => {
  const { type = 'success', message, content } = config;
  notification[type]({ message, description: content });
};

export const paramsToObject = (entries: IterableIterator<[string, string]>) => {
  const result: Record<string, string> = {};
  for (const [key, value] of entries) {
    result[key] = value;
  }
  return result;
};

export const useSetParamsURL = () => {
  const setSearchParams = useSearchParams()[1];

  return (params: Record<string, string>) => setSearchParams(new URLSearchParams(params));
};

export const useRemoveParamURL = () => {
  const setSearchParams = useSearchParams()[1];

  return (keys = []) =>
    setSearchParams((curr) => {
      const newParams = paramsToObject(curr.entries());
      keys.forEach((key) => {
        delete newParams[key];
      });
      return new URLSearchParams(newParams);
    });
};

export const useGetParamsURL = () => {
  const location = useLocation();
  return queryString.parse(location.search);
};

export const useParamsURL = () => {
  const paramsURL = useGetParamsURL();
  const setParamsURL = useSetParamsURL();
  return { paramsURL, setParamsURL };
};

export const convertFileToBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export const formatCurrency = (price: number | string) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(price));
