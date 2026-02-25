import React, { useState } from 'react';
import { Button, Modal, Label, TextInput, Textarea, FileInput } from 'flowbite-react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { validateForm } from 'src/utils/formValidator';
import { createPujaSchema } from './PujaValidation';
import 'react-quill-new/dist/quill.snow.css';
import { createPuja } from 'src/features/pujamanagment/PujaSlice';

interface CreatePackageProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
  categories: [];
}

const CreatePuja: React.FC<CreatePackageProps> = ({ openModal, setOpenModal, categories }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<any>({
    category_id: '',
    puja_name: '',
    description: '',
    price: '',
    location: '',
    date: '',
    puja_duration: '',
    image: null,
    gallery: [],
  });

  const [errors, setErrors] = useState<any>({});

  // 🔹 Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  // 🔹 Category Change
  const handleCategoryChange = (opt: any) => {
    setFormData({
      ...formData,
      category_id: opt?.value || '',
    });
    setErrors({ ...errors, category_id: '' });
  };

  const selectOptions =
    categories?.map((item: any) => ({
      value: item.id,
      label: item.name,
    })) || [];

  // 🔹 Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData, createPujaSchema);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const fd = new FormData();

    // Normal fields append
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'gallery' && value !== null) {
        fd.append(key, value as string | Blob);
      }
    });

    // Gallery append
    if (formData.gallery.length > 0) {
      formData.gallery.forEach((file: File) => {
        fd.append('gallery', file);
      });
    }

    try {
      await dispatch(createPuja(fd)).unwrap(); // ✅ unwrap for proper error handling

      toast.success('Puja created successfully');
      setOpenModal(false);
    } catch (error: any) {
      toast.error(error || 'Something went wrong');
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size="4xl">
      <Modal.Header>Create Puja</Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
          {/* Category */}
          <div className="col-span-12 md:col-span-6">
            <Label value="Select Category" />
            <Select options={selectOptions} onChange={handleCategoryChange} />
            {errors.category_id && (
              <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>
            )}
          </div>

          {/* Puja Name */}
          <div className="col-span-12 md:col-span-6">
            <Label value="Puja Name" />
            <TextInput
              name="puja_name"
              value={formData.puja_name}
              onChange={handleChange}
              placeholder="Enter puja name"
              color={errors.puja_name ? 'failure' : 'gray'}
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <Label value="Location" />
            <TextInput
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              color={errors.location ? 'failure' : 'gray'}
            />
          </div>

          {/* Price */}
          <div className="col-span-12 md:col-span-6">
            <Label value="Price" />
            <TextInput
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              color={errors.price ? 'failure' : 'gray'}
            />
          </div>

          {/* Date */}
          <div className="col-span-12 md:col-span-6">
            <Label value="Puja date" />
            <TextInput
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              color={errors.date ? 'failure' : 'gray'}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <Label value="Puja Duration" />
            <TextInput
              name="puja_duration"
              value={formData.puja_duration}
              onChange={handleChange}
              placeholder="Enter Duration"
              color={errors.puja_duration ? 'failure' : 'gray'}
            />
          </div>

          {/* Banner Image */}
          <div className="col-span-12 md:col-span-6">
            <Label value="Image" />
            <FileInput
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setFormData({
                  ...formData,
                  image: file,
                });
              }}
            />
          </div>

          {/* Gallery */}
          <div className="col-span-12 md:col-span-6">
            <Label value="Gallery Images" />
            <FileInput
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = e.target.files ? Array.from(e.target.files) : [];
                setFormData({
                  ...formData,
                  gallery: files,
                });
              }}
            />
          </div>
          {/* Short Description */}
          <div className="col-span-12 md:col-span-12">
            <Label value="Description" />
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter  description"
              color={errors.description ? 'failure' : 'gray'}
            />
          </div>

          {/* Buttons */}
          <div className="col-span-12 flex justify-end gap-3 mt-4">
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreatePuja;
