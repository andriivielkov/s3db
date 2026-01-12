import * as Yup from 'yup';
import type { AnyObject, ObjectSchema } from 'yup';

interface FieldConstraints {
  min?: number;
  max?: number;
  pattern?: string;
}

interface Field {
  key: string;
  required?: boolean;
  constraints?: FieldConstraints;
  [key: string]: unknown;
}

const getProviderValidationSchema = (fields: Field[]): ObjectSchema<AnyObject> => {
  const shape: Record<string, Yup.StringSchema> = {};

  fields.forEach((field) => {
    let validator = Yup.string();

    if (field.required) {
      validator = validator.required('Field is required');
    }

    if (field.constraints?.min) {
      validator = validator.min(field.constraints.min, `Min ${field.constraints.min} characters`);
    }

    if (field.constraints?.max) {
      validator = validator.max(field.constraints.max, `Max ${field.constraints.max} characters`);
    }

    if (field.constraints?.pattern) {
      validator = validator.matches(new RegExp(field.constraints.pattern), 'Invalid format');
    }

    validator = validator.test(
      'no-aa',
      'Frontend error: "aa" is not allowed',
      (val: string | undefined) => !val?.toLowerCase().includes('aa')
    );

    shape[field.key] = validator;
  });

  return Yup.object().shape(shape);
};

export { getProviderValidationSchema };