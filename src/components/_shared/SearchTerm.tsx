import * as React from 'react';

interface SearchTermProps {
  /**
   * this function should be the state setter of the parent component from
   * the same piece of state as the value prop.
   * @param val = the input value as the user types
   */
  handleChange(val: string): void
  /**
   * a list of values that will populate the select dropdown. This component will
   * return `null` (and therefore not render) if the options list is empty.
   * @default []
   */
  options?: string[],
  /**
   * Text for the input label. The <label> tag will not render if this prop is
   * an empty string.
   * */
  labelText?: string,
  /**
   * a controlled form field value, which is owned by the parent component's state.
   */
  value: string,
}

export const SearchTerm: React.FC<SearchTermProps> = ({
  handleChange,
  options = [],
  value,
  labelText = 'Search in:',
}) => {
  return options.length > 0 ? <div className="ith--search-select" data-testid="search-term--root">
    {
      labelText.length > 0 &&
      <label data-testid="search-term--label" htmlFor="ith--search-select__select" className="ith--search-select__label">
        { labelText }
      </label>
    }
    <select
      className="ith--search-select__select"
      id="ith--search-select__select"
      data-testid="search-term--select"
      value={ value }
      onChange={({target}) => handleChange(target.value)} name="search-term"
    >
      { options.map(opt => <option data-testid="search-term--option" className="ith--search-select__select--option" key={opt} value={opt}>{ opt }</option>) }
    </select>
  </div> : null;
}