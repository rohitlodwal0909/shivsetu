import React, { useEffect, useState } from 'react';
import { Button, Modal, Label, FileInput, TextInput, Textarea } from 'flowbite-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { imageUrl } from 'src/constants/contant';
import { updateBlog } from 'src/features/homemanagment/BlogSlice';

interface EditBlogProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
  row: any;
}

const EditBlog: React.FC<EditBlogProps> = ({ openModal, setOpenModal, row }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState('');

  /* ---------- PREFILL EXISTING DATA ---------- */
  useEffect(() => {
    if (row && openModal) {
      setTitle(row.title || '');
      setDescription(row.description || '');
      setPreviewImage(row.image ? `${imageUrl}blogs/${row.image}` : null);
      setImage(null);
      setError('');
    }
  }, [row, openModal]);

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError('Title and description are required');
      return;
    }

    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);

    if (image instanceof File) {
      fd.append('image', image);
    }

    try {
      await dispatch(
        updateBlog({
          id: row.id,
          data: fd,
        }),
      ).unwrap();

      toast.success('Blog updated successfully');
      setOpenModal(false);
    } catch (error: any) {
      toast.error(error?.message || 'Update failed');
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size="xl">
      <Modal.Header>Update Blog</Modal.Header>

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
            />
          </div>

          {/* Image Upload */}
          <div>
            <Label value="Blog Image" />
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

            {/* Preview */}
            {previewImage && (
              <img
                src={previewImage}
                alt="Blog"
                className="h-28 w-full object-cover rounded border mt-3"
              />
            )}
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}

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

export default EditBlog;
