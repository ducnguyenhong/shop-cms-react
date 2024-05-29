import { memo } from 'react';
import { TableAction } from 'src/components/table';
import { useDeleteCategory } from 'src/services/category.service';
import { Order } from 'src/types/order.type';

interface ActionProps {
  item: Order;
}

const Action: React.FC<ActionProps> = ({ item }) => {
  const { mutate: deleteMutate, isPending } = useDeleteCategory();

  return (
    <TableAction route="orders" item={item} onConfirmDelete={(id) => deleteMutate({ id })} loadingConfirm={isPending} />
  );
};

export default memo(Action);
