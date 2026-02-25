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
import CreatePackage from './CreatePackage';
import { useDispatch, useSelector } from 'react-redux';
import { getState } from 'src/features/location/locationSlice';
import { AppDispatch, RootState } from 'src/store';
import {
  deletePackage,
  getPackage,
  updatePackageStatus,
} from 'src/features/tourmanagment/PackageSlice';
import { imageUrl } from 'src/constants/contant';
import ViewPackage from './ViewPackage';
import { Icon } from '@iconify/react/dist/iconify.js';
import ComonDeletemodal from 'src/utils/deletemodal/ComonDeletemodal';
import { toast } from 'react-toastify';
import EditPackage from './EditPackage';

export interface PaginationTableType {
  id: number;
  package_name: string;
  tour_type: string;
  price: string;
  duration_days: string;
  banner_image: string;
  status: string;
}

const columnHelper = createColumnHelper<PaginationTableType>();

function PackageTable() {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedRow, setSelectedRow] = useState<PaginationTableType | null>(null);

  const states = useSelector((state: RootState) => state.location.states) as any;
  const packages = useSelector((state: RootState) => state.package.packages) as any;

  const [searchText, setSearchText] = useState('');

  const [modals, setModals] = useState({
    add: false,
    edit: false,
    view: false,
    delete: false,
  });

  useEffect(() => {
    dispatch(getState());
    dispatch(getPackage());
  }, [dispatch]);

  const handleStatusChange = (id: number, newStatus: 'active' | 'inactive') => {
    dispatch(updatePackageStatus({ id, status: newStatus }))
      .unwrap()
      .then(() => {
        toast.success('Status updated successfully');
        dispatch(getPackage());
      })
      .catch(() => {
        toast.error('Failed to update status');
      });
  };

  const handleDelete = (row) => {
    const id = row?.id;
    dispatch(deletePackage(id));
    toast.success('Package deleted successfully');
  };

  const handleModal = (type: keyof typeof modals, value: boolean, row?: PaginationTableType) => {
    setModals((prev) => ({ ...prev, [type]: value }));
    setSelectedRow(row);
  };

  const filteredData = useMemo(() => {
    if (!searchText) return packages;

    return packages.filter((item: any) =>
      item?.package_name?.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [packages, searchText]);

  const columns = [
    columnHelper.accessor('package_name', {
      cell: (info) => {
        const rowData = info.row.original;
        return (
          <div className="truncate max-w-56">
            <h6 className="text-base">{rowData?.package_name || '-'}</h6>
          </div>
        );
      },
      header: () => <span className="text-base">Package Name</span>,
    }),

    columnHelper.accessor('tour_type', {
      cell: (info) => <p>{info.getValue() || 'No Number'}</p>,
      header: () => <span>Tour Type</span>,
    }),

    columnHelper.accessor('price', {
      cell: (info) => <p>{info.getValue() || 'No Number'}</p>,
      header: () => <span>Base Price</span>,
    }),

    columnHelper.accessor('duration_days', {
      cell: (info) => <p>{info.getValue() + ' Days' || 'No Number'}</p>,
      header: () => <span>Duration Days</span>,
    }),

    columnHelper.accessor('banner_image', {
      cell: (info) => {
        const image = info.getValue();

        return image ? (
          <img
            src={`${imageUrl + 'packages'}/${image}`}
            alt="Banner"
            className="h-12 w-20 object-cover rounded"
          />
        ) : (
          <span>No Image</span>
        );
      },
      header: () => <span>Banner Image</span>,
    }),

    columnHelper.accessor('status', {
      cell: (info) => {
        const status = info.getValue() as 'active' | 'inactive';
        const row = info.row.original;

        const isChecked = status === 'active';

        return (
          <div className="flex gap-3">
            <input
              type="checkbox"
              role="switch"
              checked={isChecked}
              onChange={() => handleStatusChange(row.id, isChecked ? 'inactive' : 'active')}
            />
          </div>
        );
      },
      header: () => <span>Status</span>,
    }),

    columnHelper.accessor('id', {
      cell: (info) => {
        const row = info.row.original;

        return (
          <div className="flex gap-2 notranslate" translate="no">
            <Tooltip content="View">
              <Button
                size="xs"
                color="primary"
                outline
                onClick={() => handleModal('view', true, row)}
              >
                <Icon icon="solar:eye-outline" height={18} />
              </Button>
            </Tooltip>

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
      header: () => <span>Actions</span>,
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
          placeholder="Search package..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="p-2 border rounded-md border-gray-300"
        />

        <Button color="primary" onClick={() => handleModal('add', true)}>
          Create Package
        </Button>
      </div>

      <div className="w-full overflow-x-auto">
        <TableComponent table={table} flexRender={flexRender} columns={columns} />
      </div>

      <PaginationComponent table={table} />
      {modals.add && (
        <CreatePackage
          openModal={modals.add}
          setOpenModal={() => handleModal('add', false)}
          states={states}
        />
      )}
      {modals.view && (
        <ViewPackage
          openModal={modals.view}
          setOpenModal={() => handleModal('view', false)}
          selectedRow={selectedRow}
        />
      )}

      {modals.edit && (
        <EditPackage
          openModal={modals.edit}
          setOpenModal={() => handleModal('edit', false)}
          states={states}
          row={selectedRow}
        />
      )}

      {modals.delete && (
        <ComonDeletemodal
          isOpen={modals.delete}
          setIsOpen={() => handleModal('delete', false)}
          selectedUser={selectedRow}
          title="Are you sure you want to delete this Package?"
          handleConfirmDelete={handleDelete}
        />
      )}
    </>
  );
}

export default PackageTable;
