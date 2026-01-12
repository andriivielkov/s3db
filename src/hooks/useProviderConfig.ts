import { useMemo } from 'react';
import type { FC } from 'react';
import { PROVIDERS, REGIONS } from '@/configs/backend.data';
import { FIELD_CONFIGS, PROVIDER_UI } from '@/configs/ui.config';
import { LOCALES } from '@/locales';

interface FieldOption {
  value: string | number;
  label: string;
}

interface UIField {
  type?: string;
  label?: string;
  placeholder?: string;
  group?: string;
  asyncOptions?: boolean;
  options?: FieldOption[];
  key: string;
}

interface Provider {
  key: string;
  label: string;
  IconComponent: FC<{ fill?: string }>;
  fields: Array<Record<string, unknown> & UIField>;
  urlTemplate: string;
  [key: string]: unknown;
}

export const useProviderConfig = (selectedProviderKey: string) => {
  const selectedLocales = 'en';

  const dynamicConfig = useMemo<Provider[]>(() => {
    return PROVIDERS.map(providerItem => {
      const ui = PROVIDER_UI[providerItem.key as keyof typeof PROVIDER_UI];

      return {
        ...providerItem,
        label: ui.label,
        IconComponent: ui.icon,
        fields: providerItem.fields.map(field => {
          const customConfigs = FIELD_CONFIGS.custom as Record<string, Record<string, unknown>>;
          const defaultConfigs = FIELD_CONFIGS.default as Record<string, unknown>;

          const customField = customConfigs[providerItem.key]?.[field.key];
          const defaultField = defaultConfigs[field.key];

          const uiField = {
            key: field.key,
            ...(customField || defaultField || {})
          } as UIField;

          let options: FieldOption[] = uiField.options || [];

          if (uiField.asyncOptions) {
            const providerRegions = (REGIONS as Record<string, { regions: string[] }>)[providerItem.key]?.regions || [];
            options = providerRegions.map(code => ({
              value: code,
              label: (LOCALES[selectedLocales as keyof typeof LOCALES] as Record<string, any>).regions?.[code] || code
            }));
          }

          return { ...field, ...uiField, options };
        }),
      } as Provider;
    });
  }, []);

  const currentProvider = useMemo(() =>
    dynamicConfig.find(p => p.key === selectedProviderKey),
    [selectedProviderKey, dynamicConfig]
  );

  return { dynamicConfig, currentProvider };
};