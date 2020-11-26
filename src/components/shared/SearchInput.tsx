import * as React from 'react';

interface Props {
  searchTerm: string,
  value: string,
  list?: string[],
  handleChange(val: string): void
}

export const SearchInput = ({ value, handleChange, searchTerm, list = [] }: Props) => {
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
    <div className="input-wrapper">
      <input
        list="search-input--list"
        name="search-term"
        id="lookup--search-term"
        value={ value }
        onChange={ ({target}) => handleChange(target.value) }
        placeholder={ placeholderText }
      />

      {
        list.length > 0 &&
        <datalist id="search-input--list">
          { list.map(it => <option key={it} value={it} />) }
        </datalist>
      }
    </div>
  );
}