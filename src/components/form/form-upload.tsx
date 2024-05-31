import { DeleteOutlined, FileAddOutlined } from '@ant-design/icons';
import { Button, Form, Image, Upload } from 'antd';
import { Rule } from 'antd/es/form';
import { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import { memo, useCallback, useState } from 'react';
import { showToast } from 'src/utils/helper';

interface Props {
  name: string;
  label?: string;
  className?: string;
  initialValue?: { url: string; name?: string };
  accept?: string;
  rules?: Rule[];
  multiple?: boolean;
  defaultFileList?: UploadFile[];
  maxCount?: number;
}

const FormUpload: React.FC<Props> = (props) => {
  const { name, className, accept, label, rules, maxCount, defaultFileList = [], initialValue } = props;
  const [fileList, setFileList] = useState<UploadFile[]>();

  const onChange = useCallback(async (data: UploadChangeParam<UploadFile>) => {
    const { file, fileList } = data;

    if (file.size && Math.round(file.size / 1024) > 5120) {
      showToast({ type: 'error', message: 'Kích cỡ file không được vượt quá 5 MB!' });
      return;
    }
    setFileList(fileList);
  }, []);

  return (
    <Form.Item
      name={name}
      initialValue={initialValue}
      label={label ? <p className="font-bold text-md">{label}</p> : undefined}
      rules={rules}
    >
      <Upload
        name={name}
        accept={accept}
        multiple={maxCount ? maxCount > 1 : true}
        fileList={fileList}
        defaultFileList={defaultFileList}
        maxCount={maxCount}
        className={className}
        showUploadList
        beforeUpload={() => false}
        onChange={onChange}
        itemRender={(_, file, ___, { remove }) => {
          if (file.url || (file.type && file.type.startsWith('image/'))) {
            return (
              <div className="mt-5 w-full flex gap-2 items-center">
                <div className="w-1/4 overflow-hidden">
                  <Image
                    className=""
                    src={file.url || URL.createObjectURL(file.originFileObj as Blob)}
                    alt={file.name}
                  />
                </div>
                <p className="w-1/2 text-center font-semibold text-ellipsis">{file.name}</p>
                <div className="w-1/4 flex justify-end items-center">
                  <DeleteOutlined onClick={remove} style={{ color: 'red' }} />
                </div>
              </div>
            );
          } else {
            return (
              <div className="mt-1 flex gap-2 items-center">
                <div className="w-1/4 h-[50px] border border-solid overflow-hidden flex justify-center items-center ">
                  <FileAddOutlined />
                </div>
                <p className="w-1/2 text-center font-semibold text-ellipsis">{file.name}</p>
                <div className="w-1/4 flex justify-end items-center">
                  <DeleteOutlined onClick={remove} style={{ color: 'red' }} />
                </div>
              </div>
            );
          }
        }}
      >
        <Button type="default">
          <span className="font-medium text-[#828282]">Tải lên</span>
        </Button>
      </Upload>
    </Form.Item>
  );
};

export default memo(FormUpload);
