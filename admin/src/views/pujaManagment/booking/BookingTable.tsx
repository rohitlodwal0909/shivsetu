import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
} from '@tanstack/react-table';
import { Button, Tooltip } from 'flowbite-react';
import PaginationComponent from 'src/utils/PaginationComponent';
import { useEffect, useMemo, useState } from 'react';
import TableComponent from 'src/utils/TableComponent';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store';
import { Icon } from '@iconify/react/dist/iconify.js';
import ComonDeletemodal from 'src/utils/deletemodal/ComonDeletemodal';
import { toast } from 'react-toastify';
import { deletePandit } from 'src/features/pujamanagment/PanditSlice';
import { getPujaBooking } from 'src/features/pujamanagment/BookingSlice';

export interface PujaBookingType {
  id: number;
  name: string;
  mobile_no: string;
  gotra: string;
  rashi: string;
  location: string;
  amount: string;
  payment_status: string;
  payment_id: string;
  createdAt: string;
  PujaPackage?: {
    name: string;
    puja?: {
      puja_name: string;
    };
  };
}

const columnHelper = createColumnHelper<PujaBookingType>();

function PujaBookingTable() {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedRow, setSelectedRow] = useState<PujaBookingType | null>(null);

  const { bookings } = useSelector((state: RootState) => state.pujabooking) as any;

  const [searchText, setSearchText] = useState('');

  const [modals, setModals] = useState({
    add: false,
    edit: false,
    view: false,
    package: false,
    delete: false,
  });

  useEffect(() => {
    dispatch(getPujaBooking());
  }, [dispatch]);

  const handleDelete = (row) => {
    const id = row?.id;
    dispatch(deletePandit(id));
    toast.success('Pandit deleted successfully');
  };

  const handleModal = (type: keyof typeof modals, value: boolean, row?: PujaBookingType) => {
    setModals((prev) => ({ ...prev, [type]: value }));
    setSelectedRow(row);
  };

  const filteredData = useMemo(() => {
    if (!searchText) return bookings;

    return bookings.filter((item: any) =>
      item?.name?.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [bookings, searchText]);

  const columns = [
    // PUJA NAME
    columnHelper.display({
      id: 'puja',
      header: () => <span>Puja Name</span>,
      cell: ({ row }) => row.original?.PujaPackage?.puja?.puja_name || '-',
    }),

    // PACKAGE NAME
    columnHelper.display({
      id: 'package',
      header: () => <span>Package</span>,
      cell: ({ row }) => row.original?.PujaPackage?.name || '-',
    }),

    // DEVOTEE NAME
    columnHelper.accessor('name', {
      header: () => <span>Devotee</span>,
      cell: (info) => info.getValue(),
    }),

    // MOBILE
    columnHelper.accessor('mobile_no', {
      header: () => <span>Mobile</span>,
      cell: (info) => info.getValue(),
    }),

    // GOTRA
    columnHelper.accessor('gotra', {
      header: () => <span>Gotra</span>,
    }),

    // RASHI
    columnHelper.accessor('rashi', {
      header: () => <span>Rashi</span>,
    }),

    // LOCATION
    columnHelper.accessor('location', {
      header: () => <span>Location</span>,
    }),

    // AMOUNT
    columnHelper.accessor('amount', {
      header: () => <span>Amount</span>,
      cell: (info) => `₹ ${info.getValue()}`,
    }),

    // PAYMENT STATUS
    columnHelper.accessor('payment_status', {
      header: () => <span>Status</span>,
      cell: (info) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            info.getValue() === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {info.getValue()}
        </span>
      ),
    }),

    // DATE
    columnHelper.accessor('createdAt', {
      header: () => <span>Booking Date</span>,
      cell: (info) => new Date(info.getValue()).toLocaleDateString('en-IN'),
    }),

    // ACTION
    columnHelper.display({
      id: 'actions',
      header: () => <span>Actions</span>,
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Tooltip content="View">
            <Button
              size="xs"
              color="info"
              outline
              onClick={() => handleModal('view', true, row.original)}
            >
              <Icon icon="solar:eye-outline" height={18} />
            </Button>
          </Tooltip>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="p-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search Pandit..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="p-2 border rounded-md border-gray-300"
        />
      </div>

      <div className="w-full overflow-x-auto">
        <TableComponent table={table} flexRender={flexRender} columns={columns} />
      </div>

      <PaginationComponent table={table} />

      {modals.delete && (
        <ComonDeletemodal
          isOpen={modals.delete}
          setIsOpen={() => handleModal('delete', false)}
          selectedUser={selectedRow}
          title="Are you sure you want to delete this pooja booking?"
          handleConfirmDelete={handleDelete}
        />
      )}
    </>
  );
}

export default PujaBookingTable;
