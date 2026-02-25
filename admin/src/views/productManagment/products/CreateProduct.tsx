import React, { useState } from 'react';
import { Button, Modal, Label, TextInput, Textarea, FileInput } from 'flowbite-react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { validateForm } from 'src/utils/formValidator';
import { createProductSchema } from './ProductValidation';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { createProduct } from 'src/features/productmanagment/ProductSlice';

interface CreatePackageProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
  categories: [];
}

const CreateProduct: React.FC<CreatePackageProps> = ({ openModal, setOpenModal, categories }) => {
  const dispatch = useDispatch<AppDispatch>();

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const [formData, setFormData] = useState<any>({
    category_id: '',
    product_name: '',
    short_description: '',
    full_description: '',
    price: '',
    mrp: '',
    discount_percent: '',
    stock_quantity: '',
    status: '',
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData, createProductSchema);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const fd = new FormData();

    Object.entries(formData).forEach(([key, value]: any) => {
      if (key !== 'gallery' && value !== null) {
        fd.append(key, value);
      }
    });

    // Append Gallery Images
    if (formData.gallery.length > 0) {
      formData.gallery.forEach((file: File) => {
        fd.append('gallery', file);
      });
    }
    try {
      dispatch(createProduct(fd));
      toast.success('Product created successfully');
      setOpenModal(false);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size="4xl">
      <Modal.Header>Create Product</Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
          {/* Category */}
          <div className="col-span-12 md:col-span-4">
            <Label value="Select Category" />
            <Select options={selectOptions} onChange={handleCategoryChange} />
            {errors.category_id && (
              <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>
            )}
          </div>

          {/* Product Name */}
          <div className="col-span-12 md:col-span-4">
            <Label value="Product Name" />
            <TextInput
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              placeholder="Enter product name"
              color={errors.product_name ? 'failure' : 'gray'}
            />
          </div>

          {/* Short Description */}
          <div className="col-span-12 md:col-span-4">
            <Label value="Short Description" />
            <Textarea
              name="short_description"
              value={formData.short_description}
              onChange={handleChange}
              placeholder="Enter short description"
            />
          </div>

          {/* Price */}
          <div className="col-span-12 md:col-span-4">
            <Label value="Price" />
            <TextInput
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
            />
          </div>

          {/* MRP */}
          <div className="col-span-12 md:col-span-4">
            <Label value="MRP" />
            <TextInput
              name="mrp"
              value={formData.mrp}
              onChange={handleChange}
              placeholder="Enter MRP"
            />
          </div>

          {/* Discount */}
          <div className="col-span-12 md:col-span-4">
            <Label value="Discount Percent" />
            <TextInput
              name="discount_percent"
              value={formData.discount_percent}
              onChange={handleChange}
              placeholder="Enter discount percent"
            />
          </div>

          {/* Stock */}
          <div className="col-span-12 md:col-span-4">
            <Label value="Stock Quantity" />
            <TextInput
              name="stock_quantity"
              value={formData.stock_quantity}
              onChange={handleChange}
              placeholder="Enter stock quantity"
            />
          </div>

          {/* Banner Image */}
          <div className="col-span-12 md:col-span-4">
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
          <div className="col-span-12 md:col-span-4">
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

          {/* Full Description Editor */}
          <div className="col-span-12">
            <Label value="Full Description" />

            <div className="bg-white">
              <ReactQuill
                theme="snow"
                value={formData.full_description}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    full_description: value,
                  })
                }
                modules={modules}
              />
            </div>

            {errors.full_description && (
              <p className="text-red-500 text-xs mt-1">{errors.full_description}</p>
            )}
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

export default CreateProduct;
