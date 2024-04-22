import { Pagination as AntdPagination } from 'antd';
import { memo } from 'react';
import { useSetParamsURL } from 'src/utils/helper';

interface PaginationProps {
  defaultPage?: number;
  totalItems?: number;
}

const Pagination: React.FC<PaginationProps> = ({ defaultPage, totalItems }) => {
  const setParamsURL = useSetParamsURL();

  return (
    <AntdPagination
      defaultCurrent={defaultPage || 1}
      total={totalItems}
      showSizeChanger={false}
      onChange={(e) => setParamsURL({ page: `${e}` })}
    />
  );
};

export default memo(Pagination);
