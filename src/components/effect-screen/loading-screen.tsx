import clsx from 'clsx';
import { memo } from 'react';
import ImgLoading from 'src/assets/loading.svg';

interface Props {
  className?: string;
}

const LoadingScreen: React.FC<Props> = ({ className }) => {
  return (
    <div className={clsx('flex flex-col items-center w-full h-full justify-center', className)}>
      <p className="font-semibold text-xl">Hệ thống đang tải dữ liệu</p>
      <img src={ImgLoading} alt="loading" className="w-28" />
    </div>
  );
};

export default memo(LoadingScreen);
