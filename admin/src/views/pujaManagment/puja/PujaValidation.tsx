export const createPujaSchema = {
  puja_name: { required: true },
  category_id: { required: true },
  description: { required: true },
  puja_duration: { required: true },
  price: { required: true, number: true },
  location: { required: true },
  date: { required: true },
  image: { file: true },
  gallery: { file: true },
};
