import * as React from 'react';

interface Props {
  handleChange(val: string): void
  options: string[],
  value: string,
}

export const SearchTerm = ({ handleChange, options, value }: Props) => {
  return <select value={ value } onChange={({target}) => handleChange(target.value)} name="search-term" id="lookup__search-term">
    {
      options.length > 0 &&
      options.map(opt => <option key={opt} value={opt}>{ opt }</option>)
    }
  </select>
}