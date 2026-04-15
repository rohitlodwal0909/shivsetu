import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  createColumnHelper,
} from '@tanstack/react-table';
import { Button, Tooltip } from 'flowbite-react';
import PaginationComponent from 'src/utils/PaginationComponent';
import { useEffect, useState } from 'react';
import TableComponent from 'src/utils/TableComponent';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store';
import { Icon } from '@iconify/react';
import ComonDeletemodal from 'src/utils/deletemodal/ComonDeletemodal';
import { toast } from 'react-toastify';

import { deleteReview, getReview } from 'src/features/homemanagment/ReviewSlice';
import CreateReview from './CreateReview';
import EditReview from './EditReviews';

/* ================= TYPE ================= */
export interface ReviewTableType {
  id: number;
  title: string;
  description: string;
  type: string;
}

const columnHelper = createColumnHelper<ReviewTableType>();

function ReviewTable() {
  const dispatch = useDispatch<AppDispatch>();
  const reviews = useSelector((state: RootState) => state.review.reviews);

  const [selectedRow, setSelectedRow] = useState<ReviewTableType | null>(null);

  const [modals, setModals] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(getReview());
  }, [dispatch]);

  /* ================= DELETE ================= */
  const handleDelete = (row: ReviewTableType) => {
    dispatch(deleteReview(row.id));
    toast.success('Review deleted successfully');
    setModals((prev) => ({ ...prev, delete: false }));
  };

  /* ================= MODAL ================= */
  const handleModal = (type: keyof typeof modals, value: boolean, row?: ReviewTableType) => {
    setModals((prev) => ({ ...prev, [type]: value }));
    if (row) setSelectedRow(row);
  };

  /* ================= TYPE BADGE ================= */
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'shop':
        return 'bg-blue-100 text-blue-600';
      case 'puja':
        return 'bg-purple-100 text-purple-600';
      case 'tour':
        return 'bg-green-100 text-green-600';
      case 'cab':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  /* ================= COLUMNS ================= */
  const columns = [
    // ✅ Title
    columnHelper.accessor('title', {
      header: () => <span>Title</span>,
      cell: (info) => <span className="font-semibold text-gray-800">{info.getValue()}</span>,
    }),

    // ✅ Type
    columnHelper.accessor('type', {
      header: () => <span>Type</span>,
      cell: (info) => (
        <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(info.getValue())}`}>
          {info.getValue()}
        </span>
      ),
    }),

    // ✅ Description
    columnHelper.accessor('description', {
      header: () => <span>Description</span>,
      cell: (info) => {
        const desc = info.getValue();
        return (
          <p className="text-sm text-gray-600 max-w-[250px]">
            {desc?.length > 80 ? desc.substring(0, 80) + '...' : desc}
          </p>
        );
      },
    }),

    // ✅ Actions
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

  /* ================= TABLE ================= */
  const table = useReactTable({
    data: reviews || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm">
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Reviews</h2>

        <Button color="primary" onClick={() => handleModal('add', true)}>
          Add Review
        </Button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <TableComponent table={table} flexRender={flexRender} columns={columns} />
      </div>

      {/* Pagination */}
      <div className="p-4">
        <PaginationComponent table={table} />
      </div>

      {/* Create */}
      {modals.add && (
        <CreateReview openModal={modals.add} setOpenModal={() => handleModal('add', false)} />
      )}

      {/* Edit */}
      {modals.edit && selectedRow && (
        <EditReview
          openModal={modals.edit}
          setOpenModal={() => handleModal('edit', false)}
          row={selectedRow}
        />
      )}

      {/* Delete */}
      {modals.delete && selectedRow && (
        <ComonDeletemodal
          isOpen={modals.delete}
          setIsOpen={() => handleModal('delete', false)}
          selectedUser={selectedRow}
          title="Are you sure you want to delete this review?"
          handleConfirmDelete={() => handleDelete(selectedRow)}
        />
      )}
    </div>
  );
}

export default ReviewTable;
