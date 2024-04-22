import { Button, Form, Input } from 'antd';
import { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { ButtonBack } from 'src/components/button';
import { ErrorScreen, LoadingScreen } from 'src/components/effect-screen';
import FormItemUpload from 'src/components/form/form-upload';
import { useCreateCategory, useQueryCategoryDetail, useUpdateCategory } from 'src/services/category.service';
import { WEBSITE_NAME } from 'src/utils/resource';
import { FieldType } from './type';

const CategoryCreate: React.FC = () => {
  const { id } = useParams();
  const { isPending: loadingCreate, mutate: createMutate } = useCreateCategory();
  const { isPending: loadingUpdate, mutate: updateMutate } = useUpdateCategory();
  const { isLoading: loadingDetail, data: categoryDetail, error: errorDetail } = useQueryCategoryDetail(id);

  const onFinish = useCallback(
    (values: FieldType) => {
      console.log('ducnh values', values);

      // id ? updateMutate(values) : createMutate(values);
    },
    [createMutate, updateMutate, id]
  );

  if (loadingDetail) {
    return <LoadingScreen className="mt-20" />;
  }

  if (errorDetail) {
    return <ErrorScreen message={errorDetail?.message} className="mt-20" />;
  }

  const { title, thumbnail, parentId, url } = categoryDetail || {};

  return (
    <div className="w-full md:w-[60%] lg:w-[50%] 2xl:w-[35%] mx-auto">
      <Helmet>
        <title>
          {id ? 'Tạo' : 'Cập nhật'} danh mục | {WEBSITE_NAME}
        </title>
      </Helmet>

      <Form
        name="loginForm"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        className="mt-10"
      >
        <Form.Item<FieldType>
          label={<p className="font-semibold text-md">Tiêu đề</p>}
          name="title"
          initialValue={title}
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
        >
          <Input className="py-2" />
        </Form.Item>

        <Form.Item<FieldType>
          label={<p className="font-semibold text-md">URL</p>}
          name="url"
          initialValue={url}
          rules={[{ required: true, message: 'Vui lòng nhập URL' }]}
        >
          <Input className="py-2" />
        </Form.Item>

        <FormItemUpload name="thumbnail" label="Ảnh đại diện" />

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

export default CategoryCreate;
