import CardBox from 'src/components/shared/CardBox';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import OrderTable from './OrderTable';

const Product = () => {
  return (
    <div>
      <BreadcrumbComp items={[{ title: 'Orders', to: '/' }]} title="Orders" />
      <CardBox>
        <OrderTable />
      </CardBox>
    </div>
  );
};

export default Product;
