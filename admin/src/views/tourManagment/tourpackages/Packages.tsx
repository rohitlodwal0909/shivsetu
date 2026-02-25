import CardBox from 'src/components/shared/CardBox';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import PackageTable from './PackageTable';

const Packages = () => {
  return (
    <div>
      <BreadcrumbComp items={[{ title: 'Tour Package', to: '/' }]} title="Tour Package" />
      <CardBox>
        <PackageTable />
      </CardBox>
    </div>
  );
};

export default Packages;
