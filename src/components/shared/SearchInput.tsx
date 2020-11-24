import * as React from 'react';

interface Props {
  searchTerm: string,
  value: string,
  handleChange(val: string): void
}

export const SearchInput = ({ value, handleChange, searchTerm }: Props) => {
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
    <input
      name="search-term"
      id="lookup--search-term"
      value={ value }
      onChange={ ({target}) => handleChange(target.value) }
      placeholder={ placeholderText }
    />
  );
}