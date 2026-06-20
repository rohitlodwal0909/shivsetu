import CardBox from 'src/components/shared/CardBox';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import PujaBookingTable from './BookingTable';

const PujaBooking = () => {
  return (
    <div>
      <BreadcrumbComp title={'Puja Bookings'} />
      <CardBox>
        <PujaBookingTable />
      </CardBox>
    </div>
  );
};

export default PujaBooking;
