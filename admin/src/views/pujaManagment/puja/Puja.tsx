import CardBox from 'src/components/shared/CardBox';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import PujaTable from './PujaTable';

const Puja = () => {
  return (
    <div>
      <BreadcrumbComp items={[{ title: 'Puja', to: '/' }]} title="Puja" />
      <CardBox>
        <PujaTable />
      </CardBox>
    </div>
  );
};

export default Puja;
