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
import { Icon } from '@iconify/react/dist/iconify.js';
import ComonDeletemodal from 'src/utils/deletemodal/ComonDeletemodal';
import { toast } from 'react-toastify';
import CreateCategory from './CreateCategory';
import EditCategory from './EditCategory';
import { deleteCategory, getCategory } from 'src/features/productmanagment/CategorySlice';

export interface PaginationTableType {
  id: number;
  name: string;
  icon: string;
  description: string;
}

const columnHelper = createColumnHelper<PaginationTableType>();

function CategoryTable() {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedRow, setSelectedRow] = useState<PaginationTableType | null>(null);

  const categories = useSelector((state: RootState) => state.category.categories) as any;

  const [searchText, setSearchText] = useState('');

  const [modals, setModals] = useState({
    add: false,
    edit: false,
    view: false,
    delete: false,
  });

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleDelete = (row) => {
    const id = row?.id;
    dispatch(deleteCategory(id));
    toast.success('Category deleted successfully');
  };

  const handleModal = (type: keyof typeof modals, value: boolean, row?: PaginationTableType) => {
    setModals((prev) => ({ ...prev, [type]: value }));
    setSelectedRow(row);
  };

  const filteredData = useMemo(() => {
    if (!searchText) return categories;

    return categories.filter((item: any) =>
      item?.name?.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [categories, searchText]);

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
      header: () => <span className="text-base">Category Name</span>,
    }),
    columnHelper.accessor('description', {
      cell: (info) => {
        const rowData = info.row.original;
        return (
          <div className="truncate max-w-56">
            <h6 className="text-base">{rowData?.description || '-'}</h6>
          </div>
        );
      },
      header: () => <span className="text-base">Description</span>,
    }),

    columnHelper.accessor('icon', {
      cell: (info) => {
        const image = info.getValue();

        return image ? (
          <img
            src={`${imageUrl + 'categories'}/${image}`}
            alt="Banner"
            className="h-12 w-12 object-cover rounded"
          />
        ) : (
          <span>No Image</span>
        );
      },
      header: () => <span>Banner Image</span>,
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
          placeholder="Search category..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="p-2 border rounded-md border-gray-300"
        />

        <Button color="primary" onClick={() => handleModal('add', true)}>
          Create Category
        </Button>
      </div>

      <div className="w-full overflow-x-auto">
        <TableComponent table={table} flexRender={flexRender} columns={columns} />
      </div>

      <PaginationComponent table={table} />
      {modals.add && (
        <CreateCategory openModal={modals.add} setOpenModal={() => handleModal('add', false)} />
      )}

      {modals.edit && (
        <EditCategory
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
          title="Are you sure you want to delete this category?"
          handleConfirmDelete={handleDelete}
        />
      )}
    </>
  );
}

export default CategoryTable;
