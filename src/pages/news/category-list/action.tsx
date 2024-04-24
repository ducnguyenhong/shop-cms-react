import { memo } from 'react';
import { TableAction } from 'src/components/table';
import { useDeleteCategory } from 'src/services/category.service';
import { Category } from 'src/types/category.type';

interface ActionProps {
  item: Category;
}

const Action: React.FC<ActionProps> = ({ item }) => {
  const { mutate: deleteMutate, isPending } = useDeleteCategory();

  return <TableAction item={item} onConfirmDelete={(id) => deleteMutate({ id })} loadingConfirm={isPending} />;
};

export default memo(Action);
