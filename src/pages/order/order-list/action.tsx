import { Modal, Select } from 'antd';
import { memo, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useChangeOrderStatus } from 'src/services/order.service';

interface ActionProps {
  item: any;
}

const Action: React.FC<ActionProps> = ({ item }) => {
  const { mutate: changeMutate, isPending } = useChangeOrderStatus();
  const [showChangeStatus, setShowChangeStatus] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<any>(
    item.status ? { label: item.status, value: item.status } : undefined
  );

  return (
    <div>
      <button
        onClick={() => setShowChangeStatus(true)}
        type="button"
        className="w-10 h-9 rounded-md flex items-center justify-center bg-[#009dff] hover:bg-[#008ee6] duration-200"
      >
        <FaEdit color="#FFF" size={13} />
      </button>

      <Modal
        title="Thay đổi trạng thái đơn hàng"
        open={showChangeStatus}
        cancelText="Huỷ bỏ"
        okText="Xác nhận"
        okButtonProps={{ loading: isPending }}
        onOk={() => {
          changeMutate({ id: item?.id, status: currentStatus?.value });
          setShowChangeStatus(false);
          setCurrentStatus(undefined);
        }}
        onCancel={() => {
          setShowChangeStatus(false);
          setCurrentStatus(undefined);
        }}
      >
        <p className="font-semibold mt-10 mb-2">Chọn trạng thái</p>

        <div className="mb-10">
          <Select
            value={currentStatus}
            className="w-full"
            options={[
              { label: 'NEW', value: 'NEW' },
              { label: 'PENDING', value: 'PENDING' },
              { label: 'COMPLETED', value: 'COMPLETED' },
              { label: 'CANCELLED', value: 'CANCELLED' }
            ]}
            labelInValue
            onChange={(data) => setCurrentStatus(data)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default memo(Action);
