import { message } from 'antd';

export const validateMockBackend = (values: Record<string, unknown>): Record<string, string> | null => {
  const errors: Record<string, string> = {};

  Object.keys(values).forEach((key) => {
    const value = String(values[key] ?? '');

    if (value.includes('bb')) {
      errors[key] = 'Backend error: string "bb" is not allowed here';
    } else if (value === 'error') {
      errors[key] = 'Backend validation failed: this name is already taken';

      message.error({
        content: `Critical error: field "${key}" has an invalid value!`,
        duration: 3,
      });
    }
  });

  return Object.keys(errors).length > 0 ? errors : null;
};