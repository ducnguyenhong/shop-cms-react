import { Table, TableProps } from 'antd';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ErrorScreen } from 'src/components/effect-screen';
import { CreateButton } from 'src/components/table';
import { useQueryNewsList } from 'src/services/news.service';
import { TableStyle } from 'src/styles/table.style';
import { News } from 'src/types/news.type';
import { WEBSITE_NAME } from 'src/utils/resource';
import Action from './action';
import TableFilter from './filter';

const NewsList: React.FC = () => {
  const { data: dataQuery = [], isLoading, error } = useQueryNewsList();

  const columns: TableProps<News>['columns'] = [
    {
      title: 'STT',
      dataIndex: 'id',
      render: (text, _, index) => <Link to={`/news/${text}/detail`}>{index + 1}</Link>
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      render: (text, record) => (
        <Link to={`/news/${record.id}/detail`}>
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
      title: 'Người tạo',
      dataIndex: 'createdBy'
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt'
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
        <title>Danh sách tin tức | {WEBSITE_NAME}</title>
      </Helmet>

      <div className="flex justify-end mb-5">
        <CreateButton route="/news/create" />
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

export default NewsList;
