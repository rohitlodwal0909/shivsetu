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
import { imageUrl } from 'src/constants/contant';
import { Icon } from '@iconify/react';
import ComonDeletemodal from 'src/utils/deletemodal/ComonDeletemodal';
import { toast } from 'react-toastify';

import CreateBlog from './CreateBlog';
import EditBlog from './EditBlog';
import { deleteBlog, getBlogs } from 'src/features/homemanagment/BlogSlice';

/* ================= TYPE ================= */
export interface BlogTableType {
  id: number;
  title: string;
  description: string;
  image: string;
}

/* ================= COLUMN HELPER ================= */
const columnHelper = createColumnHelper<BlogTableType>();

function BlogTable() {
  const dispatch = useDispatch<AppDispatch>();
  const blogs = useSelector((state: RootState) => state.blog.blogs) as BlogTableType[];

  const [selectedRow, setSelectedRow] = useState<BlogTableType | null>(null);

  const [modals, setModals] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  /* ================= DELETE ================= */
  const handleDelete = (row: BlogTableType) => {
    dispatch(deleteBlog(row.id));
    toast.success('Blog deleted successfully');
    setModals({ ...modals, delete: false });
  };

  /* ================= MODAL HANDLER ================= */
  const handleModal = (type: keyof typeof modals, value: boolean, row?: BlogTableType) => {
    setModals((prev) => ({ ...prev, [type]: value }));
    if (row) setSelectedRow(row);
  };

  /* ================= COLUMNS ================= */
  const columns = [
    columnHelper.accessor('image', {
      header: () => <span>Image</span>,
      cell: (info) => {
        const image = info.getValue();

        return image ? (
          <img
            src={`${imageUrl}blogs/${image}`}
            alt="Blog"
            className="h-20 w-28 object-cover rounded-md border"
          />
        ) : (
          <span>No Image</span>
        );
      },
    }),

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
          Add Blog
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
        <CreateBlog openModal={modals.add} setOpenModal={() => handleModal('add', false)} />
      )}

      {/* Edit Modal */}
      {modals.edit && selectedRow && (
        <EditBlog
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

export default BlogTable;
