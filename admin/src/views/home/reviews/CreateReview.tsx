import React, { useState } from 'react';
import { Button, Modal, Label, TextInput, Textarea } from 'flowbite-react';
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

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError('All fields are required');
      return;
    }

    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);

    try {
      await dispatch(createReview(fd)).unwrap();
      toast.success('Review created successfully');

      setOpenModal(false);
      setTitle('');
      setDescription('');
      setError('');
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrong');
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size="xl">
      <Modal.Header>Add Review</Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <Label value="Review Title" />
            <TextInput
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError('');
              }}
              placeholder="Enter reviews title"
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
                setError('');
              }}
              placeholder="Enter review description"
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
