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
import { imageUrl } from 'src/constants/contant';
import { Icon } from '@iconify/react';
import ComonDeletemodal from 'src/utils/deletemodal/ComonDeletemodal';
import { toast } from 'react-toastify';
import EditCab from './EditCab';
import CreateCab from './CreateCab';
import { deleteCab, getCab } from 'src/features/tourmanagment/CabSlice';

export interface PaginationTableType {
  id: number;
  name: string;
  icon: string;
  seating: string;
  price_per_km: number;
  ac: string;
  music_system: string;
}

const columnHelper = createColumnHelper<PaginationTableType>();

function CabTable() {
  const dispatch = useDispatch<AppDispatch>();
  const cabs = useSelector((state: RootState) => state.cab.cabs) as PaginationTableType[];

  const [selectedRow, setSelectedRow] = useState<PaginationTableType | null>(null);
  const [searchText, setSearchText] = useState('');

  const [modals, setModals] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  useEffect(() => {
    dispatch(getCab());
  }, [dispatch]);

  const handleDelete = (row: PaginationTableType) => {
    dispatch(deleteCab(row.id));
    toast.success('Cab deleted successfully');
  };

  const handleModal = (type: keyof typeof modals, value: boolean, row?: PaginationTableType) => {
    setModals((prev) => ({ ...prev, [type]: value }));
    if (row) setSelectedRow(row);
  };

  const filteredData = useMemo(() => {
    if (!searchText) return cabs;

    return cabs.filter((item) => item?.name?.toLowerCase().includes(searchText.toLowerCase()));
  }, [cabs, searchText]);

  const columns = [
    columnHelper.accessor('name', {
      header: () => <span>Cab Name</span>,
      cell: (info) => <span>{info.getValue() || '-'}</span>,
    }),

    columnHelper.accessor('seating', {
      header: () => <span>Seating</span>,
      cell: (info) => <span>{info.getValue() || '-'}</span>,
    }),

    columnHelper.accessor('price_per_km', {
      header: () => <span>Rate</span>,
      cell: (info) => <span>₹ {info.getValue()} / KM</span>,
    }),

    columnHelper.accessor('ac', {
      header: () => <span>AC</span>,
      cell: (info) => <span>{info.getValue() === 'Yes' ? 'AC' : 'Non AC'}</span>,
    }),

    columnHelper.accessor('music_system', {
      header: () => <span>Music System</span>,
      cell: (info) => <span>{info.getValue() === 'Yes' ? 'Available' : 'No'}</span>,
    }),

    columnHelper.accessor('icon', {
      header: () => <span>Image</span>,
      cell: (info) => {
        const image = info.getValue();
        return image ? (
          <img
            src={`${imageUrl + 'cabs'}/${image}`}
            alt="Cab"
            className="h-12 w-12 object-cover rounded"
          />
        ) : (
          <span>No Image</span>
        );
      },
    }),

    columnHelper.accessor('id', {
      header: () => <span>Actions</span>,
      cell: (info) => {
        const row = info.row.original;
        return (
          <div className="flex gap-2">
            <Tooltip content="Edit">
              <Button
                size="xs"
                color="success"
                outline
                onClick={() => handleModal('edit', true, row)}
              >
                <Icon icon="solar:pen-outline" height={18} />
              </Button>
            </Tooltip>

            <Tooltip content="Delete">
              <Button
                size="xs"
                color="failure"
                outline
                onClick={() => handleModal('delete', true, row)}
              >
                <Icon icon="solar:trash-bin-minimalistic-outline" height={18} />
              </Button>
            </Tooltip>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: filteredData || [],
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
          placeholder="Search Cab..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="p-2 border rounded-md border-gray-300"
        />

        <Button color="primary" onClick={() => handleModal('add', true)}>
          Create Cab
        </Button>
      </div>

      <div className="w-full overflow-x-auto">
        <TableComponent table={table} flexRender={flexRender} columns={columns} />
      </div>

      <PaginationComponent table={table} />

      {modals.add && (
        <CreateCab openModal={modals.add} setOpenModal={() => handleModal('add', false)} />
      )}

      {modals.edit && selectedRow && (
        <EditCab
          openModal={modals.edit}
          setOpenModal={() => handleModal('edit', false)}
          row={selectedRow}
        />
      )}

      {modals.delete && selectedRow && (
        <ComonDeletemodal
          isOpen={modals.delete}
          setIsOpen={() => handleModal('delete', false)}
          selectedUser={selectedRow}
          title="Are you sure you want to delete this cab?"
          handleConfirmDelete={() => handleDelete(selectedRow)}
        />
      )}
    </>
  );
}

export default CabTable;
