import React, { useState } from 'react';
import { Button, Modal, Label, TextInput, FileInput } from 'flowbite-react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store';
import ReactQuill from 'react-quill-new';
import { createPujaPackage } from 'src/features/pujamanagment/PujaPackageSlice';
import { useParams } from 'react-router';

interface CreatePujaProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
}

const CreatePackage: React.FC<CreatePujaProps> = ({ openModal, setOpenModal }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { loading } = useSelector((state: RootState) => state.puja);

  const [formData, setFormData] = useState({
    slug: id,
    name: '',
    persons: '',
    price: '',
    description: '',
    image: null as File | null,
  });

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const [errors, setErrors] = useState<Record<string, string>>({});

  // 🔹 Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  // 🔹 Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();

    fd.append('slug', formData.slug);
    fd.append('name', formData.name);
    fd.append('persons', formData.persons);
    fd.append('price', formData.price);
    fd.append('description', formData.description);

    if (formData.image) {
      fd.append('image', formData.image);
    }

    try {
      await dispatch(createPujaPackage(fd)).unwrap();

      toast.success('Package created successfully');

      // 🔹 Reset Form
      setFormData({
        slug: id,
        name: '',
        persons: '',
        price: '',
        description: '',
        image: null,
      });

      setOpenModal(false);
    } catch (error: any) {
      toast.error(error || 'Something went wrong');
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size="2xl">
      <Modal.Header>Add Package</Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
          {/* Name */}
          <div className="col-span-12 md:col-span-6">
            <Label value="Name" />
            <TextInput
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              color={errors.name ? 'failure' : 'gray'}
            />
          </div>

          {/* Person */}
          <div className="col-span-12 md:col-span-6">
            <Label value="Person" />
            <TextInput
              name="persons"
              value={formData.persons}
              onChange={handleChange}
              placeholder="Enter person"
              color={errors.person ? 'failure' : 'gray'}
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

          {/* Image */}
          <div className="col-span-12 md:col-span-6">
            <Label value="Image" />
            <FileInput
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setFormData({ ...formData, image: file });
              }}
            />
          </div>

          {/* Description */}
          <div className="col-span-12">
            <Label value="Description" />
            <div className="bg-white">
              <ReactQuill
                theme="snow"
                value={formData.description}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    description: value,
                  })
                }
                modules={modules}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="col-span-12 flex justify-end gap-3 mt-4">
            <Button color="gray" onClick={() => setOpenModal(false)}>
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

export default CreatePackage;
