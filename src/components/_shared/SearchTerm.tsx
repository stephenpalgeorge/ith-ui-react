import * as React from 'react';

interface Props {
  handleChange(val: string): void
  options: string[],
  labelText: string,
  value: string,
}

export const SearchTerm = ({ handleChange, options, value, labelText }: Props) => {
  return <div className="ith--search-select">
    <label htmlFor="ith--search-select__select" className="ith--search-select__label">
      { labelText }
    </label>
    <select
      className="ith--search-select__select"
      id="ith--search-select__select"
      value={ value }
      onChange={({target}) => handleChange(target.value)} name="search-term"
    >
      {
        options.length > 0 &&
        options.map(opt => <option className="ith--search-select__select--option" key={opt} value={opt}>{ opt }</option>)
      }
    </select>
  </div>
}