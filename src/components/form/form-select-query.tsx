import { Form, Select } from 'antd';
import { Rule } from 'antd/es/form';
import { debounce, get, isEmpty, uniqBy } from 'lodash';
import { memo, useCallback, useMemo, useState } from 'react';
import { showToast } from 'src/utils/helper';

interface Props {
  name: string;
  label?: string;
  className?: string;
  rules?: Rule[];
  mode?: 'multiple';
  labelInValue?: boolean;
  placeholder?: string;
  allowClear?: boolean;
  loading?: boolean;
  initialValue?: any;
  labelKey?: string;
  valueKey?: string;
  query: {
    data: any;
    getData: any;
  };
}

// const { mutateAsync: getData, data, isLoading } = useMutationGetFolders();

// export const useMutationGetFolders = () => {
//   return useMutation(payload =>
//     API.request({
//       url: '/admin/courses-v2/folders-filter',
//       params: {
//         page: 0,
//         size: 100,
//         ...payload
//       }
//     })
//   );
// };

const FormSelectQuery: React.FC<Props> = (props) => {
  const {
    query,
    placeholder,
    mode,
    labelInValue = true,
    label,
    name,
    initialValue,
    loading,
    className,
    rules,
    allowClear,
    labelKey = 'title',
    valueKey = 'id'
  } = props;
  const { getData, data } = query || {};
  const { last } = data || {};
  const [page, setPage] = useState(0);
  const [options, setOptions] = useState<any>([]);
  const [keyword, setKeyword] = useState<string | undefined>();

  const finalOptions = useMemo(() => {
    const newOptions = options?.map((item: any) => ({
      label: get(item, labelKey),
      value: get(item, valueKey)
    }));
    return uniqBy(newOptions, 'value');
  }, [labelKey, options, valueKey]);

  const handleCatch = useCallback((e: any) => {
    setOptions([]);
    showToast({ type: 'error', message: e.message });
  }, []);

  const loadFirstPage = useCallback(() => {
    if (!isEmpty(options)) {
      return;
    }
    getData({ page: 0 })
      .then((res: any) => {
        setOptions(res?.data);
      })
      .catch((e: any) => handleCatch(e));
  }, [getData, handleCatch, options]);

  const loadMorePage = useCallback(
    ({ target }: any) => {
      if (last) {
        return;
      }
      if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
        setPage((p) => p + 1);
        getData({ page: page + 1, keyword })
          .then((res: any) => setOptions([...options, ...res.data]))
          .catch((e: any) => handleCatch(e));
      }
    },
    [last, getData, page, keyword, options, handleCatch]
  );

  const onSearch = debounce((value) => {
    setPage(0);
    setKeyword(value);
    getData({ page: 0, keyword: value })
      .then((res: any) => setOptions(res?.data || []))
      .catch((e: any) => handleCatch(e));
  }, 500);

  const onBlur = useCallback(() => {
    setKeyword(undefined);
    setPage(0);
    setOptions([]);
  }, []);

  return (
    <Form.Item
      name={name}
      label={label ? <p className="font-bold text-md">{label}</p> : undefined}
      rules={rules}
      labelCol={{ span: 24 }}
      initialValue={initialValue}
    >
      <Select
        options={finalOptions}
        style={{ width: '100%' }}
        className={className}
        mode={mode}
        labelInValue={labelInValue}
        placeholder={placeholder || 'Chọn...'}
        loading={loading}
        onFocus={loadFirstPage}
        onPopupScroll={loadMorePage}
        onSearch={onSearch}
        onBlur={onBlur}
        filterOption={false}
        allowClear={allowClear}
      />
    </Form.Item>
  );
};

export default memo(FormSelectQuery);
