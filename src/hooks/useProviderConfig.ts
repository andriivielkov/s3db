import { useMemo } from 'react';
import { PROVIDERS, REGIONS } from '@/configs/backend.data';
import { FIELD_CONFIGS, PROVIDER_UI } from '@/configs/ui.config';
import { LOCALES } from '@/locales';
import type { Provider, Field, FieldOption } from '@/types/config';

type LocaleType = typeof LOCALES;
type LangCode = keyof LocaleType;

export const useProviderConfig = (selectedProviderKey: string) => {
  const selectedLocales: LangCode = 'en';

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

          const uiField: Field = {
            key: field.key,
            ...((customField || defaultField || {}) as Record<string, unknown>)
          };

          let options: FieldOption[] = (uiField.options as FieldOption[]) || [];

          if (uiField.asyncOptions) {
            const providerRegions = (REGIONS as Record<string, { regions: string[] }>)[providerItem.key]?.regions || [];

            const regionsList = LOCALES[selectedLocales].regions;
            
            options = providerRegions.map(code => ({
              value: code,
              label: regionsList[code as keyof typeof regionsList] || code
            }));
          }

          return { ...field, ...uiField, options };
        }),
      } as Provider;
    });
  }, [selectedLocales]);

  const currentProvider = useMemo(() =>
    dynamicConfig.find(p => p.key === selectedProviderKey),
    [selectedProviderKey, dynamicConfig]
  );

  return { dynamicConfig, currentProvider };
};