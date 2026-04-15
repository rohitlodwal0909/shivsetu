import React, { useState } from 'react';
import { Button, Modal, Label, TextInput, Textarea, Select } from 'flowbite-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { createReview } from 'src/features/homemanagment/ReviewSlice';

interface CreateReviewProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
}

const CreateReview: React.FC<CreateReviewProps> = ({ openModal, setOpenModal }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!type || !title || !description) {
      toast.error('All fields are required');
      return;
    }

    try {
      await dispatch(createReview({ type, title, description })).unwrap();
      toast.success('Review created successfully');

      setOpenModal(false);
      setType('');
      setTitle('');
      setDescription('');
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrong');
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size="xl">
      <Modal.Header>Add Review</Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ✅ Type */}
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
            <TextInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter review title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label value="Description" />
            <Textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter review description"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Create
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateReview;
