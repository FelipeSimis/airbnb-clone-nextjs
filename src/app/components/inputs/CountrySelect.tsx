'use client';

import Select from 'react-select';

import { useCountries } from '@hooks/useCountries';

export type CountrySelectValue = {
  label?: string;
  latlng: [number, number];
  flag: string;
  region: string;
  value?: string;
};

type OptionLabelProps = {
  flag: string;
  label?: string;
  region: string;
};

type CountrySelectProps = {
  value: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
};

const OptionLabel = ({ flag, label, region }: OptionLabelProps) => (
  <div className="flex items-center gap-3">
    <div>{flag}</div>

    <div>
      {label} <span className="ml-1 text-neutral-500">{region}</span>
    </div>
  </div>
);

const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const { getAll } = useCountries();

  const formatOptionLabel = ({ label, flag, region }: CountrySelectValue) => (
    <OptionLabel key={label} label={label} flag={flag} region={region} />
  );

  return (
    <div>
      <Select
        instanceId="country-select"
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        onChange={val => onChange(val as CountrySelectValue)}
        value={value}
        formatOptionLabel={formatOptionLabel}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg z-10',
          menu: () => '!z-[9999]',
        }}
        theme={theme => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6',
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
