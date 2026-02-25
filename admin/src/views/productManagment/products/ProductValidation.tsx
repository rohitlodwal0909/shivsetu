export const createProductSchema = {
  product_name: { required: true },
  category_id: { required: true },
  short_description: { required: true },
  full_description: { required: true },
  price: { required: true, number: true },
  mrp: { required: true, number: true },
  discount_percent: { required: true, number: true },
  stock_quantity: { required: false },
  image: { file: true },
  gallery: { file: true },
};
