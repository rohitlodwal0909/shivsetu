import React, { useEffect, useState } from 'react';
import { Button, Modal, Label, FileInput } from 'flowbite-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { imageUrl } from 'src/constants/contant';
import { updateSlider } from 'src/features/homemanagment/SliderSlice';

interface EditSliderProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
  row: any;
}

const EditSlider: React.FC<EditSliderProps> = ({ openModal, setOpenModal, row }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  /* ---------- PREFILL EXISTING IMAGE ---------- */
  useEffect(() => {
    if (row && openModal) {
      setPreviewImage(row.image ? `${imageUrl}sliders/${row.image}` : null); // ✅ changed
      setImage(null);
      setError('');
    }
  }, [row, openModal]);

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image && !previewImage) {
      setError('Slider image is required');
      return;
    }

    const fd = new FormData();

    if (image instanceof File) {
      fd.append('image', image); // ✅ key match backend
    }

    try {
      await dispatch(
        updateSlider({
          id: row.id,
          data: fd,
        }),
      ).unwrap();

      toast.success('Slider updated successfully'); // ✅ changed text
      setOpenModal(false);
    } catch (error: any) {
      toast.error(error?.message || 'Update failed');
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size="md">
      <Modal.Header>Update Slider Image</Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload */}
          <div>
            <Label value="Slider Image" />
            <FileInput
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setImage(file);
                setError('');

                if (file) {
                  setPreviewImage(URL.createObjectURL(file));
                }
              }}
            />

            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

            {/* Preview */}
            {previewImage && (
              <img
                src={previewImage}
                alt="Slider"
                className="h-28 w-full object-cover rounded border mt-3"
              />
            )}
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

export default EditSlider;
