import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
} from '@tanstack/react-table';
import PaginationComponent from 'src/utils/PaginationComponent';
import { useEffect, useMemo, useState } from 'react';
import TableComponent from 'src/utils/TableComponent';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store';

import { getOrder } from 'src/features/productmanagment/OrderSlice';

export interface PaginationTableType {
  id: number;
  order_number: string;
  order_items: any[];
  payment_method: string;
  total_amount: number;
  order_status: string;
  payment_status: string;
  shipping_address: any;
  user: {
    name: string;
    email: string;
  };
}

const columnHelper = createColumnHelper<PaginationTableType>();

function OrderTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders } = useSelector((state: RootState) => state.orders) as any;

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  // ✅ Filter
  const filteredData = useMemo(() => {
    if (!searchText) return orders || [];

    return orders.filter((item: any) =>
      item?.order_number?.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [orders, searchText]);

  // ✅ Status Color Helper
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'completed':
      case 'delivered':
        return 'bg-green-100 text-green-600';
      case 'cancelled':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const columns = [
    // ✅ Order ID
    columnHelper.accessor('order_number', {
      header: () => <span>Order ID</span>,
      cell: (info) => <p className="font-semibold text-gray-700">#{info.getValue()}</p>,
    }),

    columnHelper.accessor('user', {
      header: () => <span>User</span>,
      cell: (info) => {
        const user = info.getValue();

        return (
          <div>
            <p className="text-sm font-medium text-gray-800">{user?.name || 'Guest'}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        );
      },
    }),
    // ✅ Products
    columnHelper.accessor('order_items', {
      header: () => <span>Products</span>,
      cell: (info) => {
        const items = info.row.original.order_items;

        return (
          <div className="max-h-24 overflow-y-auto space-y-1 pr-1">
            {items?.length ? (
              items.map((item: any, index: number) => (
                <div key={index} className="border-b last:border-none pb-1">
                  <p className="text-sm font-medium text-gray-800">
                    {item?.Product?.product_name || 'N/A'}
                  </p>
                  <p className="text-xs text-gray-500">
                    Qty: {item?.quantity} • ₹{item?.Product?.price}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No products</p>
            )}
          </div>
        );
      },
    }),

    // ✅ Total
    columnHelper.accessor('total_amount', {
      header: () => <span>Total</span>,
      cell: (info) => <p className="font-semibold text-green-600">₹{info.getValue()}</p>,
    }),

    // ✅ Payment Method
    columnHelper.accessor('payment_method', {
      header: () => <span>Payment</span>,
      cell: (info) => (
        <span className="text-sm text-gray-600 capitalize">{info.getValue() || 'N/A'}</span>
      ),
    }),

    // ✅ Order Status
    columnHelper.accessor('order_status', {
      header: () => <span>Order Status</span>,
      cell: (info) => (
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(info.getValue())}`}>
          {info.getValue()}
        </span>
      ),
    }),

    // ✅ Payment Status
    columnHelper.accessor('payment_status', {
      header: () => <span>Payment Status</span>,
      cell: (info) => (
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(info.getValue())}`}>
          {info.getValue()}
        </span>
      ),
    }),

    // ✅ Address
    columnHelper.accessor('shipping_address', {
      header: () => <span>Address</span>,
      cell: (info) => {
        let address = info.getValue();

        try {
          if (typeof address === 'string') {
            address = JSON.parse(address);
          }
        } catch (e) {}

        return (
          <div className="text-xs text-gray-600 leading-4 max-w-[200px]">
            <p>{address?.address || ''}</p>
            <p>
              {address?.city}, {address?.state}
            </p>
            <p>{address?.zip_code}</p>
          </div>
        );
      },
    }),

    // ✅ Actions
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
    <div className="bg-white rounded-2xl shadow-sm">
      {/* 🔍 Search */}
      <div className="p-4 flex flex-col sm:flex-row justify-between gap-3">
        <input
          type="text"
          placeholder="Search order..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full sm:w-72 p-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* 📊 Table */}
      <div className="w-full overflow-x-auto">
        <TableComponent table={table} flexRender={flexRender} columns={columns} />
      </div>

      {/* 📄 Pagination */}
      <div className="p-4">
        <PaginationComponent table={table} />
      </div>
    </div>
  );
}

export default OrderTable;
