import CardBox from 'src/components/shared/CardBox';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import MarqueeTable from './MarqueeTable';

const Marquee = () => {
  return (
    <div>
      <BreadcrumbComp items={[{ title: 'Marquee', to: '/' }]} title="Marquee" />
      <CardBox>
        <MarqueeTable />
      </CardBox>
    </div>
  );
};

export default Marquee;
