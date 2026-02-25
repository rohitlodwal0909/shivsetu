import CardBox from 'src/components/shared/CardBox';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import BookingTable from './BookingTable';

const Booking = () => {
  return (
    <div>
      <BreadcrumbComp items={[{ title: 'Tour Bookings', to: '/' }]} title="Tour Bookings" />
      <CardBox>
        <BookingTable />
      </CardBox>
    </div>
  );
};

export default Booking;
