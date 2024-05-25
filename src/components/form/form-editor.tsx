import SunEditor from 'suneditor-react';
import { UploadBeforeHandler } from 'suneditor-react/dist/types/upload';
import 'suneditor/dist/css/suneditor.min.css';

type Props = {
  options?: {
    buttonList: string[][];
    showPathLabel: boolean;
  };
  height?: string;
  defaultValue?: string;
  onChange?: (content: string) => void;
  onImageUploadBefore?: (files: File[], info: object, uploadHandler: UploadBeforeHandler) => any;
};

const FormEditor: React.FC<Props> = ({
  options = {
    buttonList: [
      ['fontSize', 'formatBlock'],
      ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
      ['align', 'horizontalRule', 'list', 'table'],
      ['fontColor', 'hiliteColor'],
      ['outdent', 'indent'],
      ['undo', 'redo'],
      ['removeFormat'],
      ['link', 'image'],
      ['preview', 'print'],
      ['fullScreen', 'showBlocks', 'codeView']
    ],
    showPathLabel: false
  },
  height = '400px',
  defaultValue = '',
  onChange,
  onImageUploadBefore
}) => {
  return (
    <SunEditor
      defaultValue={defaultValue}
      height={height}
      setOptions={options}
      onChange={onChange}
      onImageUploadBefore={onImageUploadBefore}
    />
  );
};

export default FormEditor;
