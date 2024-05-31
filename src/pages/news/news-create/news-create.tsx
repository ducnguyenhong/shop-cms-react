import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { ButtonBack } from 'src/components/button';
import { ErrorScreen, LoadingScreen } from 'src/components/effect-screen';
import FormItemUpload from 'src/components/form/form-upload';
import { useCreateNews, useQueryNewsDetail, useUpdateNews } from 'src/services/news.service';
import { WEBSITE_NAME } from 'src/utils/resource';
import { FieldType } from './type';

const NewsCreate: React.FC = () => {
  const { id } = useParams();
  const { isPending: loadingCreate, mutate: createMutate } = useCreateNews();
  const { isPending: loadingUpdate, mutate: updateMutate } = useUpdateNews();
  const { isLoading: loadingDetail, data: newsDetail, error: errorDetail } = useQueryNewsDetail(id);

  const onFinish = useCallback(
    (values: FieldType) => {
      // console.log('ducnh values', values);
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

  const { title, description, content, thumbnail } = newsDetail || {};

  return (
    <div className="w-full md:w-[60%] lg:w-[50%] 2xl:w-[35%] mx-auto">
      <Helmet>
        <title>
          {id ? 'Tạo' : 'Cập nhật'} tin tức | {WEBSITE_NAME}
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
          label={<p className="font-bold text-md">Tiêu đề</p>}
          name="title"
          initialValue={title}
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
        >
          <Input className="py-2" />
        </Form.Item>

        <Form.Item<FieldType>
          label={<p className="font-bold text-md">Mô tả</p>}
          name="description"
          initialValue={description}
          rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
        >
          <Input className="py-2" />
        </Form.Item>
        <Form.Item<FieldType>
          label={<p className="font-bold text-md"> Nội dung</p>}
          name="content"
          initialValue={content}
          rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
        >
          <TextArea className="py-2" />
        </Form.Item>

        <FormItemUpload name="thumbnail" label="Ảnh bìa" />

        <div className="flex items-center gap-8 mt-20 justify-center">
          <div className="hidden md:block">
            <ButtonBack route="/news" />
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

export default NewsCreate;
