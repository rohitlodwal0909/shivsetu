import CardBox from 'src/components/shared/CardBox';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import PujaTable from './PujaPackageTable';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPujaWithSlug } from 'src/features/pujamanagment/PujaSlice';
import { AppDispatch, RootState } from 'src/store';

const PujaPackage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const puja = useSelector((state: RootState) => state.puja.single) as any;

  useEffect(() => {
    dispatch(getPujaWithSlug(id));
  }, [id]);

  return (
    <div>
      <BreadcrumbComp
        items={[{ title: `${puja?.puja_name}`, to: '/' }]}
        title={`${puja?.puja_name}`}
      />
      <CardBox>
        <PujaTable />
      </CardBox>
    </div>
  );
};

export default PujaPackage;
