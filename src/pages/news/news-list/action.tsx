import { memo } from 'react';
import { TableAction } from 'src/components/table';
import { useDeleteNews } from 'src/services/news.service';
import { News } from 'src/types/news.type';

interface ActionProps {
  item: News;
}

const Action: React.FC<ActionProps> = ({ item }) => {
  const { mutate: deleteMutate, isPending } = useDeleteNews();

  return (
    <TableAction route="news" item={item} onConfirmDelete={(id) => deleteMutate({ id })} loadingConfirm={isPending} />
  );
};

export default memo(Action);
