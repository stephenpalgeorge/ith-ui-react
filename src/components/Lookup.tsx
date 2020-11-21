import * as React from 'react';

import { SearchInput } from './SearchInput';
import { SearchTerm } from './SearchTerm';
import { Submit } from './Submit';

interface Props {
  handleLookup?(searchBy: string, searchTerm: string): void
}

export const Lookup = ({ handleLookup }: Props) => {
  const options = ['constituencies', 'names', 'posts', 'postcodes'];

  const [inputValue, setInputValue] = React.useState<string>('');
  const [termValue, setTermValue] = React.useState<string>(options[0]);


  const handleSubmit = (searchBy: string, searchFor: string): void => {
    console.log(searchBy, searchFor);
  }

  return <div className="lookup">
    <SearchTerm options={options} value={termValue} handleChange={setTermValue} />
    <SearchInput value={inputValue} handleChange={setInputValue} />
    <Submit
      text="Find your MP"
      searchTerm={ termValue }
      searchValue={ inputValue }
      handleSubmit={ handleLookup || handleSubmit }
    />
  </div>
}
