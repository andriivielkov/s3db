interface Field {
  key: string;
  [key: string]: unknown;
}

interface Provider {
  key: string;
  urlTemplate?: string;
  fields: Field[];
}

interface FormValues {
  [key: string]: string | undefined | unknown;
}

interface FormattedData {
  provider: string;
  destination: {
    url: string;
    key: string;
    secret: string;
    permissions?: unknown;
  };
}

export const formatDestinationData = (
  values: FormValues,
  currentProvider: Provider
): FormattedData => {
  let generatedUrl = currentProvider.urlTemplate || '';

  currentProvider.fields.forEach(field => {
    const val = String(values[field.key] || '');
    generatedUrl = generatedUrl.replace(`{${field.key}}`, val);
  });

  generatedUrl = generatedUrl.replace(/([^:])\/{2,}/g, '$1/');

  return {
    provider: currentProvider.key,
    destination: {
      url: generatedUrl,
      key: String(values.key || ''),
      secret: String(values.secret || ''),
      ...(values.permissions !== undefined && { permissions: values.permissions }),
    },
  };
};