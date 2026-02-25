import React, { useEffect, useState } from 'react';
import { Button, Modal, Label, TextInput } from 'flowbite-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { updateMarquee } from 'src/features/homemanagment/MarqueeSlice';

interface EditMarqueeProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
  row: any;
}

const EditMarquee: React.FC<EditMarqueeProps> = ({ openModal, setOpenModal, row }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [marqueeText, setMarqueeText] = useState<string>('');
  const [error, setError] = useState<string>('');

  /* ---------- PREFILL EXISTING TEXT ---------- */
  useEffect(() => {
    if (row && openModal) {
      setMarqueeText(row?.text || ''); // 🔥 backend key check kare
      setError('');
    }
  }, [row, openModal]);

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!marqueeText.trim()) {
      setError('Marquee text is required');
      return;
    }

    try {
      await dispatch(
        updateMarquee({
          id: row.id,
          data: { text: marqueeText }, // 🔥 backend field name confirm kare
        }),
      ).unwrap();

      toast.success('Marquee updated successfully');
      setOpenModal(false);
    } catch (error: any) {
      toast.error(error?.message || 'Update failed');
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size="2xl">
      <Modal.Header>Update Marquee Text</Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label value="Marquee Text" />
            <TextInput
              value={marqueeText}
              onChange={(e) => {
                setMarqueeText(e.target.value);
                setError('');
              }}
              placeholder="Enter marquee text"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

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

export default EditMarquee;
