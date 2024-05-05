import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { News } from 'src/types/news.type';
import { API } from 'src/utils/API';
import { showToast, useGetParamsURL } from 'src/utils/helper';

export const useQueryNewsList = () => {
  const paramsURL = useGetParamsURL();
  const { page } = paramsURL || {};

  const queryKey = ['GET_NEWS_LIST', page];

  return {
    error: null as any,
    isLoading: false,
    data: [
      {
        id: '1',
        title: 'Mưa và giông lốc ở Long An, TP HCM làm tốc mái, cây đổ',
        description:
          ' Cơn mưa lớn cùng giông lốc, nhiều phòng trọ ở Long An tốc mái, cột điện gãy, một số cây xanh tại TP HCM ngã đổ, chiều 5/5 ',
        // thumbnail: string,
        content: '  fqwj fqjpf qè pqefp qjep fjpoqe fjqepo pqef mpqe mpfqm pqm fpq mpqmfpqem fpmqe pfm eqpmf p',
        createdAt: 1234567899999
      },
      {
        id: '2',
        title: 'Cách sử dụng app chạy bộ để không bị tội phạm rình rập',
        description:
          'Theo các chuyên gia, người chạy bộ cần thắt chặt cài đặt bảo mật app, tránh việc bị người khác ...  ',
        // thumbnail: string,
        content: '  fqwj fqjpf qè pqefp qjep fjpoqe fjqepo pqef mpqe mpfqm pqm fpq mpqmfpqem fpmqe pfm eqpmf p',
        createdAt: 1234567899999
      },
      {
        id: '3',
        title: 'Tai nạn liên hoàn, cao tốc Hà Nội - Lào Cai tê liệt',
        description: `Sau va chạm với xe con, ôtô tải chở hoa quả lật nghiêng, chắn hết chiều cao tốc hướng từ Lào Cai về Hà Nội, chiều 5/5.
        Khoảng 16h30, tại cao tốc Hà Nội - Lào Cai qua huyện Bình Xuyên, xe tải`,
        content: '  fqwj fqjpf qè pqefp qjep fjpoqe fjqepo pqef mpqe mpfqm pqm fpq mpqmfpqem fpmqe pfm eqpmf p',
        createdAt: 1234567899999
      },
      {
        id: '4',
        title: 'Người Israel bất bình vì làn sóng biểu tình phản chiến ở Mỹ',
        description: `Nhiều người Israel tin rằng đám đông biểu tình ở Mỹ phản đối chiến sự Gaza đang không hiểu rõ bức tranh ... `,
        content: '  fqwj fqjpf qè pqefp qjep fjpoqe fjqepo pqef mpqe mpfqm pqm fpq mpqmfpqem fpmqe pfm eqpmf p',
        createdAt: 1234567899999
      },
      {
        id: '5',
        title: 'Huỳnh Như ghi bàn, níu hy vọng trụ hạng cho Lank FC',
        description: `
        Huỳnh Như in dấu giày vào cả hai bàn thắng của Lank Vilaverdense trong trận thắng Maritimo 2-0 ở vòng 21 Giải ..`,
        content: '  fqwj fqjpf qè pqefp qjep fjpoqe fjqepo pqef mpqe mpfqm pqm fpq mpqmfpqem fpmqe pfm eqpmf p',
        createdAt: 1234567899999
      }
    ]
  };

  // return useQuery<News[]>({
  //   queryKey,
  //   queryFn: () =>
  //     API.request({
  //       url: '/api/admin/news',
  //       params: { page_index: page }
  //     })
  // });
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
