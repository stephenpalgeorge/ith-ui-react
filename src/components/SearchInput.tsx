import * as React from 'react';

interface Props {
  value: string,
  handleChange(val: string): void
}

export const SearchInput = ({ value, handleChange }: Props) => {
  return (
    <input
      name="search-term"
      id="lookup--search-term"
      value={ value }
      onChange={ ({target}) => handleChange(target.value) }
    />
  );
}