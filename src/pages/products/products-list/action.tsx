import { memo } from 'react';
import { TableAction } from 'src/components/table';
import { useDeleteProducts } from 'src/services/products.service';
import { Product } from 'src/types/products.type';

interface ActionProps {
  item: Product;
}

const Action: React.FC<ActionProps> = ({ item }) => {
  const { mutate: deleteMutate, isPending } = useDeleteProducts();

  return (
    <TableAction
      disableView
      route="products"
      item={item}
      onConfirmDelete={(id) => deleteMutate({ id })}
      loadingConfirm={isPending}
    />
  );
};

export default memo(Action);
