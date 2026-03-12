import CardBox from 'src/components/shared/CardBox';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import ReviewTable from './ReviewsTable';

const Reviews = () => {
  return (
    <div>
      <BreadcrumbComp items={[{ title: 'Reviews', to: '/' }]} title="Reviews" />
      <CardBox>
        <ReviewTable />
      </CardBox>
    </div>
  );
};

export default Reviews;
