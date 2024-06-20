import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { Product } from 'src/types/products.type';
import { API } from 'src/utils/API';
import { showToast, useGetParamsURL } from 'src/utils/helper';

export const useQueryProductsList = () => {
  const paramsURL = useGetParamsURL();
  const { page = 1 } = paramsURL || {};

  const queryKey = ['GET_PRODUCTS_LIST', page];
  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/product/search',
        params: { pageSize: 10, pageNumber: Number(page) - 1 }
      })
  });
};

export const useCreateProducts = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (params: Record<string, unknown>) => {
      return API.request({
        url: '/api/product',
        method: 'POST',
        params
      })
        .then(() => {
          showToast({ type: 'success', message: 'Tạo sản phẩm thành công' });
          navigate(-1);
        })
        .catch((e) => {
          showToast({ type: 'error', message: `Thao tác thất bại. ${e.message}` });
        });
    }
  });
};

export const useUpdateProducts = (id: string | undefined) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: Record<string, unknown>) => {
      return API.request({
        url: `/api/product/${id}`,
        method: 'PATCH',
        params
      })
        .then(() => {
          showToast({ type: 'success', message: 'Tạo sản phẩm thành công' });
          queryClient.resetQueries({ queryKey: ['GET_PRODUCTS_LIST'] });
          navigate(-1);
        })
        .catch((e) => {
          showToast({ type: 'error', message: `Thao tác thất bại. ${e.message}` });
        });
    }
  });
};

export const useDeleteProducts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: Record<string, unknown>) => {
      const { id } = params;
      return API.request({
        url: `/api/product/${id}`,
        method: 'DELETE'
      })
        .then(() => {
          showToast({ type: 'success', message: 'Xoá products thành công' });
          queryClient.resetQueries({ queryKey: ['GET_PRODUCTS_LIST'] });
        })
        .catch((e) => {
          showToast({ type: 'error', message: `Thao tác thất bại. ${e.message}` });
        });
    }
  });
};

export const useQueryProductsDetail = (id?: string) => {
  const queryKey = ['GET_PRODUCTS_DETAIL', id];
  const queryClient = useQueryClient();
  const dataClient: Product | any = queryClient.getQueryData(queryKey);

  const { data, isLoading, error } = useQuery<Product>({
    queryKey,
    queryFn: () =>
      API.request({
        url: `/api/product/get-by-id/${id}`
      }),
    enabled: !!id
  });

  if (!isEmpty(dataClient)) {
    return { data: dataClient, isLoading: false, error: null };
  }
  return { data, isLoading, error };
};
