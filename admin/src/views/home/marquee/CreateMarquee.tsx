import React, { useState } from 'react';
import { Button, Modal, Label, TextInput } from 'flowbite-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { createMarquee } from 'src/features/homemanagment/MarqueeSlice';

interface CreateMarqueeProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
}

const CreateMarquee: React.FC<CreateMarqueeProps> = ({ openModal, setOpenModal }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [text, setText] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      setError('Marquee text is required');
      return;
    }

    try {
      await dispatch(createMarquee({ text })).unwrap();
      toast.success('Marquee created successfully');
      setOpenModal(false);
      setText('');
      setError('');
    } catch (error: any) {
      toast.error(error || 'Something went wrong');
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size="2xl">
      <Modal.Header>Add Marquee</Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Marquee Text Input */}
          <div>
            <Label value="Marquee Text" />
            <TextInput
              placeholder="Enter marquee text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
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
              Save
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateMarquee;
