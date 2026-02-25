import React, { useState } from 'react';
import { Button, Modal, Label, TextInput, Textarea, FileInput } from 'flowbite-react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { getCitiesByState } from 'src/features/location/locationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store';
import { createPackage } from 'src/features/tourmanagment/PackageSlice';
import { validateForm } from 'src/utils/formValidator';
import { createPackageSchema } from './PackageValidation';

interface CreatePackageProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
  states: any[];
}

const CreatePackage: React.FC<CreatePackageProps> = ({ openModal, setOpenModal, states }) => {
  const dispatch = useDispatch<AppDispatch>();

  const cities = useSelector((state: RootState) => state.location.cities) as any;

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

  const [errors, setErrors] = useState<any>({});

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData, createPackageSchema);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const fd = new FormData();

    Object.entries(formData).forEach(([key, value]: any) => {
      if (key === 'gallery') return;
      if (key === 'banner_image') return;
      fd.append(key, value ?? '');
    });

    if (formData.banner_image instanceof File) {
      fd.append('banner_image', formData.banner_image);
    }

    if (formData.gallery.length > 0) {
      formData.gallery.forEach((file: File) => {
        fd.append('gallery', file);
      });
    }

    dispatch(createPackage(fd));
    toast.success('Package created successfully');
    setOpenModal(false);
  };

  const handleStateChange = (opt: any) => {
    setFormData({
      ...formData,
      state_id: opt.value,
      start_city: null,
    });

    dispatch(getCitiesByState(opt.value));
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size="6xl">
      <Modal.Header>Create Tour Package</Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
          {/* Package Name */}
          <div className="col-span-12 md:col-span-4">
            <Label value="Package Name" />
            <TextInput
              name="package_name"
              value={formData.package_name}
              onChange={handleChange}
              placeholder="Enter package name"
              color={errors.package_name ? 'failure' : 'gray'}
            />
          </div>

          {/* Tour Type */}

          <div className="col-span-12 md:col-span-4">
            <Label value="Tour Type" />
            <select
              name="tour_type"
              value={formData.tour_type}
              onChange={handleChange}
              className={`bg-gray-50 border ${
                errors.tour_type ? 'border-red-500' : 'border-gray-300'
              } text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            >
              <option value="">Select Tour Type</option>
              <option value="Single">Single</option>
              <option value="Circuit">Circuit</option>
              <option value="Custom">Custom</option>
              <option value="Festival">Festival</option>
            </select>
          </div>

          {/* State */}
          <div className="col-span-12 md:col-span-4">
            <Label value="State" />
            <Select options={selectOptions} onChange={handleStateChange} />
            {errors.state_id && <p className="text-red-500 text-xs mt-1">{errors.state_id}</p>}
          </div>

          {/* Start City */}
          <div className="col-span-12 md:col-span-4">
            <Label value="Start City" />
            <Select
              options={selectCities}
              onChange={(opt: any) => setFormData({ ...formData, start_city: opt?.value })}
            />
            {errors.start_city && <p className="text-red-500 text-xs mt-1">{errors.start_city}</p>}
          </div>

          {/* Duration */}
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

          {/* Price */}
          <div className="col-span-12 md:col-span-4">
            <Label value="Base Price" />
            <TextInput
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter Base Price"
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

          {/* Banner */}
          <div className="col-span-12 md:col-span-4">
            <Label value="Banner Image" />
            <FileInput
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setFormData((prev: any) => ({
                  ...prev,
                  banner_image: file,
                }));
              }}
            />
            {errors.banner_image && (
              <p className="text-red-500 text-xs mt-1">{errors.banner_image}</p>
            )}
          </div>

          {/* Gallery */}
          <div className="col-span-12 md:col-span-4">
            <Label value="Gallery Images" />
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
            {errors.gallery && <p className="text-red-500 text-xs mt-1">{errors.gallery}</p>}
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

export default CreatePackage;
