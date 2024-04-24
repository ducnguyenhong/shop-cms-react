import { Table, TableProps } from 'antd';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ErrorScreen } from 'src/components/effect-screen';
import { CreateButton, Pagination } from 'src/components/table';
import { useQueryCategoryList } from 'src/services/category.service';
import { TableStyle } from 'src/styles/table.style';
import { Category } from 'src/types/category.type';
import { WEBSITE_NAME } from 'src/utils/resource';
import Action from './action';
import TableFilter from './filter';

const CategoryList: React.FC = () => {
  const { data: dataQuery, isLoading, error } = useQueryCategoryList();

  const columns: TableProps<Category>['columns'] = [
    {
      title: 'STT',
      dataIndex: 'id',
      render: (text, _, index) => <Link to={`/categories/${text}/detail`}>{index + 1}</Link>
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      render: (text, record) => (
        <Link to={`/categories/${record.id}/detail`}>
          <p className="font-semibold">{text}</p>
        </Link>
      )
    },
    {
      title: 'Danh mục cha',
      dataIndex: 'parentId'
    },
    {
      title: 'Đường dẫn',
      dataIndex: 'url'
    },
    {
      title: 'Hành động',
      render: (_, record) => <Action item={record} />
    }
  ];

  const { data, pagination } = dataQuery || {};
  const { totalItems, page } = pagination || {};

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
      <TableFilter />
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={false}
        rowKey="id"
        scroll={{ x: 1500, scrollToFirstRowOnChange: true }}
      />
      <div className="flex justify-end mt-10">
        <Pagination defaultPage={page} totalItems={totalItems} />
      </div>
    </TableStyle>
  );
};

export default CategoryList;
