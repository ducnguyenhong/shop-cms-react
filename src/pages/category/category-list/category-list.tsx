import { Table, TableProps } from 'antd';
import { Helmet } from 'react-helmet';
import { ErrorScreen } from 'src/components/effect-screen';
import { CreateButton, Pagination } from 'src/components/table';
import { useQueryCategoryList } from 'src/services/category.service';
import { TableStyle } from 'src/styles/table.style';
import { Category } from 'src/types/category.type';
import { useGetParamsURL } from 'src/utils/helper';
import { WEBSITE_NAME } from 'src/utils/resource';
import Action from './action';

const CategoryList: React.FC = () => {
  const { data, isLoading, error } = useQueryCategoryList();
  const paramsURL = useGetParamsURL();
  const { page = 1 } = paramsURL || {};

  const columns: TableProps<Category>['columns'] = [
    {
      title: 'STT',
      dataIndex: 'id',
      render: (text, _, index) => <p>{index + 1}</p>
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      render: (text, record) => <p className="font-semibold">{text}</p>
    },
    {
      title: 'Thứ tự hiển thị',
      dataIndex: 'priority'
    },
    {
      title: 'Hành động',
      render: (_, record) => <Action item={record} />
    }
  ];

  if (error) {
    return <ErrorScreen message={error?.message} className="mt-20" />;
  }

  return (
    <TableStyle>
      <Helmet>
        <title>Danh sách danh mục | {WEBSITE_NAME}</title>
      </Helmet>

      <div className="flex justify-end mb-5">
        <CreateButton route="/categories/create" />
      </div>
      {/* <TableFilter /> */}
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={false}
        rowKey="id"
        scroll={{ x: 1500, scrollToFirstRowOnChange: true }}
      />
      <div className="flex justify-end mt-10">
        <Pagination defaultPage={Number(page)} totalItems={30} />
      </div>
    </TableStyle>
  );
};

export default CategoryList;
