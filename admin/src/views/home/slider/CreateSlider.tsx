import React, { useState } from 'react';
import { Button, Modal, Label, FileInput } from 'flowbite-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { createSlider } from 'src/features/homemanagment/SliderSlice';

interface CreateSliderProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
}

const CreateSlider: React.FC<CreateSliderProps> = ({ openModal, setOpenModal }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [icon, setIcon] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!icon) {
      setError('Slider image is required');
      return;
    }

    const fd = new FormData();
    fd.append('image', icon);

    try {
      await dispatch(createSlider(fd)).unwrap();
      toast.success('Slider created successfully');
      setOpenModal(false);
      setIcon(null);
      setError('');
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrong');
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size="md">
      <Modal.Header>Add Slider Image</Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload */}
          <div>
            <Label value="Slider Image" />
            <FileInput
              accept="image/*"
              onChange={(e) => {
                setIcon(e.target.files?.[0] || null);
                setError('');
              }}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Upload
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateSlider;
