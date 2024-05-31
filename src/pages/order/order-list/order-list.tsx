import { Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa6';
import ImgAvatar from 'src/assets/user-avatar.png';
import { ErrorScreen } from 'src/components/effect-screen';
import { Pagination } from 'src/components/table';
import { useQueryOrderList } from 'src/services/order.service';
import { TableStyle } from 'src/styles/table.style';
import { formatCurrency } from 'src/utils/helper';
import Action from './action';
import TableFilter from './filter';

const OrderList: React.FC = () => {
  const { data = [], isLoading, error } = useQueryOrderList();

  const columns: TableProps<any>['columns'] = [
    {
      title: 'STT',
      dataIndex: 'id',
      render: (text) => <p className="font-semibold">{text}</p>
    },
    {
      title: 'Khách hàng',
      dataIndex: 'receiverFullName',
      render: (_, record) => (
        <div>
          <div className="flex gap-3">
            <img src={ImgAvatar} className="w-12 h-12" />
            <div className="flex flex-col flex-1">
              <p className="font-bold uppercase">{record?.receiverFullName}</p>
              <div className="flex items-center gap-2">
                <FaPhone size={13} color="#828282" />
                <p>{record?.phoneNumber}</p>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt size={13} color="#828282" />
                <p>{record?.addressDetail}</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'orders',
      render: (productList) => {
        if (!Array.isArray(productList) || !productList.length) {
          return null;
        }
        return (
          <div className="flex flex-col gap-6">
            {productList.map((item: any) => {
              const { quantity, product } = item || {};
              const { imagesUrl, title, price } = product || {};

              return (
                <div className="flex gap-3">
                  <img src={imagesUrl?.[0]} className="w-16 h-12 object-cover" />
                  <div className="flex flex-col flex-1 -mt-1">
                    <p className="font-bold">{title}</p>
                    <p>
                      Số lượng: <span className="font-semibold">{quantity}</span>
                    </p>
                    <p>
                      Đơn giá: <span className="font-semibold">{formatCurrency(price)}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        );
      }
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'price',
      render: (price) => {
        return (
          <div>
            <p className="font-bold text-blue-600 text-lg">{formatCurrency(price)}</p>
          </div>
        );
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status) => {
        return (
          <div>
            <p className="font-bold">{status}</p>
          </div>
        );
      }
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'createdAt',
      render: (createdAt) => {
        return (
          <div>
            <p className="font-semibold">{dayjs(createdAt).format('DD/MM/YYYY HH:mm')}</p>
          </div>
        );
      }
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
        <Pagination defaultPage={1} totalItems={100} />
      </div>
    </TableStyle>
  );
};

export default OrderList;
