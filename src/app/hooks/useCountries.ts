import { create } from 'zustand';
import countries from 'world-countries';

const formattedCountries = countries.map(country => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

type Country = {
  value: string;
  label: string;
  flag: string;
  latlng: [number, number];
  region: string;
};

type CountriesStore = {
  getAll: () => Country[];
  getByValue: (value: string) => Country | undefined;
};

const useCountriesStore = create<CountriesStore>(() => ({
  getAll: () => formattedCountries,
  getByValue: value =>
    formattedCountries.find(country => country.value === value),
}));

export const useCountries = () => {
  const { getAll, getByValue } = useCountriesStore();

  return {
    getAll,
    getByValue,
    countries,
  };
};
