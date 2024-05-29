import { OrderStatus } from 'src/types/order.type';

export const ORDER_STATUS: { label: string; value: OrderStatus }[] = [
  {
    value: 'NEW',
    label: 'Mới đặt hàng (NEW)'
  },
  {
    value: 'PAID',
    label: 'Đã thanh toán (PAID)'
  },
  {
    value: 'INPROGRESS',
    label: 'Đang làm (INPROGRESS)'
  },
  {
    value: 'DELIVERING',
    label: 'Đang giao hàng (DELIVERING)'
  },
  {
    value: 'COMPLETED',
    label: 'Đã hoàn tất (COMPLETED)'
  },
  {
    value: 'CANCELLED',
    label: 'Huỷ đơn (CANCELLED)'
  }
];
