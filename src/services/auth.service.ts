import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { tokenState, userInfoAtom } from 'src/states/common';
import { User } from 'src/types/user.type';
import { API } from 'src/utils/API';
import { showToast } from 'src/utils/helper';

export const useMutateLogin = () => {
  const navigate = useNavigate();
  const setToken = useSetRecoilState(tokenState);

  return useMutation({
    mutationFn: (params: Record<string, unknown>) => {
      return API.request({
        url: '/auth/login',
        method: 'POST',
        params: params
      })
        .then((res) => {
          const token = res.accessToken;
          setToken(token);
          navigate('/');
        })
        .catch(() => {
          showToast({ type: 'error', message: 'Tài khoản hoặc mật khẩu không chính xác' });
        });
    }
  });
};

export const useMutateLogout = () => {
  return useMutation({
    mutationFn: () => {
      return API.request({
        url: '/auth/logout',
        method: 'POST'
      });
    }
  });
};

export const useQueryUserInfo = () => {
  const queryKey = ['GET_USER_INFO'];
  const queryClient = useQueryClient();
  const dataClient: User | undefined = queryClient.getQueryData(queryKey);
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const [token, setToken] = useRecoilState(tokenState);

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/user-info'
      }).then((res) => {
        if (res.role !== 'ADMIN') {
          showToast({
            type: 'error',
            message: 'Bạn không có quyền đăng nhập hệ thống'
          });
          setToken(undefined);
          return;
        }

        setUserInfo(res);
        return res as User;
      }),
    enabled: isEmpty(dataClient) && !!token
  });

  if (!isEmpty(dataClient)) {
    return { data: dataClient, isLoading: false, error: null };
  }
  return { data, isLoading, error };
};
