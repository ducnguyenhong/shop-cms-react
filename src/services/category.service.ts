import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { Category } from 'src/types/category.type';
import { Pagination } from 'src/types/common.type';
import { API } from 'src/utils/API';
import { showToast, useGetParamsURL } from 'src/utils/helper';

export const useQueryCategoryList = () => {
  const paramsURL = useGetParamsURL();
  const { page } = paramsURL || {};

  const queryKey = ['GET_CATEGORY_LIST', page];

  return useQuery<{ data: Category[]; pagination: Pagination }>({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/categories',
        params: { page }
      })
  });
};

export const useCreateCategory = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (params: Record<string, unknown>) => {
      return API.request({
        url: '/categories',
        method: 'POST',
        params
      })
        .then(() => {
          showToast({ type: 'success', message: 'Tạo danh mục thành công' });
          navigate(-1);
        })
        .catch((e) => {
          showToast({ type: 'error', message: `Thao tác thất bại. ${e.message}` });
        });
    }
  });
};

export const useUpdateCategory = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (params: Record<string, unknown>) => {
      const { id } = params;
      return API.request({
        url: `/categories/${id}`,
        method: 'POST',
        params
      })
        .then(() => {
          showToast({ type: 'success', message: 'Tạo danh mục thành công' });
          navigate(-1);
        })
        .catch((e) => {
          showToast({ type: 'error', message: `Thao tác thất bại. ${e.message}` });
        });
    }
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: Record<string, unknown>) => {
      const { id } = params;
      return API.request({
        url: `/categories/${id}`,
        method: 'DELETE'
      })
        .then(() => {
          showToast({ type: 'success', message: 'Xoá danh mục thành công' });
          queryClient.resetQueries({ queryKey: ['GET_CATEGORY_LIST'] });
        })
        .catch((e) => {
          showToast({ type: 'error', message: `Thao tác thất bại. ${e.message}` });
        });
    }
  });
};

export const useQueryCategoryDetail = (id?: string) => {
  const queryKey = ['GET_CATEGORY_DETAIL', id];
  const queryClient = useQueryClient();
  const dataClient: Category | undefined = queryClient.getQueryData(queryKey);

  const { data, isLoading, error } = useQuery<Category>({
    queryKey,
    queryFn: () =>
      API.request({
        url: `/categories/${id}`
      }).then((res) => res.data),
    enabled: !!id
  });

  if (!isEmpty(dataClient)) {
    return { data: dataClient, isLoading: false, error: null };
  }
  return { data, isLoading, error };
};
