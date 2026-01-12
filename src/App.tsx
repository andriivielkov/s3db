import { useState, useMemo, useCallback } from 'react';
import { useFormik } from 'formik';
import { message } from 'antd';

import type { FC } from 'react';
import type { FormikHelpers } from 'formik';

import { useProviderConfig } from '@/hooks/useProviderConfig';
import { getProviderValidationSchema } from '@/services/validations';
import { validateMockBackend } from '@/services/mockBackend';

import ProviderSelector from '@/components/forms/ProviderSelector';
import ConfigurationForm from '@/components/forms/ConfigurationForm';
import ResultPreview from '@/components/forms/ResultPreview';

import css from "@styles/App.module.scss";

interface FormValues {
  [key: string]: any;
}

interface SavedFieldsMap {
  [key: string]: FormValues;
}

const App: FC = () => {
  const [selectedProviderKey, setSelectedProviderKey] = useState<string>('');
  const [savedFieldsMap, setSavedFieldsMap] = useState<SavedFieldsMap>({});
  const { dynamicConfig, currentProvider } = useProviderConfig(selectedProviderKey);

  const handleSubmit = async (values: FormValues, { setFieldError }: FormikHelpers<FormValues>) => {
    await new Promise(r => setTimeout(r, 500));

    const backendErrors = validateMockBackend(values);
    if (backendErrors) {
      Object.entries(backendErrors).forEach(([field, msg]) => setFieldError(field, msg as string));
      return;
    }

    setSavedFieldsMap(prev => ({ ...prev, [selectedProviderKey]: values }));
    message.success(`${currentProvider?.label} configuration saved!`);
  };

  const handleProviderChange = useCallback((key: string) => {
    setSelectedProviderKey(key);
  }, []);

  const memoizedInitialValues = useMemo<FormValues>(() => {
    const saved = savedFieldsMap[selectedProviderKey];
    const values: FormValues = {};

    if (saved) return saved;

    currentProvider?.fields.forEach(f => {
      const fieldKey = f.key as string;
      values[fieldKey] = f.type === 'select' ? (f.options?.[0]?.value ?? '') : '';
    });

    return values;
  }, [savedFieldsMap, selectedProviderKey, currentProvider?.fields]);

  const formik = useFormik<FormValues>({
    initialValues: memoizedInitialValues,
    validationSchema: useMemo(() =>
      currentProvider ? getProviderValidationSchema(currentProvider.fields) : null,
      [currentProvider]
    ),
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
  });

  return (
    <section>
      <h1>
        Third party storage
      </h1>

      <div className={css.cardGroup}>
        <ProviderSelector
          currentProvider={currentProvider}
          selectedProviderKey={selectedProviderKey}
          dynamicConfig={dynamicConfig}
          onSelect={handleProviderChange}
        />

        <ConfigurationForm
          currentProvider={currentProvider}
          selectedProviderKey={selectedProviderKey}
          formik={formik}
          isSaved={!!savedFieldsMap[selectedProviderKey]}
          onBack={() => handleProviderChange('')}
        />
      </div>

      <ResultPreview
        values={savedFieldsMap[selectedProviderKey]}
        provider={currentProvider}
      />
    </section>
  );
};

export default App;