import CardBox from 'src/components/shared/CardBox';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import CategoryTable from './CategoryTable';

const Category = () => {
  return (
    <div>
      <BreadcrumbComp items={[{ title: 'Product Category', to: '/' }]} title="Product Category" />
      <CardBox>
        <CategoryTable />
      </CardBox>
    </div>
  );
};

export default Category;
