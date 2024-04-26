import { memo } from 'react';
import { TableAction } from 'src/components/table';
import { useDeleteUser } from 'src/services/user.service';
import { User } from 'src/types/user.type';

interface ActionProps {
  item: User;
}

const Action: React.FC<ActionProps> = ({ item }) => {
  const { mutate: deleteMutate, isPending } = useDeleteUser();

  return (
    <TableAction route="users" item={item} onConfirmDelete={(id) => deleteMutate({ id })} loadingConfirm={isPending} />
  );
};

export default memo(Action);
