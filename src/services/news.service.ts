import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'src/types/common.type';
import { News } from 'src/types/news.type';
import { API } from 'src/utils/API';
import { showToast, useGetParamsURL } from 'src/utils/helper';

export const useQueryNewsList = () => {
  const paramsURL = useGetParamsURL();
  const { page } = paramsURL || {};

  const queryKey = ['GET_NEWS_LIST', page];

  return useQuery<{ data: News[]; pagination: Pagination }>({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/news',
        params: { page }
      })
  });
};

export const useCreateNews = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (params: Record<string, unknown>) => {
      return API.request({
        url: '/news',
        method: 'POST',
        params
      })
        .then(() => {
          showToast({ type: 'success', message: 'Tạo tin tức thành công' });
          navigate(-1);
        })
        .catch((e) => {
          showToast({ type: 'error', message: `Thao tác thất bại. ${e.message}` });
        });
    }
  });
};

export const useUpdateNews = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (params: Record<string, unknown>) => {
      const { id } = params;
      return API.request({
        url: `/news/${id}`,
        method: 'POST',
        params
      })
        .then(() => {
          showToast({ type: 'success', message: 'Tạo tin tức thành công' });
          navigate(-1);
        })
        .catch((e) => {
          showToast({ type: 'error', message: `Thao tác thất bại. ${e.message}` });
        });
    }
  });
};

export const useDeleteNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: Record<string, unknown>) => {
      const { id } = params;
      return API.request({
        url: `/news/${id}`,
        method: 'DELETE'
      })
        .then(() => {
          showToast({ type: 'success', message: 'Xoá tin tức thành công' });
          queryClient.resetQueries({ queryKey: ['GET_CATEGORY_LIST'] });
        })
        .catch((e) => {
          showToast({ type: 'error', message: `Thao tác thất bại. ${e.message}` });
        });
    }
  });
};

export const useQueryNewsDetail = (id?: string) => {
  const queryKey = ['GET_NEWS_DETAIL', id];
  const queryClient = useQueryClient();
  const dataClient: News | undefined = queryClient.getQueryData(queryKey);

  const { data, isLoading, error } = useQuery<News>({
    queryKey,
    queryFn: () =>
      API.request({
        url: `/news/${id}`
      }).then((res) => res.data),
    enabled: !!id
  });

  if (!isEmpty(dataClient)) {
    return { data: dataClient, isLoading: false, error: null };
  }
  return { data, isLoading, error };
};
