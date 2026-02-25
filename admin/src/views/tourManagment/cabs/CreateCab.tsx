import React, { useState } from 'react';
import { Button, Modal, Label, TextInput, FileInput, Select } from 'flowbite-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { createCab } from 'src/features/tourmanagment/CabSlice';

interface CreateCategoryProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
}

interface CategoryForm {
  name: string;
  seating: string;
  price_per_km: string;
  ac: string;
  music_system: string;
  icon: File | null;
}

const CreateCab: React.FC<CreateCategoryProps> = ({ openModal, setOpenModal }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<CategoryForm>({
    name: '',
    seating: '',
    price_per_km: '',
    ac: 'Yes',
    music_system: 'Yes',
    icon: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Cab name is required';
    if (!formData.seating.trim()) newErrors.seating = 'Seating is required';
    if (!formData.price_per_km.trim()) newErrors.price_per_km = 'Rate is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const fd = new FormData();
    fd.append('name', formData.name);
    fd.append('seating', formData.seating);
    fd.append('price_per_km', formData.price_per_km);
    fd.append('ac', formData.ac);
    fd.append('music_system', formData.music_system);

    if (formData.icon) {
      fd.append('icon', formData.icon);
    }

    try {
      await dispatch(createCab(fd)).unwrap();
      toast.success('Cab created successfully');
      setOpenModal(false);
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrong');
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size="xl">
      <Modal.Header>Create Cab</Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
          {/* Cab Name */}
          <div className="col-span-12">
            <Label value="Cab Name" />
            <TextInput
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Toyota Innova Crysta"
              color={errors.name ? 'failure' : 'gray'}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>

          {/* Seating */}
          <div className="col-span-6">
            <Label value="Seating Capacity" />
            <TextInput
              name="seating"
              value={formData.seating}
              onChange={handleChange}
              placeholder="6+1"
              color={errors.seating ? 'failure' : 'gray'}
            />
            {errors.seating && <p className="text-red-500 text-xs">{errors.seating}</p>}
          </div>

          {/* Rate */}
          <div className="col-span-6">
            <Label value="Price Per KM" />
            <TextInput
              name="price_per_km"
              type="number"
              value={formData.price_per_km}
              onChange={handleChange}
              placeholder="20"
              color={errors.price_per_km ? 'failure' : 'gray'}
            />
            {errors.price_per_km && <p className="text-red-500 text-xs">{errors.price_per_km}</p>}
          </div>

          {/* AC */}
          <div className="col-span-6">
            <Label value="AC Available" />
            <Select name="ac" value={formData.ac} onChange={handleChange}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>

          {/* Music System */}
          <div className="col-span-6">
            <Label value="Music System" />
            <Select name="music_system" value={formData.music_system} onChange={handleChange}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>

          {/* Image */}
          <div className="col-span-12">
            <Label value="Cab Image" />
            <FileInput
              accept="image/*"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  icon: e.target.files?.[0] || null,
                }))
              }
            />
          </div>

          {/* Actions */}
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

export default CreateCab;
