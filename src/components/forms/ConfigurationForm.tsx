import { memo } from 'react';
import cx from 'classnames';
import { Button } from 'antd';

import type { FC } from 'react';
import type { FormikProps } from 'formik';

import type { Provider } from '@/types/config';

import DynamicField from '@/components/forms/DynamicField';
import css from '@styles/App.module.scss';

interface ConfigurationFormProps {
  currentProvider: Provider | null | undefined;
  selectedProviderKey: string;
  formik: FormikProps<Record<string, unknown>>;
  onBack: () => void;
  isSaved: boolean;
}

const ConfigurationForm: FC<ConfigurationFormProps> = ({ 
  currentProvider,
  selectedProviderKey,
  formik,
  onBack,
  isSaved
}) => (
  <>
    {selectedProviderKey && currentProvider && (
      <div className={css.formGrid}>
        {currentProvider.fields.map(fieldItem => {
          const fieldsInGroup = currentProvider.fields.filter(f => f.group === fieldItem.group).length;
          const widthClass = fieldsInGroup > 1 ? 'w50' : 'w100';

          return (
            <div key={fieldItem.key} className={cx(css.formGrid__item, css[`formGrid__item_${widthClass}`])}>
              <DynamicField fieldItem={fieldItem} formik={formik} />
            </div>
          );
        })}
      </div>
    )}

    <div className={css.buttonGroup}>
      <Button onClick={onBack}>
        Cancel
      </Button>

      <Button
        type="primary"
        disabled={!formik.isValid || (!formik.dirty && !isSaved)} 
        loading={formik.isSubmitting}
        onClick={() => formik.handleSubmit()}
      >
        Save
      </Button>
    </div>
  </>
);

export default memo(ConfigurationForm);
