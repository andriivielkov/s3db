import type { BackendProvider } from '@/types/config';

// backed config for providers
const PROVIDERS: BackendProvider[] = [
  {
    key: 'aws',
    fields: [
      {
        key: 'bucket',
        required: true,
        constraints: {
          pattern: '^[a-z0-9.-]{3,63}$',
          min: 3,
          max: 100,
        }
      },
      {
        key: 'region',
        required: true,
        metadata: { hasOptions: true, url: '/api/regions/aws/getList' }, // example metadata
      },
      {
        key: 'key',
        required: true,
        constraints: {
          min: 3,
          max: 50,
        },
      },
      {
        key: 'secret',
        required: false,
        constraints: {
          max: 50,
        },
      },
    ],
    urlTemplate: 's3://s3.{region}.amazonaws.com/{bucket}/{path}'
  },
  {
    key: 'gcp',
    fields: [
      {
        key: 'bucket',
        required: true,
        constraints: {
          pattern: '^[a-z0-9.-]{3,63}$',
          min: 10,
          max: 250,
        }
      },
      {
        key: 'key',
        required: true,
        constraints: {
          max: 50,
        },
      },
      {
        key: 'secret',
        required: true,
        constraints: {
          max: 50,
        },
      },
      {
        key: 'permissions',
        required: false,
        constraints: {
          min: 3,
          max: 50,
        },
      },
    ],
    urlTemplate: 'gs://storage.googleapis.com/{bucket}'
  },
  {
    key: 'azure',
    fields: [
      {
        key: 'bucket',
        required: false,
        constraints: {
          pattern: '^[a-z0-9.-]{3,63}$',
          min: 3,
          max: 100,
        }
      },
      {
        key: 'path',
        required: false,
        constraints: {
          pattern: '^(?!.*[/]{2})(?!.*[.]{2})(?!.*[./]$)(?!.*[.][\/])(?!.*[\/][.])[a-zA-Z0-9_./-]+$',
          min: 2,
          max: 250
        }
      },
      {
        key: 'key',
        required: true,
      },
      {
        key: 'secret',
        required: true,
      },
      {
        key: 'permissions',
        required: false,
      },
    ],
    urlTemplate: 'https://{key}.blob.core.windows.net/{bucket}'
  },
];

// backed config for regions
const REGIONS = {
  aws: {
    regions: ['us-east-2', 'us-east-1', 'eu-west-1', 'mx-central-1', 'ap-south-1', 'us-west-1'],
  },
};

export { PROVIDERS, REGIONS };

