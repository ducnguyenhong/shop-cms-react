import { Table, TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { ErrorScreen } from 'src/components/effect-screen';
import { useQueryUserList } from 'src/services/user.service';
import { TableStyle } from 'src/styles/table.style';
import { User } from 'src/types/user.type';
import Action from './action';
import TableFilter from './filter';

const UserList: React.FC = () => {
  const { data: dataQuery = [], isLoading, error } = useQueryUserList();

  const columns: TableProps<User>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (text, _, index) => <Link to={`/users/${text}/detail`}>{index + 1}</Link>
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      render: (text, record) => (
        <Link to={`/users/${record.id}/detail`}>
          <p className="font-semibold">{text}</p>
        </Link>
      )
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      render: (text) => <a href={`tel:${text}`}>{text}</a>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (text) => <a href={`mailto:${text}`}>{text}</a>
    },
    {
      title: 'Role',
      dataIndex: 'authorities',
      render: (text, record) => {
        const authorities = record?.authorities || [];

        return (
          <div>
            {authorities.map((item) => (
              <p>{item.role}</p>
            ))}
          </div>
        );
      }
    },
    {
      title: 'Hành động',
      render: (_, record) => <Action item={record} />
    }
  ];

  // const { pagination } = dataQuery || {};
  // const { totalItems, page } = pagination || {};

  if (error) {
    return <ErrorScreen message={error?.message} className="mt-20" />;
  }

  return (
    <TableStyle>
      {/* <div className="flex justify-end mb-5">
        <CreateButton route="/users/create" />
      </div> */}
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

export default UserList;
