import React, { useEffect, useState } from 'react';
import { Button, Modal, Label, TextInput, FileInput, Select } from 'flowbite-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { imageUrl } from 'src/constants/contant';
import { updateCab } from 'src/features/tourmanagment/CabSlice';

interface EditCategoryProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
  row: any;
}

const EditCab: React.FC<EditCategoryProps> = ({ openModal, setOpenModal, row }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    name: '',
    seating: '',
    price_per_km: '',
    ac: 'Yes',
    music_system: 'Yes',
    icon: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewIcon, setPreviewIcon] = useState<string | null>(null);

  /* ---------- PREFILL ---------- */
  useEffect(() => {
    if (row && openModal) {
      setFormData({
        name: row.name || '',
        seating: row.seating || '',
        price_per_km: row.price_per_km || '',
        ac: row.ac || 'Yes',
        music_system: row.music_system || 'Yes',
        icon: null,
      });

      setPreviewIcon(row.icon ? `${imageUrl}cabs/${row.icon}` : null);
    }
  }, [row, openModal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  /* ---------- VALIDATION ---------- */
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Cab name is required';
    if (!formData.seating.trim()) newErrors.seating = 'Seating is required';
    if (!formData.price_per_km.trim()) newErrors.price_per_km = 'Rate is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const fd = new FormData();
    fd.append('name', formData.name);
    fd.append('seating', formData.seating);
    fd.append('price_per_km', formData.price_per_km);
    fd.append('ac', formData.ac);
    fd.append('music_system', formData.music_system);

    if (formData.icon instanceof File) {
      fd.append('icon', formData.icon);
    }

    try {
      await dispatch(
        updateCab({
          id: row.id,
          data: fd,
        }),
      ).unwrap();

      toast.success('Cab updated successfully');
      setOpenModal(false);
    } catch (error: any) {
      toast.error(error?.message || 'Update failed');
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size="xl">
      <Modal.Header>Update Cab</Modal.Header>

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
            <Label value="Cab Image (Optional)" />
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
                alt="Cab"
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

export default EditCab;
