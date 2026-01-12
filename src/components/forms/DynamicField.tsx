/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Select } from 'antd';
import type { FC } from 'react';
import type { FormikProps } from 'formik';
import type { Field } from '@/types/config';

interface DynamicFieldProps {
  fieldItem: Field;
  formik: FormikProps<Record<string, unknown>>;
}

const COMPONENT_MAP: Record<string, unknown> = {
  text: Input,
  password: Input.Password,
  select: Select,
};

const DynamicField: FC<DynamicFieldProps> = ({ fieldItem, formik }) => {
  // Используем fallback 'text', если type не определен, чтобы избежать ошибки TS
  const fieldType = fieldItem.type || 'text';
  const Component = (COMPONENT_MAP[fieldType] || Input) as any;

  const hasError = formik.touched[fieldItem.key] && formik.errors[fieldItem.key];

  return (
    <div style={{ marginBottom: '16px' }}>
      {fieldItem.label && (
        <label style={{ display: 'block', marginBottom: '8px' }}>
          {fieldItem.label}
        </label>
      )}
      <Component
        style={{ width: '100%' }}
        name={fieldItem.key}
        size="middle"
        placeholder={fieldItem.placeholder as string}
        options={fieldItem.options}
        value={formik.values[fieldItem.key]}
        status={hasError ? 'error' : ''}
        onBlur={formik.handleBlur}
        onChange={(val: any) => {
          const value = val?.target ? val.target.value : val;
          formik.setFieldValue(fieldItem.key, value);
        }}
      />
      {hasError && (
        <div style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '4px' }}>
          {String(formik.errors[fieldItem.key])}
        </div>
      )}
    </div>
  );
};

export default DynamicField;