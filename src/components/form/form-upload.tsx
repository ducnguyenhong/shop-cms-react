import { Button, Form, Upload } from 'antd';
import { Rule } from 'antd/es/form';
import { UploadChangeParam, UploadFile, UploadListType } from 'antd/es/upload/interface';
import { memo, useCallback, useState } from 'react';
import { showToast } from 'src/utils/helper';

interface Props {
  name: string;
  label?: string;
  className?: string;
  listType?: UploadListType;
  accept?: string;
  rules?: Rule[];
}

const FormItemUpload: React.FC<Props> = (props) => {
  const { name, className, listType = 'text', accept, label, rules } = props;
  const [fileList, setFileList] = useState<UploadFile[]>();

  const onChange = useCallback((data: UploadChangeParam<UploadFile>) => {
    const { file, fileList } = data;
    if (file.size && Math.round(file.size / 1024) > 5120) {
      showToast({ type: 'error', message: 'Kích cỡ file không được vượt quá 5 MB!' });
      return;
    }
    setFileList(fileList);
  }, []);

  return (
    <Form.Item name={name} label={label ? <p className="font-semibold text-md">{label}</p> : undefined} rules={rules}>
      <Upload
        accept={accept}
        fileList={fileList}
        name={name}
        listType={listType}
        className={className}
        showUploadList={false}
        beforeUpload={() => false}
        onChange={onChange}
      >
        <Button type="default">Tải lên</Button>
      </Upload>
    </Form.Item>
  );
};

export default memo(FormItemUpload);
