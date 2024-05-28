import { Modal } from 'antd';
import { memo, useState } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

interface TableActionProps {
  item: { id: string };
  onConfirmDelete?: (id: string) => void;
  loadingConfirm?: boolean;
  route: string;
  disableView?: boolean;
  disableDelete?: boolean;
  disableEdit?: boolean;
}

const TableAction: React.FC<TableActionProps> = (props) => {
  const { item, onConfirmDelete, loadingConfirm, route, disableDelete, disableView, disableEdit } = props;
  const { id } = item || {};
  const [showDelete, setShowDelete] = useState<boolean>(false);

  return (
    <div className="flex items-center gap-4">
      {!disableView && (
        <Link to={`/${route}/${id}/detail`} type="primary">
          <div className="w-10 h-9 rounded-md flex items-center justify-center bg-[#009dff] hover:bg-[#008ee6] duration-200">
            <FaEye color="#FFF" />
          </div>
        </Link>
      )}

      {!disableEdit && (
        <Link to={`/${route}/${id}/edit`} type="primary">
          <div className="w-10 h-9 rounded-md flex items-center justify-center bg-[#009dff] hover:bg-[#008ee6] duration-200">
            <FaPencilAlt size={13} color="#FFF" />
          </div>
        </Link>
      )}

      {!disableDelete && (
        <button
          onClick={() => setShowDelete(true)}
          type="button"
          className="w-10 h-9 rounded-md flex items-center justify-center bg-[#009dff] hover:bg-[#008ee6] duration-200"
        >
          <FaTrashAlt color="#FFF" size={13} />
        </button>
      )}

      <Modal
        title="Xác nhận xoá"
        open={showDelete}
        cancelText="Huỷ bỏ"
        okText="Xác nhận"
        okButtonProps={{ danger: true, loading: loadingConfirm }}
        onOk={() => {
          onConfirmDelete && onConfirmDelete(id);
          setShowDelete(false);
        }}
        onCancel={() => setShowDelete(false)}
      >
        <p className="py-5">Bạn có chắc chắn muốn xoá thông tin này?</p>
      </Modal>
    </div>
  );
};

export default memo(TableAction);
