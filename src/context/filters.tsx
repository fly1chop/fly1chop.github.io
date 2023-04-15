import { createContext, ReactNode, useContext, useState } from 'react';

type TFiltersContext = {
  filters: string[];
  setFilters: (tag: string) => void;
  resetFilters: () => void;
};

export const FiltersContext = createContext<TFiltersContext | null>(null);
export const useFilters = () => useContext(FiltersContext) as TFiltersContext;

const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setNextFilters] = useState<string[]>([]);

  const setFilters = (tag: string) => {
    if (filters.includes(tag)) {
      setNextFilters(filters.filter(x => x !== tag));
    } else {
      setNextFilters([...filters, tag]);
    }
  };

  const resetFilters = () => {
    setNextFilters([]);
  };
  return (
    <FiltersContext.Provider value={{ filters, setFilters, resetFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};

export default FiltersProvider;
