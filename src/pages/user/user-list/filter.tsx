import { memo } from 'react';
import { FilterSearch } from 'src/components/filter';

const TableFilter: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-x-10 mb-10 gap-y-5">
      <FilterSearch />
    </div>
  );
};

export default memo(TableFilter);
