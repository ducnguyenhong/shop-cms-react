import { Helmet } from 'react-helmet';
import { WEBSITE_NAME } from 'src/utils/resource';

const Dashboard: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Bảng điều khiển | {WEBSITE_NAME}</title>
      </Helmet>
      <div>a</div>
    </div>
  );
};

export default Dashboard;
