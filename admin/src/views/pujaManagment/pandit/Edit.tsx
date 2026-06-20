import React, { useEffect, useState } from 'react';
import { Button, Modal, Label, TextInput, FileInput, Textarea } from 'flowbite-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { updatePandit, getPandit } from 'src/features/pujamanagment/PanditSlice';
import { imageUrl } from 'src/constants/contant';

interface EditPanditProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
  row: any;
}

const EditPandit: React.FC<EditPanditProps> = ({ openModal, setOpenModal, row }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<any>({
    name: '',
    puja_name: '',
    price: '',
    exprience: '',
    language: '',
    description: '',
    image: null,
  });

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (row && openModal) {
      setFormData({
        name: row?.name || '',
        puja_name: row?.puja_name || '',
        price: row?.price || '',
        exprience: row?.exprience || '',
        language: row?.language || '',
        description: row?.description || '',
        image: null,
      });
    }
  }, [row, openModal]);

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        fd.append(key, value as string | Blob);
      }
    });

    try {
      setLoading(true);

      await dispatch(
        updatePandit({
          id: row?.id,
          data: fd,
        }),
      ).unwrap();

      dispatch(getPandit());

      toast.success('Pandit updated successfully');

      setOpenModal(false);
    } catch (error: any) {
      toast.error(error || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size="3xl">
      <Modal.Header>Update Pandit</Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
          {/* Name */}
          <div className="col-span-12 md:col-span-6">
            <Label value="Pandit Name" />
            <TextInput name="name" value={formData.name} onChange={handleChange} />
          </div>

          {/* Puja Name */}
          <div className="col-span-12 md:col-span-6">
            <Label value="Puja Name" />
            <TextInput name="puja_name" value={formData.puja_name} onChange={handleChange} />
          </div>

          {/* Price */}
          <div className="col-span-12 md:col-span-6">
            <Label value="Price" />
            <TextInput name="price" value={formData.price} onChange={handleChange} />
          </div>

          {/* Experience */}
          <div className="col-span-12 md:col-span-6">
            <Label value="Experience" />
            <TextInput name="exprience" value={formData.exprience} onChange={handleChange} />
          </div>

          {/* Language */}
          <div className="col-span-12 md:col-span-6">
            <Label value="Language" />
            <TextInput name="language" value={formData.language} onChange={handleChange} />
          </div>

          {/* Image Upload */}
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

          {/* Current Image */}
          {row?.image && (
            <div className="col-span-12">
              <Label value="Current Image" />
              <img
                src={`${imageUrl}/pandit/${row.image}`}
                alt="current"
                className="h-24 w-24 object-cover rounded-md border"
              />
            </div>
          )}

          <div className="col-span-12 md:col-span-12">
            <Label value="Description" />
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
            />
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

export default EditPandit;
