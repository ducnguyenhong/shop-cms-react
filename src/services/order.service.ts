import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { API } from 'src/utils/API';
import { showToast, useGetParamsURL } from 'src/utils/helper';

export const useQueryOrderList = () => {
  const paramsURL = useGetParamsURL();
  const { page = 1 } = paramsURL || {};

  const queryKey = ['GET_ORDER_LIST', page];
  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/product/order/admin-search',
        params: { pageSize: 10, pageNumber: Number(page) - 1 }
      }).then((res) => res?.content || [])
  });
};

export const useChangeOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: Record<string, unknown>) => {
      const { id, status } = params;
      return API.request({
        url: `/api/product/order/${id}:${status}`,
        method: 'PATCH'
      })
        .then(() => {
          showToast({ type: 'success', message: 'Thay đổi trạng thái thành công' });
          queryClient.resetQueries({ queryKey: ['GET_ORDER_LIST'] });
        })
        .catch((e) => {
          showToast({ type: 'error', message: `Thao tác thất bại. ${e.message}` });
        });
    }
  });
};
