import { useMemo } from 'react';
import type { FC } from 'react';

import { formatDestinationData } from '@/services/formatter';
import type { Provider } from '@/types/config';

import css from "@styles/App.module.scss";

interface ResultPreviewProps {
  values: Record<string, unknown> | null | undefined;
  provider: Provider | null | undefined;
}

const ResultPreview: FC<ResultPreviewProps> = ({ values, provider }) => {
  const finalJson = useMemo(() => {
    if (!values || !provider) return null;

    return formatDestinationData(values, provider);
  }, [values, provider]);

  if (!finalJson) return null;

  return (
    <div className={css.preContainer}>
      <pre>
        {JSON.stringify(finalJson, null, 2)}
      </pre>
    </div>
  );
};

export default ResultPreview;