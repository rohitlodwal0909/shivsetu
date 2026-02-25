import CardBox from 'src/components/shared/CardBox';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import CategoryTable from './CategoryTable';

const PujaCategory = () => {
  return (
    <div>
      <BreadcrumbComp items={[{ title: 'Puja Category', to: '/' }]} title="Puja Category" />
      <CardBox>
        <CategoryTable />
      </CardBox>
    </div>
  );
};

export default PujaCategory;
