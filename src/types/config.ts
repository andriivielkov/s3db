import type { FC } from 'react';

export interface FieldOption {
  label: string;
  value: string | number;
}

export interface Field {
  key: string;
  type?: string;
  label?: string;
  placeholder?: string;
  group?: string;
  asyncOptions?: boolean;
  options?: FieldOption[];
  [key: string]: unknown;
}

export interface Provider {
  key: string;
  label: string;
  IconComponent: FC<{ fill?: string }>;
  fields: Field[];
  urlTemplate: string;
  [key: string]: unknown;
}

export interface UIFieldConfig {
  type: string;
  label: string;
  placeholder?: string;
  group: string;
  asyncOptions?: boolean;
  options?: FieldOption[];
}

export interface ProviderUI {
  label: string;
  icon: FC<{ fill?: string }>;
}

export interface BackendField {
  key: string;
  required?: boolean;
  constraints?: {
    pattern?: string;
    min?: number;
    max?: number;
  };
  metadata?: Record<string, unknown>;
}

export interface BackendProvider {
  key: string;
  fields: BackendField[];
  urlTemplate: string;
}