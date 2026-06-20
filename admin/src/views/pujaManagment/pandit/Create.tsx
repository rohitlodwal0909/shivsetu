import React, { useState } from 'react';
import { Button, Modal, Label, TextInput, FileInput, Textarea } from 'flowbite-react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store';
import { createPandit } from 'src/features/pujamanagment/PanditSlice';

interface CreatePujaProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
}

const Create: React.FC<CreatePujaProps> = ({ openModal, setOpenModal }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.puja);

  const [formData, setFormData] = useState({
    name: '',
    puja_name: '',
    price: '',
    exprience: '',
    language: '',
    description: '',
    image: null as File | null,
  });

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

    fd.append('name', formData.name);
    fd.append('puja_name', formData.puja_name);
    fd.append('price', formData.price);
    fd.append('exprience', formData.exprience);
    fd.append('language', formData.language);
    fd.append('description', formData.description);

    if (formData.image) {
      fd.append('image', formData.image);
    }

    try {
      await dispatch(createPandit(fd)).unwrap();

      toast.success('Pandit created successfully');

      // 🔹 Reset Form
      setFormData({
        name: '',
        puja_name: '',
        price: '',
        exprience: '',
        language: '',
        description: '',
        image: null,
      });

      setOpenModal(false);
    } catch (error: any) {
      toast.error(error || 'Something went wrong');
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size="3xl">
      <Modal.Header>Add Pandit</Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
          {/* Name */}
          <div className="col-span-12 md:col-span-6">
            <Label value="Name" />
            <TextInput
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter pandit name"
              color={errors.name ? 'failure' : 'gray'}
            />
          </div>

          {/* Person */}
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

          <div className="col-span-12 md:col-span-6">
            <Label value="Exprience" />
            <TextInput
              name="exprience"
              value={formData.exprience}
              onChange={handleChange}
              placeholder="Enter exprience"
              color={errors.exprience ? 'failure' : 'gray'}
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
          <div className="col-span-12 md:col-span-6">
            <Label value="Language" />
            <TextInput
              name="language"
              value={formData.language}
              onChange={handleChange}
              placeholder="Enter language"
              color={errors.language ? 'failure' : 'gray'}
            />
          </div>

          <div className="col-span-12 md:col-span-12">
            <Label value="Description" />
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              color={errors.description ? 'failure' : 'gray'}
            />
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

export default Create;
