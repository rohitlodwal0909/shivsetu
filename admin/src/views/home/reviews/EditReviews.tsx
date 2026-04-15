import React, { useEffect, useState } from 'react';
import { Button, Modal, Label, TextInput, Textarea, Select } from 'flowbite-react';
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
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (row && openModal) {
      setTitle(row.title || '');
      setDescription(row.description || '');
      setType(row.type || '');
    }
  }, [row, openModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!type || !title.trim() || !description.trim()) {
      toast.error('All fields are required');
      return;
    }

    try {
      await dispatch(
        updateReview({
          id: row.id,
          data: {
            type,
            title,
            description,
          },
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
          {/* Type */}
          <div>
            <Label value="Review Type" />
            <Select value={type} onChange={(e) => setType(e.target.value)} required>
              <option value="">Select Type</option>
              <option value="shop">Shop</option>
              <option value="puja">Puja</option>
              <option value="tour">Tours</option>
              <option value="cab">Cab</option>
            </Select>
          </div>

          {/* Title */}
          <div>
            <Label value="Review Title" />
            <TextInput value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          {/* Description */}
          <div>
            <Label value="Description" />
            <Textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
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
