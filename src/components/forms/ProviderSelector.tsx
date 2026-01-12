import type { FC } from 'react';
import cx from 'classnames';
import { Select } from 'antd';

import css from '@styles/App.module.scss';

interface Provider {
  key: string;
  label: string;
  IconComponent: FC<{ fill?: string }>;
  fields?: Record<string, unknown>[];
}

interface ProviderSelectorProps {
  dynamicConfig: Provider[];
  selectedProviderKey: string;
  currentProvider?: Provider | null; // Добавь эту строку
  onSelect: (key: string) => void;
}

const ProviderSelector: FC<ProviderSelectorProps> = ({ 
  dynamicConfig,
  selectedProviderKey,
  onSelect
}) => {
  return (
    <div>
      <h2>Third-Party Storage</h2>

      <label>Choose Provider</label>
      <div className={css.listGroup}>
        {!selectedProviderKey ? (
          <>
            {dynamicConfig.map(p => (
              <div
                key={p.key}
                className={cx(css.listGroup__item, { [css.listGroup__item_active]: selectedProviderKey === p.key })}
                onClick={() => onSelect(p.key)}
              >
                {<p.IconComponent fill="none" />}
                {p.label}
              </div>
            ))}
          </>
        ) : (
          <div style={{ display: "block", width: '100%', paddingBottom: '2rem' }}>
            <Select
              style={{ width: '100%' }}
              value={selectedProviderKey}
              onChange={onSelect}
              options={dynamicConfig.map(p => ({
                value: p.key,
                label: (
                  <div className={css.labelGroup}>
                    <p.IconComponent />
                    <span>{p.label}</span>
                  </div>
                )
              }))}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderSelector;