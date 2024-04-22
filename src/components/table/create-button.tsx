import { memo } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

interface Props {
  route: string;
}

const CreateButton: React.FC<Props> = ({ route }) => {
  return (
    <Link to={route}>
      <div className="flex items-center gap-2 bg-green-600 rounded-md px-4 py-2 hover:bg-green-700 duration-200">
        <FaPlus color="#fff" />
        <span className="text-white">Tạo mới</span>
      </div>
    </Link>
  );
};

export default memo(CreateButton);
