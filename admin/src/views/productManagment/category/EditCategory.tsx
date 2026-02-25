import React, { useEffect, useState } from 'react';
import { Button, Modal, Label, TextInput, FileInput } from 'flowbite-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { updateCategory } from 'src/features/productmanagment/CategorySlice';
import { imageUrl } from 'src/constants/contant';

interface EditCategoryProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
  row: any; // selected category
}

const EditCategory: React.FC<EditCategoryProps> = ({ openModal, setOpenModal, row }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    icon: File | null;
  }>({
    name: '',
    description: '',
    icon: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewIcon, setPreviewIcon] = useState<string | null>(null);

  /* ---------- PREFILL ---------- */
  useEffect(() => {
    if (row && openModal) {
      setFormData({
        name: row.name || '',
        description: row.description || '',
        icon: null,
      });
      setPreviewIcon(row.icon ? `${imageUrl}categories/${row.icon}` : null);
    }
  }, [row, openModal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrors({ name: 'Category name is required' });
      return;
    }

    const fd = new FormData();
    fd.append('name', formData.name);
    fd.append('description', formData.description);

    if (formData.icon instanceof File) {
      fd.append('icon', formData.icon);
    }

    try {
      await dispatch(
        updateCategory({
          id: row.id,
          data: fd,
        }),
      ).unwrap();
      toast.success('Category updated successfully');
      setOpenModal(false);
    } catch (error: any) {
      toast.error(error?.message || 'Update failed');
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size="xl">
      <Modal.Header>Update Category</Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
          {/* Category Name */}
          <div className="col-span-12 md:col-span-12">
            <Label value="Category Name" />
            <TextInput
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter category name"
              color={errors.name ? 'failure' : 'gray'}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>

          <div className="col-span-12 md:col-span-12">
            <Label value="Description" />
            <TextInput
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Description"
              color={errors.description ? 'failure' : 'gray'}
            />
            {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
          </div>

          {/* Icon */}
          <div className="col-span-12 md:col-span-12">
            <Label value="Category Icon (Optional)" />
            <FileInput
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setFormData((prev) => ({ ...prev, icon: file }));

                if (file) {
                  setPreviewIcon(URL.createObjectURL(file));
                }
              }}
            />
            {previewIcon && (
              <img
                src={previewIcon}
                alt="Category Icon"
                className="h-24 w-24 object-cover rounded border mt-2"
              />
            )}
          </div>

          {/* Actions */}
          <div className="col-span-12 flex justify-end gap-3 mt-4">
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

export default EditCategory;
