import CardBox from 'src/components/shared/CardBox';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import SliderTable from './SliderTable';

const Slider = () => {
  return (
    <div>
      <BreadcrumbComp items={[{ title: 'Sliders', to: '/' }]} title="Sliders" />
      <CardBox>
        <SliderTable />
      </CardBox>
    </div>
  );
};

export default Slider;
