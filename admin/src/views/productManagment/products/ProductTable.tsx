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
import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';
import { getCategory } from 'src/features/productmanagment/CategorySlice';
import {
  deleteProduct,
  getProduct,
  updateProductStatus,
} from 'src/features/productmanagment/ProductSlice';
import ViewProduct from './ViewProduct';

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

function ProductTable() {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedRow, setSelectedRow] = useState<PaginationTableType | null>(null);

  const categories = useSelector((state: RootState) => state.category.categories) as any;
  const products = useSelector((state: RootState) => state.product.products) as any;

  const [searchText, setSearchText] = useState('');
  const [openModal, setOpenModal] = useState(false);

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

  const handleStatusChange = (id: number, newStatus: 'active' | 'inactive') => {
    dispatch(updateProductStatus({ id, status: newStatus }))
      .unwrap()
      .then(() => {
        toast.success('Status updated successfully');
        dispatch(getProduct());
      })
      .catch(() => {
        toast.error('Failed to update status');
      });
  };

  const handleDelete = (row) => {
    const id = row?.id;
    dispatch(deleteProduct(id));
    toast.success('Product deleted successfully');
  };

  const handleModal = (type: keyof typeof modals, value: boolean, row?: PaginationTableType) => {
    setOpenModal(value);
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
      header: () => <span className="text-base">Category Name</span>,
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
      header: () => <span>Price</span>,
    }),

    columnHelper.accessor('stock_quantity', {
      cell: (info) => <p>{info.getValue() || 'No Number'}</p>,
      header: () => <span>Stock (Qty)</span>,
    }),

    columnHelper.accessor('image', {
      cell: (info) => {
        const image = info.getValue();

        return image ? (
          <img
            src={`${imageUrl + 'products'}/${image}`}
            alt="Banner"
            className="h-12 w-15 object-cover rounded"
          />
        ) : (
          <span>No Image</span>
        );
      },
      header: () => <span>Image</span>,
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
          placeholder="Search product..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="p-2 border rounded-md border-gray-300"
        />

        <Button color="primary" onClick={() => handleModal('add', true)}>
          Create Product
        </Button>
      </div>

      <div className="w-full overflow-x-auto">
        <TableComponent table={table} flexRender={flexRender} columns={columns} />
      </div>

      <PaginationComponent table={table} />
      {openModal && modals.add && (
        <CreateProduct
          openModal={modals.add}
          categories={categories}
          setOpenModal={() => handleModal('add', false)}
        />
      )}
      {modals.view && (
        <ViewProduct
          openModal={modals.view}
          setOpenModal={() => handleModal('view', false)}
          selectedRow={selectedRow}
        />
      )}

      {openModal && modals.edit && (
        <EditProduct
          openModal={modals.edit}
          setOpenModal={() => handleModal('edit', false)}
          categories={categories}
          row={selectedRow}
        />
      )}

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

export default ProductTable;
