import React, { useState } from 'react';
import { Button, Modal, Label, FileInput, TextInput, Textarea } from 'flowbite-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { createBlog } from 'src/features/homemanagment/BlogSlice';

interface CreateBlogProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
}

const CreateBlog: React.FC<CreateBlogProps> = ({ openModal, setOpenModal }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !image) {
      setError('All fields are required');
      return;
    }

    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('image', image);

    try {
      await dispatch(createBlog(fd)).unwrap();
      toast.success('Blog created successfully');

      setOpenModal(false);
      setTitle('');
      setDescription('');
      setImage(null);
      setError('');
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrong');
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size="xl">
      <Modal.Header>Add Blog</Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <Label value="Blog Title" />
            <TextInput
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError('');
              }}
              placeholder="Enter blog title"
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
              placeholder="Enter blog description"
            />
          </div>

          {/* Image Upload */}
          <div>
            <Label value="Blog Image" />
            <FileInput
              accept="image/*"
              onChange={(e) => {
                setImage(e.target.files?.[0] || null);
                setError('');
              }}
            />
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}

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

export default CreateBlog;
