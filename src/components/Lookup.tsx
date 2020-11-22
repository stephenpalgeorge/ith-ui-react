import * as React from 'react';

import { SearchInput } from './SearchInput';
import { SearchTerm } from './SearchTerm';
import { Submit } from './Submit';

import { useSingleLookup } from '../hooks';

interface Props {
  handleLookup?(searchBy: string, searchTerm: string): void,
  queryUrl?: string
}

export const Lookup = ({ handleLookup, queryUrl = 'http://localhost:4545' }: Props) => {
  // the different types of search that can be performed:
  const options = ['constituencies', 'names', 'posts', 'postcodes'];
  // controlled form variables:
  const [inputValue, setInputValue] = React.useState<string>('');
  const [termValue, setTermValue] = React.useState<string>(options[0]);

  // default button click handler, will be overwritten by whatever is
  // passed as the `handleLookup` prop:
  const handleSubmit = async (searchBy: string, searchFor: string): Promise<any> => {
    console.log(searchBy, searchFor);
    await useSingleLookup(queryUrl, searchBy, searchFor);
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
