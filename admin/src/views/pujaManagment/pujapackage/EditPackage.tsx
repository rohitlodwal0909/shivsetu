import React, { useEffect, useState } from 'react';
import { Button, Modal, Label, TextInput, FileInput } from 'flowbite-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { getPujaPackages, updatePujaPackage } from 'src/features/pujamanagment/PujaPackageSlice';
import { imageUrl } from 'src/constants/contant';
import ReactQuill from 'react-quill-new';

interface EditPackageProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
  row: any;
}

const EditPackage: React.FC<EditPackageProps> = ({ openModal, setOpenModal, row }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<any>({
    name: '',
    persons: '',
    price: '',
    description: '',
    image: null,
  });

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (row && openModal) {
      setFormData({
        name: row?.name || '',
        persons: row?.persons || '',
        price: row?.price || '',
        description: row?.description || '',
        image: null,
      });
    }
  }, [row, openModal]);

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
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
        updatePujaPackage({
          id: row?.id,
          data: fd,
        }),
      ).unwrap();

      dispatch(getPujaPackages());

      toast.success('Package updated successfully');
      setOpenModal(false);
    } catch (error: any) {
      toast.error(error || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size="3xl">
      <Modal.Header>Update Package</Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
          {/* Name */}
          <div className="col-span-12 md:col-span-6">
            <Label value="Package Name" />
            <TextInput name="name" value={formData.name} onChange={handleChange} />
          </div>

          {/* Person */}
          <div className="col-span-12 md:col-span-6">
            <Label value="Person" />
            <TextInput name="persons" value={formData.persons} onChange={handleChange} />
          </div>

          {/* Price */}
          <div className="col-span-12 md:col-span-6">
            <Label value="Price" />
            <TextInput name="price" value={formData.price} onChange={handleChange} />
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
                src={`${imageUrl}/packages/${row.image}`}
                alt="current"
                className="h-24 w-24 object-cover rounded-md border"
              />
            </div>
          )}

          {/* Description */}
          <div className="col-span-12">
            <Label value="Description" />
            <div className="bg-white rounded-md">
              <ReactQuill
                theme="snow"
                value={formData.description || ''}
                onChange={(value) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    description: value,
                  }))
                }
                modules={modules}
                className="h-40 mb-10"
              />
            </div>
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

export default EditPackage;
