import React, { useEffect, useState } from 'react';
import { Button, Modal, Label, TextInput, Textarea, FileInput } from 'flowbite-react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { getPuja, updatePuja } from 'src/features/pujamanagment/PujaSlice';
import { imageUrl } from 'src/constants/contant';

interface EditPujaProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
  row: any;
  categories: any[];
}

const EditPuja: React.FC<EditPujaProps> = ({ openModal, setOpenModal, row, categories }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);

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

  /* ================= PREFILL ================= */
  useEffect(() => {
    console.log(row?.gallery);
    if (row && openModal) {
      setFormData({
        category_id: row?.category_id || '',
        puja_name: row?.puja_name || '',
        description: row?.description || '',
        price: row?.price || '',
        location: row?.location || '',
        date: row?.date?.split('T')[0] || '',
        puja_duration: row?.puja_duration || '',
        image: null, // new image upload
        gallery: [],
      });
    }
  }, [row, openModal]);

  const selectOptions =
    categories?.map((item: any) => ({
      value: item.id,
      label: item.name,
    })) || [];

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (opt: any) => {
    setFormData((prev: any) => ({
      ...prev,
      category_id: opt?.value || '',
    }));
  };

  const galleryImages = React.useMemo(() => {
    try {
      if (Array.isArray(row?.gallery)) return row.gallery;
      if (typeof row?.gallery === 'string') return JSON.parse(row.gallery);
      return [];
    } catch {
      return [];
    }
  }, [row]);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'gallery' && value !== null) {
        fd.append(key, value as string | Blob);
      }
    });

    formData.gallery.forEach((file: File) => {
      fd.append('gallery', file);
    });

    try {
      setLoading(true);

      await dispatch(
        updatePuja({
          id: row?.id,
          data: fd,
        }),
      ).unwrap();
      dispatch(getPuja());
      toast.success('Puja updated successfully');
      setOpenModal(false);
    } catch (error: any) {
      toast.error(error || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size="4xl">
      <Modal.Header>Update Puja</Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
          {/* Category */}
          <div className="col-span-12 md:col-span-6">
            <Label value="Select Category" />
            <Select
              options={selectOptions}
              value={selectOptions.find((opt) => opt.value === formData.category_id)}
              onChange={handleCategoryChange}
            />
          </div>

          {/* Puja Name */}
          <div className="col-span-12 md:col-span-6">
            <Label value="Puja Name" />
            <TextInput name="puja_name" value={formData.puja_name} onChange={handleChange} />
          </div>

          {/* Location */}
          <div className="col-span-12 md:col-span-6">
            <Label value="Location" />
            <TextInput name="location" value={formData.location} onChange={handleChange} />
          </div>

          {/* Price */}
          <div className="col-span-12 md:col-span-6">
            <Label value="Price" />
            <TextInput name="price" value={formData.price} onChange={handleChange} />
          </div>

          {/* Date */}
          <div className="col-span-12 md:col-span-6">
            <Label value="Date" />
            <TextInput type="date" name="date" value={formData.date} onChange={handleChange} />
          </div>

          {/* Duration */}
          <div className="col-span-12 md:col-span-6">
            <Label value="Puja Duration" />
            <TextInput
              name="puja_duration"
              value={formData.puja_duration}
              onChange={handleChange}
            />
          </div>

          {/* Upload New Image */}
          <div className="col-span-12 md:col-span-6">
            <Label value="Change Image" />
            <FileInput
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setFormData((prev: any) => ({
                  ...prev,
                  image: file,
                }));
              }}
            />
          </div>

          {/* New Gallery Upload */}
          <div className="col-span-12 md:col-span-6">
            <Label value="Add More Gallery Images" />
            <FileInput
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = e.target.files ? Array.from(e.target.files) : [];
                setFormData((prev: any) => ({
                  ...prev,
                  gallery: files,
                }));
              }}
            />
          </div>
          {/* Existing Image Preview */}
          {row?.image && (
            <div className="col-span-12 md:col-span-6">
              <Label value="Current Image" />
              <img
                src={`${imageUrl}/pujas/${row.image}`}
                alt="current"
                className="h-20 w-20 object-cover rounded-md border"
              />
            </div>
          )}
          {/* Existing Gallery */}
          {galleryImages.length > 0 && (
            <div className="col-span-12 md:col-span-6">
              <Label value="Current Gallery" />

              <div className="flex gap-2 flex-wrap">
                {galleryImages.map((img: string, i: number) => (
                  <img
                    key={i}
                    src={`${imageUrl}/pujas/${img}`}
                    alt="gallery"
                    className="h-16 w-16 object-cover rounded border"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="col-span-12">
            <Label value="Description" />
            <Textarea name="description" value={formData.description} onChange={handleChange} />
          </div>

          {/* Buttons */}
          <div className="col-span-12 flex justify-end gap-3 mt-4">
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>

            <Button color="primary" type="submit" isProcessing={loading}>
              Update
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPuja;
