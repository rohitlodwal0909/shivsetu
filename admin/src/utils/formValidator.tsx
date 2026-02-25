type Rule = {
  required?: boolean;
  number?: boolean;
  min?: number;
  file?: boolean;
};

type Schema = Record<string, Rule>;

export const validateForm = (data: any, schema: Schema) => {
  const errors: any = {};

  Object.keys(schema).forEach((field) => {
    const rules = schema[field];
    const value = data[field];

    // Required
    if (rules.required && (!value || value.toString().trim() === '')) {
      errors[field] = 'This field is required';
      return;
    }

    // Number
    if (rules.number && value && isNaN(Number(value))) {
      errors[field] = 'Must be a number';
    }

    // Min
    if (rules.min && Number(value) < rules.min) {
      errors[field] = `Minimum value is ${rules.min}`;
    }

    // File
    if (rules.file && !value) {
      errors[field] = 'File is required';
    }
  });

  return errors;
};
