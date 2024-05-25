import { Table, TableProps } from 'antd';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ErrorScreen } from 'src/components/effect-screen';
import { CreateButton } from 'src/components/table';
import { useQueryProductsList } from 'src/services/products.service';
import { TableStyle } from 'src/styles/table.style';
import { Product } from 'src/types/products.type';
import { WEBSITE_NAME } from 'src/utils/resource';
import Action from './action';
import TableFilter from './filter';

const ProductsList: React.FC = () => {
  const { data: dataQuery = [], isLoading, error } = useQueryProductsList();

  const columns: TableProps<Product>['columns'] = [
    {
      title: 'STT',
      dataIndex: 'id',
      render: (text, _, index) => <Link to={`/products/${text}/detail`}>{index + 1}</Link>
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'title',
      render: (text, record) => (
        <Link to={`/products/${record.id}/detail`}>
          <p className="font-semibold">{text}</p>
        </Link>
      )
    },
    {
      title: 'Mô tả',
      dataIndex: 'description'
    },
    {
      title: 'Ảnh bìa',
      dataIndex: 'thumbnail'
    },
    {
      title: 'Giá sản phẩm',
      dataIndex: 'price'
    },
    {
      title: 'Hành động',
      render: (_, record) => <Action item={record} />
    }
  ];

  // const { data, pagination } = dataQuery || {};
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
        dataSource={dataQuery}
        loading={isLoading}
        pagination={false}
        rowKey="id"
        scroll={{ x: 1500, scrollToFirstRowOnChange: true }}
      />
      {/* <div className="flex justify-end mt-10">
        <Pagination defaultPage={page} totalItems={totalItems} />
      </div> */}
    </TableStyle>
  );
};

export default ProductsList;
