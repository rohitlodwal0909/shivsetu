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

import { getCategory } from 'src/features/productmanagment/CategorySlice';
import { deleteProduct, getProduct } from 'src/features/productmanagment/ProductSlice';

export interface PaginationTableType {
  id: number;
  category: {
    id: number;
    name: string;
  };
  product_name: string;
  stock_quantity: string;
  price: string;
  image: string;
  status: string;
}

const columnHelper = createColumnHelper<PaginationTableType>();

function OrderTable() {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedRow, setSelectedRow] = useState<PaginationTableType | null>(null);

  const products = useSelector((state: RootState) => state.product.products) as any;

  const [searchText, setSearchText] = useState('');

  const [modals, setModals] = useState({
    add: false,
    edit: false,
    view: false,
    delete: false,
  });

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getProduct());
  }, [dispatch]);

  const handleDelete = (row) => {
    const id = row?.id;
    dispatch(deleteProduct(id));
    toast.success('Product deleted successfully');
  };

  const handleModal = (type: keyof typeof modals, value: boolean, row?: PaginationTableType) => {
    setModals((prev) => ({ ...prev, [type]: value }));
    setSelectedRow(row);
  };

  const filteredData = useMemo(() => {
    if (!searchText) return products;

    return products.filter((item: any) =>
      item?.product_name?.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [products, searchText]);

  const columns = [
    columnHelper.accessor((row) => row?.category?.name ?? '-', {
      id: 'category_id',
      header: () => <span className="text-base">Order ID</span>,
      cell: (info) => (
        <div className="truncate max-w-56">
          <h6 className="text-base">{info.getValue()}</h6>
        </div>
      ),
    }),

    columnHelper.accessor('product_name', {
      cell: (info) => <p>{info.getValue() || 'No Number'}</p>,
      header: () => <span>Product Name</span>,
    }),

    columnHelper.accessor('price', {
      cell: (info) => <p>{info.getValue() || 'No Number'}</p>,
      header: () => <span>Total Amount</span>,
    }),

    columnHelper.accessor('stock_quantity', {
      cell: (info) => <p>{info.getValue() || 'No Number'}</p>,
      header: () => <span>Qty</span>,
    }),
    columnHelper.accessor('stock_quantity', {
      cell: (info) => <p>{info.getValue() || 'No Number'}</p>,
      header: () => <span>Status</span>,
    }),
    columnHelper.accessor('stock_quantity', {
      cell: (info) => <p>{info.getValue() || 'No Number'}</p>,
      header: () => <span>Order Status</span>,
    }),
    columnHelper.accessor('stock_quantity', {
      cell: (info) => <p>{info.getValue() || 'No Number'}</p>,
      header: () => <span>Address</span>,
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
          placeholder="Search order..."
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
          title="Are you sure you want to delete this Product?"
          handleConfirmDelete={handleDelete}
        />
      )}
    </>
  );
}

export default OrderTable;
