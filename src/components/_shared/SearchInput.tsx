import * as React from 'react';

interface SearchInputProps {
  /**
   * the searchTerm prop determines how the API should be queried - it is the
   * category in which the input value will be checked.
   * */
  searchTerm?: string,
  /**
   * a controlled form field value, which is owned by the state of the parent
   * */
  value: string,
  /**
   * text for the field label, the <label> tag won't render if you pass
   * an empty string.
   * @default 'Type your search:'
   * */
  labelText: string,
  /**
   * An array of terms for the datalist tag. Datalist will not render if
   * this list is empty.
   * @default []
   * */
  list?: string[],
  /**
   * this function should be the state setter of the parent component from
   * the same piece of state as the value prop.
   * @param val = the input value as the user types 
   * */
  handleChange(val: string): void
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  handleChange,
  searchTerm,
  list = [],
  labelText = "Type your search:"
}) => {
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
    case 'search':
      placeholderText += "Stephen";
    default:
      placeholderText = "search for an MP";
  }

  return (
    <div className="ith--search-input">
      {
        labelText.length > 0 &&
        <label htmlFor="ith--search-input__input" className="ith--search-input__label">
          { labelText }
        </label>
      }
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