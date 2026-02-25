export const createPackageSchema = {
  package_name: { required: true },
  tour_type: { required: true },
  state_id: { required: true },
  start_city: { required: true },
  duration_days: { required: true, number: true },
  price: { required: true, number: true },
  max_person: { required: true, number: true },
  start_date: { required: false },
  end_date: { required: false },
  highlights: { required: true },
  banner_image: { file: true },
  gallery: { file: true },
};
