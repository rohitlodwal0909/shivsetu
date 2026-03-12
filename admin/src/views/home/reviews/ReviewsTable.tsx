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
  image: string;
}

/* ================= COLUMN HELPER ================= */
const columnHelper = createColumnHelper<ReviewTableType>();

function ReviewTable() {
  const dispatch = useDispatch<AppDispatch>();
  const blogs = useSelector((state: RootState) => state.blog.blogs) as ReviewTableType[];

  const [selectedRow, setSelectedRow] = useState<ReviewTableType | null>(null);

  const [modals, setModals] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    dispatch(getReview());
  }, [dispatch]);

  /* ================= DELETE ================= */
  const handleDelete = (row: ReviewTableType) => {
    dispatch(deleteReview(row.id));
    toast.success('Review deleted successfully');
    setModals({ ...modals, delete: false });
  };

  /* ================= MODAL HANDLER ================= */
  const handleModal = (type: keyof typeof modals, value: boolean, row?: ReviewTableType) => {
    setModals((prev) => ({ ...prev, [type]: value }));
    if (row) setSelectedRow(row);
  };

  /* ================= COLUMNS ================= */
  const columns = [
    columnHelper.accessor('title', {
      header: () => <span>Title</span>,
      cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    }),

    columnHelper.accessor('description', {
      header: () => <span>Description</span>,
      cell: (info) => {
        const desc = info.getValue();
        return (
          <span className="text-sm text-gray-600">
            {desc?.length > 80 ? desc.substring(0, 80) + '...' : desc}
          </span>
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

  /* ================= TABLE INSTANCE ================= */
  const table = useReactTable({
    data: blogs || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      {/* Header */}
      <div className="p-4 flex justify-end">
        <Button color="primary" onClick={() => handleModal('add', true)}>
          Add Review
        </Button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <TableComponent table={table} flexRender={flexRender} columns={columns} />
      </div>

      {/* Pagination */}
      <PaginationComponent table={table} />

      {/* Create Modal */}
      {modals.add && (
        <CreateReview openModal={modals.add} setOpenModal={() => handleModal('add', false)} />
      )}

      {/* Edit Modal */}
      {modals.edit && selectedRow && (
        <EditReview
          openModal={modals.edit}
          setOpenModal={() => handleModal('edit', false)}
          row={selectedRow}
        />
      )}

      {/* Delete Modal */}
      {modals.delete && selectedRow && (
        <ComonDeletemodal
          isOpen={modals.delete}
          setIsOpen={() => handleModal('delete', false)}
          selectedUser={selectedRow}
          title="Are you sure you want to delete this blog?"
          handleConfirmDelete={() => handleDelete(selectedRow)}
        />
      )}
    </>
  );
}

export default ReviewTable;
