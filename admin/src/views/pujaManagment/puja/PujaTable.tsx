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
import CreatePuja from './CreatePuja';
import EditPuja from './EditPuja';
import { deletePuja, getPuja } from 'src/features/pujamanagment/PujaSlice';
import { imageUrl } from 'src/constants/contant';
import { getCategory } from 'src/features/pujamanagment/PujaCategorySlice';
import { Link } from 'react-router';

export interface PaginationTableType {
  id: number;
  slug: string;
  puja_name: string;
  price: string;
  location: string;
  date: string;
  image: string;
  puja_category: {
    name: string;
  };
  description: string;
}

const columnHelper = createColumnHelper<PaginationTableType>();

function PujaTable() {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedRow, setSelectedRow] = useState<PaginationTableType | null>(null);

  const pujas = useSelector((state: RootState) => state.puja.pujas) as any;
  const category = useSelector((state: RootState) => state.pujaCategory.categories) as any;

  const [searchText, setSearchText] = useState('');

  const [modals, setModals] = useState({
    add: false,
    edit: false,
    view: false,
    delete: false,
  });

  useEffect(() => {
    dispatch(getPuja());
    dispatch(getCategory());
  }, [dispatch]);

  const handleDelete = async (row: PaginationTableType) => {
    try {
      const id = row?.id;
      await dispatch(deletePuja(id)).unwrap();
      toast.success('Puja deleted successfully');
      handleModal('delete', false);
    } catch (error) {
      toast.error('Failed to delete puja');
    }
  };

  const handleModal = (type: keyof typeof modals, value: boolean, row?: PaginationTableType) => {
    setModals((prev) => ({ ...prev, [type]: value }));
    setSelectedRow(row);
  };

  const filteredData = useMemo(() => {
    if (!searchText) return pujas;

    return pujas.filter(
      (item: PaginationTableType) =>
        item?.puja_name?.toLowerCase().includes(searchText.toLowerCase()) ||
        item?.location?.toLowerCase().includes(searchText.toLowerCase()) ||
        item?.puja_category?.name?.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [pujas, searchText]);

  const columns = [
    columnHelper.accessor('puja_category', {
      cell: (info) => {
        const rowData = info.row.original;
        return (
          <div className="truncate max-w-56">
            <h6 className="text-base">{rowData?.puja_category?.name || '-'}</h6>
          </div>
        );
      },
      header: () => <span className="text-base">Category Name</span>,
    }),
    columnHelper.accessor('puja_name', {
      cell: (info) => {
        const rowData = info.row.original;
        return <p className="text">{rowData?.puja_name || '-'}</p>;
      },
      header: () => <span className="text-base">Puja Name</span>,
    }),
    columnHelper.accessor('price', {
      cell: (info) => {
        const rowData = info.row.original;
        return <p className="text">{rowData?.price || '-'}</p>;
      },
      header: () => <span className="text-base">Price</span>,
    }),
    columnHelper.accessor('location', {
      cell: (info) => {
        const rowData = info.row.original;
        return <p className="text">{rowData?.location || '-'}</p>;
      },
      header: () => <span className="text-base">Location</span>,
    }),
    columnHelper.accessor('date', {
      cell: (info) => {
        const rowData = info.row.original;
        return <p className="text">{rowData?.date || '-'}</p>;
      },
      header: () => <span className="text-base">Date</span>,
    }),
    columnHelper.accessor('image', {
      header: () => <span className="text-base">Image</span>,
      cell: (info) => {
        const image = info.getValue();

        if (!image) {
          return <span>-</span>;
        }

        return (
          <img
            src={`${imageUrl}/pujas/${image}`}
            alt="puja"
            className="h-12 w-12 object-cover rounded-md border"
          />
        );
      },
    }),

    columnHelper.accessor('id', {
      cell: (info) => {
        const row = info.row.original;

        return (
          <div className="flex gap-2 notranslate" translate="no">
            <Tooltip content="Package">
              <Link to={`/puja-management/package/${row?.slug}`} color="success">
                <Button size="xs" color="primary">
                  <Icon icon="solar:eye-outline" height={18} />
                </Button>
              </Link>
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
          placeholder="Search puja..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="p-2 border rounded-md border-gray-300"
        />

        <Button color="primary" onClick={() => handleModal('add', true)}>
          ✨ Create Puja
        </Button>
      </div>

      <div className="w-full overflow-x-auto">
        <TableComponent table={table} flexRender={flexRender} columns={columns} />
      </div>

      <PaginationComponent table={table} />
      {modals.add && (
        <CreatePuja
          openModal={modals.add}
          setOpenModal={() => handleModal('add', false)}
          categories={category}
        />
      )}

      {modals.edit && (
        <EditPuja
          openModal={modals.edit}
          setOpenModal={() => handleModal('edit', false)}
          row={selectedRow}
          categories={category}
        />
      )}

      {modals.delete && (
        <ComonDeletemodal
          isOpen={modals.delete}
          setIsOpen={() => handleModal('delete', false)}
          selectedUser={selectedRow}
          title="Are you sure you want to delete this puja?"
          handleConfirmDelete={handleDelete}
        />
      )}
    </>
  );
}

export default PujaTable;
