import { Button, Form, Input, InputNumber } from 'antd';
import { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { ButtonBack } from 'src/components/button';
import { ErrorScreen, LoadingScreen } from 'src/components/effect-screen';
import { FormSelectQuery } from 'src/components/form';
import FormEditor from 'src/components/form/form-editor';
import FormItemUpload from 'src/components/form/form-upload';
import { useCreateProducts, useQueryProductsDetail } from 'src/services/products.service';
import { WEBSITE_NAME } from 'src/utils/resource';
import { FieldType } from './type';

const ProductsCreate: React.FC = () => {
  const { id } = useParams();
  const { isPending: loadingCreate, mutate: createMutate } = useCreateProducts();
  const { isPending: loadingUpdate, mutate: updateMutate } = useCreateProducts();
  const { isLoading: loadingDetail, data: productsDetail, error: errorDetail } = useQueryProductsDetail(id);

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

  const { title, description, thumbnail, price, quantity } = productsDetail || {};

  return (
    <div className="w-full md:w-[60%] lg:w-[50%] 2xl:w-[65%] mx-auto">
      <Helmet>
        <title>
          {id ? 'Tạo' : 'Cập nhật'} sản phẩm | {WEBSITE_NAME}
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
          label={<p className="font-bold text-md">Tên sản phẩm</p>}
          name="title"
          initialValue={title}
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
        >
          <Input className="py-2" />
        </Form.Item>

        <FormSelectQuery
          allowClear
          mode="multiple"
          rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
          label="Danh mục"
          labelKey="name"
          valueKey="id"
          name="categoryIds"
          request={{
            url: '/api/category/get-all'
          }}
        />

        <Form.Item<FieldType>
          label={<p className="font-bold text-md">Giá sản phẩm</p>}
          name="price"
          initialValue={price}
          rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
        >
          <InputNumber className="py-1 w-full" />
        </Form.Item>

        <Form.Item<FieldType>
          label={<p className="font-bold text-md">Số lượng trong kho</p>}
          name="quantity"
          initialValue={quantity}
        >
          <InputNumber className="py-1 w-full" />
        </Form.Item>

        <FormItemUpload name="thumbnail" label="Ảnh " />

        <Form.Item
          label={<p className="font-bold text-md">Mô tả sản phẩm</p>}
          name="description"
          initialValue={description}
        >
          <FormEditor defaultValue={description} />
        </Form.Item>

        <div className="flex items-center gap-8 mt-20 justify-center">
          <div className="hidden md:block">
            <ButtonBack route="/products" />
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

export default ProductsCreate;
