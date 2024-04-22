import { Helmet } from 'react-helmet';
import { WEBSITE_NAME } from 'src/utils/resource';

const NewOrder: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Đơn hàng mới | {WEBSITE_NAME}</title>
      </Helmet>
      <div>Xem mẫu tại Danh mục sản phẩm</div>
    </div>
  );
};

export default NewOrder;
