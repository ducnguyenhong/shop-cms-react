import { Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
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
      render: (text, _, index) => <Link to={`/orders/${text}/detail`}>{index + 1}</Link>
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customerInfo',
      render: (customerInfo, record) => (
        <div>
          <div className="flex gap-3">
            <Link to={`/users/${record.id}/detail`}>
              <img src={ImgAvatar} className="w-12 h-12" />
            </Link>
            <div className="flex flex-col flex-1">
              <Link to={`/users/${record.id}/detail`}>
                <p className="font-bold uppercase">{customerInfo?.fullName}</p>
              </Link>
              <div className="flex items-center gap-2">
                <FaPhone size={13} color="#828282" />
                <p>{customerInfo?.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt size={13} color="#828282" />
                <p>{customerInfo?.address}</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'productList',
      render: (productList) => {
        if (!Array.isArray(productList) || !productList.length) {
          return null;
        }
        return (
          <div>
            {productList.map((item: any) => {
              const { productId, quantity, finalImage } = item;
              return (
                <div className="flex gap-3">
                  <img src={finalImage} className="w-16 h-12 object-cover" />
                  <div className="flex flex-col flex-1 -mt-1">
                    <p className="font-bold">{productId}</p>
                    <p>
                      Số lượng: <span className="font-semibold">{quantity}</span>
                    </p>
                    <p>
                      Thành tiền: <span className="font-semibold">{formatCurrency(100000)}</span>
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
      dataIndex: 'paymentMethod',
      render: (paymentMethod) => {
        let method = '';
        if (paymentMethod === 'BANK') {
          method = 'Thanh toán chuyển khoản';
        }
        if (paymentMethod === 'COD') {
          method = 'Thanh toán Ship COD';
        }

        return (
          <div>
            <p className="font-bold text-blue-600 text-lg">{formatCurrency(100000)}</p>
            <p className="font-medium">{method}</p>
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
