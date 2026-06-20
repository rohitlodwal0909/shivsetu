import CardBox from 'src/components/shared/CardBox';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import PanditTable from './PanditTable';

const Pandit = () => {
  return (
    <div>
      <BreadcrumbComp title={'Pandit'} />
      <CardBox>
        <PanditTable />
      </CardBox>
    </div>
  );
};

export default Pandit;
