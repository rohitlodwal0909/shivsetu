import CardBox from 'src/components/shared/CardBox';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import ProductTable from './ProductTable';

const Product = () => {
  return (
    <div>
      <BreadcrumbComp items={[{ title: 'Products', to: '/' }]} title="Products" />
      <CardBox>
        <ProductTable />
      </CardBox>
    </div>
  );
};

export default Product;
