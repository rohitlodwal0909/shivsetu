import React, { useState, useEffect } from 'react';
import { Button, Modal, Label, TextInput, Textarea } from 'flowbite-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { createCategory } from 'src/features/pujamanagment/PujaCategorySlice';

interface CreateCategoryProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
}

interface CategoryForm {
  name: string;
  description: string;
}

const CreateCategory: React.FC<CreateCategoryProps> = ({ openModal, setOpenModal }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<CategoryForm>({
    name: '',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Reset form when modal closes
  useEffect(() => {
    if (!openModal) {
      setFormData({ name: '', description: '' });
      setErrors({});
    }
  }, [openModal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Category name is required';

    if (!formData.description.trim()) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await dispatch(createCategory(formData)).unwrap();
      toast.success('Category created successfully');
      setOpenModal(false);
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size="xl">
      <Modal.Header>Create Category</Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
          {/* Category Name */}
          <div className="col-span-12">
            <Label value="Category Name" />
            <TextInput
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter category name"
              color={errors.name ? 'failure' : 'gray'}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Description */}
          <div className="col-span-12">
            <Label value="Description" />
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              rows={4}
              color={errors.description ? 'failure' : 'gray'}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* Actions */}
          <div className="col-span-12 flex justify-end gap-3 mt-4">
            <Button color="gray" type="button" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button color="primary" type="submit" isProcessing={loading}>
              Submit
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateCategory;
