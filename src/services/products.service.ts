import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { Product } from 'src/types/products.type';
import { User } from 'src/types/user.type';
import { API } from 'src/utils/API';
import { showToast, useGetParamsURL } from 'src/utils/helper';

export const useQueryProductsList = () => {
  const paramsURL = useGetParamsURL();
  const { page } = paramsURL || {};

  const queryKey = ['GET_PRODUCTS_LIST', page];
  return {
    error: null as any,
    isLoading: false,
    data: [
      {
        id: 1,
        title: 'Hoa Quả Sạch',
        description: `Nho sữa Hàn Quốc là giống nho shine Muscat có xuất xứ từ Nhật Bản, đây được coi là một trong những loại nho ngon xuất sắc nhất trên thế giới, Nho sữa Hàn Quốc cùng với các loại dưa lê Hàn Quốc, Hồng dẻo Hàn Quốc, Lê Hàn Quốc là các loại hoa quả nhập khẩu cao cấp của Hàn Quốc tại thị trường Việt Nam

        Nho sữa Hàn Quốc có mùi thơm đặc trưng, dù thưởng thức một lần cũng không bao giờ quên hương vị của nó, nho giàu giá trị dinh dưỡng, được dùng nhiều làm quà biếu, quà tặng sang trọng trong các dịp lễ tết, thăm hỏi. Hệ thống cửa hàng Trái cây Ngọc Châu cung cấp nho sữa Hàn Quốc tại Hà Nội vào khoảng thời gian từ tháng 7 đến tháng 12 hàng năm và đây cũng là mùa của nho sữa Hàn
        
        `,
        thumbnail: 'okok',
        price: 111
      }
    ]
  };
  // return useQuery<Product[]>({
  //   queryKey,
  //   queryFn: () =>
  //     API.request({
  //       url: '/api/admin/products',
  //       params: { page_index: page }
  //     })
  // });
};

export const useCreateProducts = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (params: Record<string, unknown>) => {
      return API.request({
        url: '/api/admin/products',
        method: 'POST',
        params
      })
        .then(() => {
          showToast({ type: 'success', message: 'Tạo products thành công' });
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
        url: `/admin/products/${id}`,
        method: 'PATCH',
        params
      })
        .then(() => {
          showToast({ type: 'success', message: 'Tạo products thành công' });
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
        url: `/admin/products/${id}`,
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

  const { data, isLoading, error } = useQuery<User>({
    queryKey,
    queryFn: () =>
      API.request({
        url: `/admin/products/${id}`
      }).then((res) => res.data),
    enabled: !!id
  });

  if (!isEmpty(dataClient)) {
    return { data: dataClient, isLoading: false, error: null };
  }
  return { data, isLoading, error };
};
