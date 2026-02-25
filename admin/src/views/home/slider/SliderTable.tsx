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

import CreateSlider from './CreateSlider';
import EditSlider from './EditSlider';
import { deleteSlider, getSliders } from 'src/features/homemanagment/SliderSlice';

/* ================= TYPE ================= */
export interface PaginationTableType {
  id: number;
  image: string;
}

/* ================= COLUMN HELPER ================= */
const columnHelper = createColumnHelper<PaginationTableType>();

function SliderTable() {
  const dispatch = useDispatch<AppDispatch>();
  const sliders = useSelector((state: RootState) => state.slider.sliders) as PaginationTableType[];

  const [selectedRow, setSelectedRow] = useState<PaginationTableType | null>(null);

  const [modals, setModals] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    dispatch(getSliders());
  }, [dispatch]);

  /* ================= DELETE ================= */
  const handleDelete = (row: PaginationTableType) => {
    dispatch(deleteSlider(row.id));
    toast.success('Slider deleted successfully');
    setModals({ ...modals, delete: false });
  };

  /* ================= MODAL HANDLER ================= */
  const handleModal = (type: keyof typeof modals, value: boolean, row?: PaginationTableType) => {
    setModals((prev) => ({ ...prev, [type]: value }));
    if (row) setSelectedRow(row);
  };

  /* ================= COLUMNS ================= */
  const columns = [
    columnHelper.accessor('image', {
      header: () => <span>Slider Image</span>,
      cell: (info) => {
        const image = info.getValue();

        return image ? (
          <img
            src={`${imageUrl}sliders/${image}`}
            alt="Slider"
            className="h-24 w-full max-w-xs object-cover rounded-md border"
          />
        ) : (
          <span>No Image</span>
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
    data: sliders || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      {/* Header */}
      <div className="p-4 flex justify-end">
        <Button color="primary" onClick={() => handleModal('add', true)}>
          Add Slider
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
        <CreateSlider openModal={modals.add} setOpenModal={() => handleModal('add', false)} />
      )}

      {/* Edit Modal */}
      {modals.edit && selectedRow && (
        <EditSlider
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
          title="Are you sure you want to delete this slider?"
          handleConfirmDelete={() => handleDelete(selectedRow)}
        />
      )}
    </>
  );
}

export default SliderTable;
