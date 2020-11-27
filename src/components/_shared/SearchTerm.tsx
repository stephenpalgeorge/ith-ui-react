import * as React from 'react';

interface Props {
  handleChange(val: string): void
  options: string[],
  labelText: string,
  value: string,
}

export const SearchTerm = ({ handleChange, options, value, labelText }: Props) => {
  return <div className="input-wrapper">
    <label htmlFor="lookup--search-by">
      { labelText }
    </label>
    <select id="lookup--search-by" value={ value } onChange={({target}) => handleChange(target.value)} name="search-term">
      {
        options.length > 0 &&
        options.map(opt => <option key={opt} value={opt}>{ opt }</option>)
      }
    </select>
  </div>
}