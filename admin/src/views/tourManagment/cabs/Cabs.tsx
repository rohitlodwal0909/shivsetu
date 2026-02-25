import CardBox from 'src/components/shared/CardBox';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import CabTable from './CabTable';

const Cab = () => {
  return (
    <div>
      <BreadcrumbComp items={[{ title: 'Cabs', to: '/' }]} title="Cabs" />
      <CardBox>
        <CabTable />
      </CardBox>
    </div>
  );
};

export default Cab;
