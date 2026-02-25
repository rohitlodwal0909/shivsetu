import React, { useEffect, useState } from 'react';
import { Button, Modal, Label, TextInput, Textarea, FileInput } from 'flowbite-react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { getCitiesByState } from 'src/features/location/locationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store';
import { validateForm } from 'src/utils/formValidator';
import { createPackageSchema } from './PackageValidation';
import { imageUrl } from 'src/constants/contant';
import { getPackage, updatePackage } from 'src/features/tourmanagment/PackageSlice';

interface EditPackageProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
  states: any[];
  row: any;
}

const EditPackage: React.FC<EditPackageProps> = ({ openModal, setOpenModal, states, row }) => {
  const dispatch = useDispatch<AppDispatch>();
  const cities = useSelector((state: RootState) => state.location.cities);

  const [formData, setFormData] = useState<any>({
    package_name: '',
    tour_type: '',
    state_id: '',
    start_city: '',
    duration_days: '',
    price: '',
    max_person: '',
    start_date: '',
    end_date: '',
    inclusions: '',
    exclusions: '',
    highlights: '',
    banner_image: null,
    gallery: [],
  });

  const [previewBanner, setPreviewBanner] = useState<string | null>(null);
  const [previewGallery, setPreviewGallery] = useState<string[]>([]);

  const [errors, setErrors] = useState<any>({});

  /* ---------------- PREFILL DATA ---------------- */
  useEffect(() => {
    if (row && openModal) {
      setFormData({
        package_name: row.package_name || '',
        tour_type: row.tour_type || '',
        state_id: row.state_id || '',
        start_city: row.start_city || '',
        duration_days: row.duration_days || '',
        price: row.price || '',
        max_person: row.max_person || '',
        start_date: row.start_date || '',
        end_date: row.end_date || '',
        inclusions: row.inclusions || '',
        exclusions: row.exclusions || '',
        highlights: row.highlights || '',
        banner_image: row.banner_image,
        gallery: [],
      });

      setPreviewBanner(row?.banner_image ? `${imageUrl + 'packages/'}/${row.banner_image}` : null);

      setPreviewGallery(
        (row?.gallery &&
          JSON.parse(row?.gallery)?.map((img: string) => `${imageUrl + 'packages'}/${img}`)) ||
          [],
      );

      if (row.state_id) {
        dispatch(getCitiesByState(row.state_id));
      }
    }
  }, [row, openModal, dispatch]);

  const clearError = (field: string) => {
    setErrors((prev: any) => ({ ...prev, [field]: '' }));
  };

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > = (e) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    clearError(name);
  };

  const selectOptions =
    states?.map((item: any) => ({
      value: item.id,
      label: item.name,
    })) || [];

  const selectCities =
    cities?.map((item: any) => ({
      value: item.id,
      label: item.city,
    })) || [];

  const handleStateChange = (opt: any) => {
    setFormData((prev: any) => ({
      ...prev,
      state_id: opt?.value || '',
      start_city: '',
    }));

    clearError('state_id');
    clearError('start_city');

    if (opt?.value) {
      dispatch(getCitiesByState(opt.value));
    }
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData, createPackageSchema);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix validation errors');
      return;
    }

    const fd = new FormData();
    fd.append('id', row.id);

    Object.entries(formData).forEach(([key, value]: any) => {
      if (key === 'banner_image' || key === 'gallery') return;
      fd.append(key, value ?? '');
    });

    if (formData.banner_image) {
      fd.append('banner_image', formData.banner_image);
    }

    formData.gallery.forEach((file: File) => {
      fd.append('gallery', file);
    });

    dispatch(
      updatePackage({
        id: row.id,
        data: fd,
      }),
    );
    toast.success('Package updated successfully');
    setOpenModal(false);
    dispatch(getPackage());
    setErrors({});
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size="6xl">
      <Modal.Header>Edit Tour Package</Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4">
            <Label value="Package Name" />
            <TextInput
              name="package_name"
              value={formData.package_name}
              onChange={handleChange}
              color={errors.package_name ? 'failure' : 'gray'}
            />
          </div>

          <div className="col-span-12 md:col-span-4">
            <Label value="Tour Type" />
            <select
              name="tour_type"
              value={formData.tour_type}
              onChange={handleChange}
              className={`border p-2 w-full rounded ${
                errors.tour_type ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Tour Type</option>
              <option value="Single">Single</option>
              <option value="Circuit">Circuit</option>
              <option value="Custom">Custom</option>
              <option value="Festival">Festival</option>
            </select>
          </div>

          <div className="col-span-12 md:col-span-4">
            <Label value="State" />
            <Select
              options={selectOptions}
              value={selectOptions.find((s) => s.value === formData.state_id)}
              onChange={handleStateChange}
            />
          </div>

          <div className="col-span-12 md:col-span-4">
            <Label value="Start City" />
            <Select
              options={selectCities}
              value={selectCities.find((c) => c.value === formData.start_city)}
              onChange={(opt: any) => {
                setFormData((prev: any) => ({ ...prev, start_city: opt?.value || '' }));
                clearError('start_city');
              }}
            />
          </div>

          <div className="col-span-12 md:col-span-4">
            <Label value="Duration (Days)" />
            <TextInput
              name="duration_days"
              value={formData.duration_days}
              onChange={handleChange}
              placeholder="Enter Duration (Days)"
            />
            {errors.duration_days && (
              <p className="text-red-500 text-xs mt-1">{errors.duration_days}</p>
            )}
          </div>
          <div className="col-span-12 md:col-span-4">
            <Label value="Base Price" />
            <TextInput
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter Base price"
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
          </div>

          {/* Max Person */}
          <div className="col-span-12 md:col-span-4">
            <Label value="Max Person" />
            <TextInput
              name="max_person"
              value={formData.max_person}
              onChange={handleChange}
              placeholder="Enter Max Person"
            />
            {errors.max_person && <p className="text-red-500 text-xs mt-1">{errors.max_person}</p>}
          </div>

          {/* Start Date */}
          <div className="col-span-12 md:col-span-4">
            <Label value="Start Date" />
            <TextInput
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
            />
          </div>

          {/* End Date */}
          <div className="col-span-12 md:col-span-4">
            <Label value="End Date" />
            <TextInput
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
            />
          </div>

          {/* Inclusions */}
          <div className="col-span-12 md:col-span-4">
            <Label value="Inclusions" />
            <Textarea
              name="inclusions"
              value={formData.inclusions}
              onChange={handleChange}
              placeholder="Enter Inclusions"
            />
          </div>

          {/* Exclusions */}
          <div className="col-span-12 md:col-span-4">
            <Label value="Exclusions" />
            <Textarea
              name="exclusions"
              value={formData.exclusions}
              onChange={handleChange}
              placeholder="Enter Exclusions"
            />
          </div>

          {/* Highlights */}
          <div className="col-span-12 md:col-span-4">
            <Label value="Highlights" />
            <Textarea
              name="highlights"
              value={formData.highlights}
              onChange={handleChange}
              placeholder="Enter Highlights"
            />
            {errors.highlights && <p className="text-red-500 text-xs mt-1">{errors.highlights}</p>}
          </div>

          <div className="col-span-12 md:col-span-4">
            <Label value="Banner Image (Optional)" />

            <FileInput
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFormData((prev: any) => ({ ...prev, banner_image: file }));
                  setPreviewBanner(URL.createObjectURL(file));
                }
              }}
            />
            {previewBanner && (
              <img
                src={previewBanner}
                alt="Banner"
                className="h-20 w-full object-cover rounded mb-2 border"
              />
            )}
          </div>

          <div className="col-span-12 md:col-span-4">
            <Label value="Gallery Images (Optional)" />
            <FileInput
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = e.target.files ? Array.from(e.target.files) : [];

                setFormData((prev: any) => ({
                  ...prev,
                  gallery: files,
                }));

                setPreviewGallery(files.map((file) => URL.createObjectURL(file)));
              }}
            />
            <div className="grid grid-cols-4 gap-2 mb-2">
              {previewGallery?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Gallery"
                  className="h-20 w-full object-cover rounded border"
                />
              ))}
            </div>
          </div>

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

export default EditPackage;
