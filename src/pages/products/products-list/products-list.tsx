import { Image, Table, TableProps } from 'antd';
import { Helmet } from 'react-helmet';
import { ErrorScreen } from 'src/components/effect-screen';
import { CreateButton, Pagination } from 'src/components/table';
import { useQueryProductsList } from 'src/services/products.service';
import { TableStyle } from 'src/styles/table.style';
import { Product } from 'src/types/products.type';
import { formatCurrency, useGetParamsURL } from 'src/utils/helper';
import { WEBSITE_NAME } from 'src/utils/resource';
import Action from './action';
import TableFilter from './filter';

const ProductsList: React.FC = () => {
  const { data: dataQuery = [], isLoading, error } = useQueryProductsList();
  const paramsURL = useGetParamsURL();
  const { page = 1 } = paramsURL || {};

  const columns: TableProps<Product>['columns'] = [
    {
      title: 'STT',
      dataIndex: 'id',
      render: (text, _, index) => <p>{index + 1}</p>
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'title',
      render: (text, record) => <p className="font-semibold">{text}</p>
    },
    {
      title: 'Ảnh sản phẩm',
      dataIndex: 'imagesUrl',
      render: (images) => {
        if (Array.isArray(images)) {
          return (
            <div className="flex gap-2 flex-wrap">
              {images.slice(0, 4).map((i, idx) => (
                <div key={idx} className="w-16 h-10">
                  <Image src={i} style={{ objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          );
        }
        return null;
      }
    },
    {
      title: 'Giá sản phẩm',
      dataIndex: 'price',
      render: (price) => formatCurrency(price)
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity'
    },
    {
      title: 'Hành động',
      render: (_, record) => <Action item={record} />
    }
  ];

  const { content = [] } = dataQuery || {};
  // const { totalItems, page } = pagination || {};

  if (error) {
    return <ErrorScreen message={error?.message} className="mt-20" />;
  }

  return (
    <TableStyle>
      <Helmet>
        <title>Danh sách sản phẩm| {WEBSITE_NAME}</title>
      </Helmet>

      <div className="flex justify-end mb-5">
        <CreateButton route="/products/create" />
      </div>
      <TableFilter />
      <Table
        columns={columns}
        dataSource={content}
        loading={isLoading}
        pagination={false}
        rowKey="id"
        scroll={{ x: 1500, scrollToFirstRowOnChange: true }}
      />
      <div className="flex justify-end mt-10">
        <Pagination defaultPage={Number(page)} totalItems={100} />
      </div>
    </TableStyle>
  );
};

export default ProductsList;
