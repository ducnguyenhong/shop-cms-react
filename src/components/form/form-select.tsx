import { Form, Select } from 'antd';
import { Rule } from 'antd/es/form';
import { DefaultOptionType } from 'antd/es/select';
import { memo } from 'react';

interface Props {
  name: string;
  options: DefaultOptionType[];
  label?: string;
  className?: string;
  rules?: Rule[];
  mode?: 'multiple';
  labelInValue?: boolean;
  placeholder?: string;
  allowClear?: boolean;
  initialValue?: any;
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
    allowClear
  } = props;

  return (
    <Form.Item
      name={name}
      label={label ? <p className="font-bold text-md">{label}</p> : undefined}
      rules={rules}
      labelCol={{ span: 24 }}
      className={className}
      initialValue={initialValue}
    >
      <Select
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
