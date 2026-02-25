import React, { useEffect, useState } from 'react';
import { Button, Modal, Label, TextInput, Textarea, FileInput } from 'flowbite-react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { validateForm } from 'src/utils/formValidator';
import { createProductSchema } from './ProductValidation';
import { imageUrl } from 'src/constants/contant';
import { getProduct, updateProduct } from 'src/features/productmanagment/ProductSlice';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface EditProductProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
  categories: any[];
  row: any;
}

const EditProduct: React.FC<EditProductProps> = ({ openModal, setOpenModal, categories, row }) => {
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

  const [previewBanner, setPreviewBanner] = useState<string | null>(null);
  const [previewGallery, setPreviewGallery] = useState<string[]>([]);
  const [errors, setErrors] = useState<any>({});

  /* ---------------- PREFILL DATA ---------------- */
  useEffect(() => {
    if (row && openModal) {
      setFormData({
        category_id: row.category_id || '',
        product_name: row.product_name || '',
        short_description: row.short_description || '',
        full_description: row.full_description || '',
        mrp: row.mrp || '',
        price: row.price || '',
        discount_percent: row.discount_percent || '',
        stock_quantity: row.stock_quantity || '',
        image: row.image,
        gallery: [],
      });

      setPreviewBanner(row?.image ? `${imageUrl + 'products/'}/${row.image}` : null);

      setPreviewGallery(
        (row?.gallery &&
          JSON.parse(row?.gallery)?.map((img: string) => `${imageUrl + 'products'}/${img}`)) ||
          [],
      );
    }
  }, [row, openModal, dispatch]);

  const clearError = (field: string) => {
    setErrors((prev: any) => ({ ...prev, [field]: '' }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    clearError(name);
  };

  type OptionType = {
    value: number;
    label: string;
  };
  const handleCategoryChange = (selectedOption: OptionType | null) => {
    setFormData((prev: any) => ({
      ...prev,
      category_id: selectedOption?.value ?? '',
    }));

    clearError('category_id');
  };

  const selectOptions =
    categories?.map((item: any) => ({
      value: item.id,
      label: item.name,
    })) || [];

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData, createProductSchema);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix validation errors');
      return;
    }

    const fd = new FormData();
    fd.append('id', row.id);

    Object.entries(formData).forEach(([key, value]: any) => {
      if (key === 'image' || key === 'gallery') return;
      fd.append(key, value ?? '');
    });

    if (formData.image) {
      fd.append('image', formData.image);
    }

    formData.gallery.forEach((file: File) => {
      fd.append('gallery', file);
    });

    try {
      dispatch(
        updateProduct({
          id: row.id,
          data: fd,
        }),
      );
      toast.success('Product updated successfully');
      setOpenModal(false);
      dispatch(getProduct());
    } catch (error) {
      setErrors({});
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size="4xl">
      <Modal.Header>Edit Product</Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4">
            <Label value="Product Category" />
            <Select
              options={selectOptions}
              value={selectOptions.find((s) => s.value === Number(formData.category_id))}
              onChange={handleCategoryChange}
              isClearable
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <Label value="Product Name" />
            <TextInput
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              color={errors.product_name ? 'failure' : 'gray'}
            />
          </div>

          <div className="col-span-12 md:col-span-4">
            <Label value="Short Description" />
            <Textarea
              name="short_description"
              value={formData.short_description}
              onChange={handleChange}
              placeholder="Enter short description"
            />
            {errors.duration_days && (
              <p className="text-red-500 text-xs mt-1">{errors.duration_days}</p>
            )}
          </div>
          <div className="col-span-12 md:col-span-4">
            <Label value="Price" />
            <TextInput
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
          </div>

          <div className="col-span-12 md:col-span-4">
            <Label value="MRP" />
            <TextInput
              name="mrp"
              value={formData.mrp}
              onChange={handleChange}
              placeholder="Enter price"
            />
            {errors.mrp && <p className="text-red-500 text-xs mt-1">{errors.mrp}</p>}
          </div>

          <div className="col-span-12 md:col-span-4">
            <Label value="Discount percent" />
            <TextInput
              name="discount_percent"
              value={formData.discount_percent}
              onChange={handleChange}
              placeholder="Enter Discount percent"
            />
            {errors.discount_percent && (
              <p className="text-red-500 text-xs mt-1">{errors.discount_percent}</p>
            )}
          </div>

          <div className="col-span-12 md:col-span-4">
            <Label value="Stock Qty" />
            <TextInput
              name="stock_quantity"
              value={formData.stock_quantity}
              onChange={handleChange}
              placeholder="Enter Discount percent"
            />
            {errors.stock_quantity && (
              <p className="text-red-500 text-xs mt-1">{errors.stock_quantity}</p>
            )}
          </div>

          <div className="col-span-12 md:col-span-4">
            <Label value="Banner Image (Optional)" />

            <FileInput
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFormData((prev: any) => ({ ...prev, image: file }));
                  setPreviewBanner(URL.createObjectURL(file));
                }
              }}
            />
            <div className="grid grid-cols-4 gap-2 mb-2">
              {previewBanner && (
                <img
                  src={previewBanner}
                  alt="Banner"
                  className="h-20 w-full object-cover rounded mb-2 border"
                />
              )}
            </div>
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

export default EditProduct;
