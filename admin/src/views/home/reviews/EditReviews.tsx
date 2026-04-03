import React, { useEffect, useState } from 'react';
import { Button, Modal, Label, TextInput, Textarea } from 'flowbite-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { updateReview } from 'src/features/homemanagment/ReviewSlice';

interface EditReviewProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
  row: any;
}

const EditReview: React.FC<EditReviewProps> = ({ openModal, setOpenModal, row }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  /* ---------- PREFILL EXISTING DATA ---------- */
  useEffect(() => {
    if (row && openModal) {
      setTitle(row.title || '');
      setDescription(row.description || '');
    }
  }, [row, openModal]);

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      return;
    }

    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);

    try {
      await dispatch(
        updateReview({
          id: row.id,
          data: fd,
        }),
      ).unwrap();

      toast.success('Review updated successfully');
      setOpenModal(false);
    } catch (error: any) {
      toast.error(error?.message || 'Update failed');
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size="xl">
      <Modal.Header>Update Review</Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <Label value="Review Title" />
            <TextInput
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>

          {/* Description */}
          <div>
            <Label value="Description" />
            <Textarea
              rows={4}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Update
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditReview;
