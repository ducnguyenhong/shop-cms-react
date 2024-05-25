import { Form, Select } from 'antd';
import { Rule } from 'antd/es/form';
import { DefaultOptionType } from 'antd/es/select';
import { memo } from 'react';

interface Props {
  name: string | number | (string | number)[];
  options: DefaultOptionType[];
  label?: string;
  className?: string;
  rules?: Rule[];
  mode?: 'multiple';
  labelInValue?: boolean;
  placeholder?: string;
  allowClear?: boolean;
  initialValue?: Record<string, unknown>;
}

const FormSelect: React.FC<Props> = (props) => {
  const {
    name,
    className,
    label,
    rules,
    initialValue,
    options,
    mode,
    labelInValue = true,
    placeholder,
    allowClear,
    ...rest
  } = props;

  return (
    <Form.Item
      name={name}
      label={label ? <p className="font-bold text-md">{label}</p> : undefined}
      rules={rules}
      labelCol={{ span: 24 }}
      className={className}
      initialValue={initialValue}
      {...rest}
    >
      <Select
        className="h-[38px]"
        options={options}
        style={{ width: '100%' }}
        mode={mode}
        labelInValue={labelInValue}
        placeholder={placeholder || 'Chọn...'}
        filterOption={false}
        allowClear={allowClear}
      />
    </Form.Item>
  );
};

export default memo(FormSelect);
