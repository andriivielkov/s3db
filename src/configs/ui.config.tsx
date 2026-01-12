import type { UIFieldConfig, ProviderUI } from '@/types/config';
import { AwsIcon, GcpIcon, AzureIcon } from "@/components/icons/providers";

const PROVIDER_UI: Record<string, ProviderUI> = {
  aws: { label: 'AWS S3', icon: AwsIcon },
  gcp: { label: 'Google Cloud', icon: GcpIcon },
  azure: { label: 'Microsoft Azure', icon: AzureIcon },
};

const FIELD_CONFIGS: {
  default: Record<string, UIFieldConfig>;
  custom: Record<string, Record<string, Partial<UIFieldConfig>>>;
} = {
  default: {
    bucket: {
      type: 'text',
      label: 'Bucket Name',
      placeholder: 'My bucket name or ["aa", "bb", "error"] tests validation...',
      group: 'row-0',
    },
    region: {
      type: 'select',
      label: 'Region',
      asyncOptions: true,
      options: [],
      group: 'row-0'
    },
    path: {
      type: 'text',
      label: 'Path',
      group: 'row-1'
    },
    key: {
      type: 'text',
      label: 'Access Key ID',
      group: 'row-2',
    },
    secret: {
      type: 'password',
      label: 'Secret Access Key',
      group: 'row-2',
    },
    permissions: {
      type: 'select',
      label: 'Access Level',
      group: 'row-2',
      options: [
        { label: 'Private (No anonymous access)', value: 'private' },
        { label: 'Blob (Read-only for blobs)', value: 'blob' },
        { label: 'Container (Full read access)', value: 'container' },
      ],
    },
  },
  custom: {
    aws: {},
    gcp: {
      secret: {
        type: "password",
        label: "Secret Access Key (Google)",
        group: 'row-2',
      },
    },
    azure: {
      path: {
        type: 'text',
        label: 'Azure Path',
        group: 'row-0'
      },
    }
  }
};

export { FIELD_CONFIGS, PROVIDER_UI };
