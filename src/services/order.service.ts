import { useQuery } from '@tanstack/react-query';
import { API } from 'src/utils/API';
import { useGetParamsURL } from 'src/utils/helper';

export const useQueryOrderList = () => {
  const paramsURL = useGetParamsURL();
  const { page } = paramsURL || {};

  const queryKey = ['GET_ORDER_LIST', page];
  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/product/order/admin-search',
        params: { pageSize: 10, pageNumber: page }
      }).then((res) => res?.content || [])
  });
};
