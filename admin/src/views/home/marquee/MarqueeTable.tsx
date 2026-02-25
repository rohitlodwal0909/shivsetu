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

import CreateMarquee from './CreateMarquee';
import EditMarquee from './EditMarquee';
import { deleteMarquee, getMarquees } from 'src/features/homemanagment/MarqueeSlice';

/* ================= TYPE ================= */
export interface MarqueeTableType {
  id: number;
  text: string;
}

/* ================= COLUMN HELPER ================= */
const columnHelper = createColumnHelper<MarqueeTableType>();

function MarqueeTable() {
  const dispatch = useDispatch<AppDispatch>();

  const marquees = useSelector((state: RootState) => state.marquee.marquees) as MarqueeTableType[];

  const [selectedRow, setSelectedRow] = useState<MarqueeTableType | null>(null);

  const [modals, setModals] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    dispatch(getMarquees());
  }, [dispatch]);

  /* ================= DELETE ================= */
  const handleDelete = (row: MarqueeTableType) => {
    dispatch(deleteMarquee(row.id));
    toast.success('Marquee deleted successfully');
    setModals((prev) => ({ ...prev, delete: false }));
  };

  /* ================= MODAL HANDLER ================= */
  const handleModal = (type: keyof typeof modals, value: boolean, row?: MarqueeTableType) => {
    setModals((prev) => ({ ...prev, [type]: value }));
    if (row) setSelectedRow(row);
  };

  /* ================= COLUMNS ================= */
  const columns = [
    columnHelper.accessor('text', {
      header: () => <span>Marquee Text</span>,
      cell: (info) => <span className="font-medium text-gray-700">{info.getValue()}</span>,
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
    data: marquees || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      {/* Header */}
      <div className="p-4 flex justify-end">
        <Button color="primary" onClick={() => handleModal('add', true)}>
          Add Marquee
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
        <CreateMarquee openModal={modals.add} setOpenModal={() => handleModal('add', false)} />
      )}

      {/* Edit Modal */}
      {modals.edit && selectedRow && (
        <EditMarquee
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
          title="Are you sure you want to delete this marquee?"
          handleConfirmDelete={() => handleDelete(selectedRow)}
        />
      )}
    </>
  );
}

export default MarqueeTable;
