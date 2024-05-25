import { Button, Form, Input } from 'antd';
import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ButtonBack } from 'src/components/button';
import { ErrorScreen, LoadingScreen } from 'src/components/effect-screen';
import { FormUpload } from 'src/components/form';
// import { uploadFileCdn } from 'src/services/upload.service';
import { useCreateUser, useQueryUserDetail, useUpdateUser } from 'src/services/user.service';
// import { getFileNameFromUrl } from 'src/utils/helper';
import { FieldType } from './type';

const UserCreate: React.FC = () => {
  const { id } = useParams();
  const { isPending: loadingCreate, mutate: createMutate } = useCreateUser();
  const { isPending: loadingUpdate, mutate: updateMutate } = useUpdateUser(id);
  const { isLoading: loadingDetail, data: userDetail, error: errorDetail } = useQueryUserDetail(id);

  // const { title, user } = userDetail || {};

  const onFinish = useCallback(
    (values: FieldType) => {
      // const { user, title } = values;
      // uploadFileCdn(user).then((url) => {
      //   const data = { title, user: url };
      //   id ? updateMutate({ id, ...data }) : createMutate(data);
      // });
    },
    [createMutate, updateMutate, id]
  );

  const initialValueUser = useMemo(() => {
    // if (!user) {
    //   return undefined;
    // }
    // return {
    //   name: getFileNameFromUrl(user),
    //   url: user
    // };
  }, []);

  const defaultUser = useMemo(() => {
    // if (!user) {
    //   return undefined;
    // }
    // return [
    //   {
    //     type: 'image/*',
    //     url: user,
    //     uid: getFileNameFromUrl(user),
    //     name: getFileNameFromUrl(user)
    //   }
    // ];
  }, []);

  if (loadingDetail) {
    return <LoadingScreen className="mt-20" />;
  }

  if (errorDetail) {
    return <ErrorScreen message={errorDetail?.message} className="mt-20" />;
  }

  return (
    <div className="w-full md:w-[60%] lg:w-[50%] 2xl:w-[35%] mx-auto">
      <Form
        name="userForm"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        autoComplete="off"
        className="mt-10"
      >
        <Form.Item<FieldType>
          label={<p className="font-bold text-md">Tiêu đề</p>}
          name="title"
          // initialValue={title}
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
        >
          <Input className="py-2" />
        </Form.Item>

        <FormUpload
          name="user"
          label="User"
          maxCount={1}
          accept="image/*"
          rules={[{ required: true, message: 'Vui lòng chọn file user' }]}
          // initialValue={initialValueUser}
          // defaultFileList={defaultUser}
        />

        <div className="flex items-center gap-8 mt-20 justify-center">
          <div className="hidden md:block">
            <ButtonBack route="/categories" />
          </div>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="px-10"
              loading={loadingCreate || loadingUpdate}
            >
              <span className="font-semibold">{id ? 'Cập nhật' : 'Tạo mới'}</span>
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default UserCreate;
