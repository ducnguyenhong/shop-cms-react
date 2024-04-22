import { Input } from 'antd';
import { memo } from 'react';
import { useParamsURL } from 'src/utils/helper';

const FilterSearch: React.FC = () => {
  const { paramsURL, setParamsURL } = useParamsURL();
  const { keyword } = paramsURL || {};

  return (
    <div>
      <p className="font-semibold text-sm mb-1">Tìm kiếm</p>
      <Input
        className="h-10"
        allowClear
        placeholder="Nhập từ khóa..."
        defaultValue={keyword ? `${keyword}` : undefined}
        onChange={(e) => setParamsURL({ keyword: e.target.value?.trim() })}
      />
    </div>
  );
};

export default memo(FilterSearch);
