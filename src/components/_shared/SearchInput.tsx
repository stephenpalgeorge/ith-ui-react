import * as React from 'react';

interface Props {
  searchTerm?: string,
  value: string,
  labelText: string,
  list?: string[],
  handleChange(val: string): void
}

export const SearchInput = ({ value, handleChange, searchTerm, list = [], labelText }: Props) => {
  let placeholderText = 'e.g. ';
  switch(searchTerm) {
    case 'constituencies':
      placeholderText += "North Swindon";
      break;
    case 'names':
      placeholderText += "Boris Johnson";
      break;
    case 'posts':
      placeholderText += "Prime Minister";
      break;
    case 'postcodes':
      placeholderText += "TW15 1LW";
      break;
    default:
      placeholderText += "search for an MP";
  }

  return (
    <div className="ith--search-input">
      <label htmlFor="ith--search-input__input" className="ith--search-input__label">
        { labelText }
      </label>
      <input
        className="ith--search-input__input"
        list="search-input--list"
        name="search-term"
        id="lookup--search-input__input"
        value={ value }
        onChange={ ({target}) => handleChange(target.value) }
        placeholder={ placeholderText }
      />

      {
        list.length > 0 &&
        <datalist id="ith--search-input__data-list">
          { list.map(it => <option key={it} value={it} />) }
        </datalist>
      }
    </div>
  );
}