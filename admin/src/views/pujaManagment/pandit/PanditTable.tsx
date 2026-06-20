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
import { imageUrl } from 'src/constants/contant';
import CreatePackage from './Create';
import EditPackage from './Edit';
import { deletePandit, getPandit } from 'src/features/pujamanagment/PanditSlice';

export interface PaginationTableType {
  id: number;
  name: string;
  price: string;
  puja_name: string;
  image: string;
  exprience: string;
  language: string;
}

const columnHelper = createColumnHelper<PaginationTableType>();

function PujaPackageTable() {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedRow, setSelectedRow] = useState<PaginationTableType | null>(null);

  const { pandits } = useSelector((state: RootState) => state.pandit) as any;

  const [searchText, setSearchText] = useState('');

  const [modals, setModals] = useState({
    add: false,
    edit: false,
    view: false,
    package: false,
    delete: false,
  });

  useEffect(() => {
    dispatch(getPandit());
  }, [dispatch]);

  const handleDelete = (row) => {
    const id = row?.id;
    dispatch(deletePandit(id));
    toast.success('Pandit deleted successfully');
  };

  const handleModal = (type: keyof typeof modals, value: boolean, row?: PaginationTableType) => {
    setModals((prev) => ({ ...prev, [type]: value }));
    setSelectedRow(row);
  };

  const filteredData = useMemo(() => {
    if (!searchText) return pandits;

    return pandits.filter((item: any) =>
      item?.name?.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [pandits, searchText]);

  const columns = [
    columnHelper.accessor('name', {
      cell: (info) => {
        const rowData = info.row.original;
        return (
          <div className="truncate max-w-56">
            <h6 className="text-base">{rowData?.name || '-'}</h6>
          </div>
        );
      },
      header: () => <span className="text-base">Pandit Name</span>,
    }),
    columnHelper.accessor('puja_name', {
      cell: (info) => {
        const rowData = info.row.original;
        return <p className="text">{rowData?.puja_name || '-'}</p>;
      },
      header: () => <span className="text-base">Puja Name</span>,
    }),
    columnHelper.accessor('exprience', {
      cell: (info) => {
        const rowData = info.row.original;
        return <p className="text">{rowData?.exprience || '-'} years</p>;
      },
      header: () => <span className="text-base">Exprience</span>,
    }),
    columnHelper.accessor('price', {
      cell: (info) => {
        const rowData = info.row.original;
        return <p className="text">{rowData?.price || '-'}</p>;
      },
      header: () => <span className="text-base">Price</span>,
    }),
    columnHelper.accessor('language', {
      cell: (info) => {
        const rowData = info.row.original;
        return <p className="text">{rowData?.language || '-'}</p>;
      },
      header: () => <span className="text-base">Language</span>,
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
            src={`${imageUrl}/pandit/${image}`}
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
          placeholder="Search Pandit..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="p-2 border rounded-md border-gray-300"
        />

        <Button color="primary" onClick={() => handleModal('add', true)}>
          ✨ Create Pandit
        </Button>
      </div>

      <div className="w-full overflow-x-auto">
        <TableComponent table={table} flexRender={flexRender} columns={columns} />
      </div>

      <PaginationComponent table={table} />
      {modals.add && (
        <CreatePackage openModal={modals.add} setOpenModal={() => handleModal('add', false)} />
      )}

      {modals.edit && (
        <EditPackage
          openModal={modals.edit}
          setOpenModal={() => handleModal('edit', false)}
          row={selectedRow}
        />
      )}

      {modals.delete && (
        <ComonDeletemodal
          isOpen={modals.delete}
          setIsOpen={() => handleModal('delete', false)}
          selectedUser={selectedRow}
          title="Are you sure you want to delete this pandit?"
          handleConfirmDelete={handleDelete}
        />
      )}
    </>
  );
}

export default PujaPackageTable;
