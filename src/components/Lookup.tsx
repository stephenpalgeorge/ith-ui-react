import * as React from 'react';
import { LookupParams, Member, Clean_Member } from '../lib/members';

import { SearchInput } from './SearchInput';
import { SearchTerm } from './SearchTerm';
import { Submit } from './Submit';

import { useSingleLookup } from '../hooks';

interface Props {
  queryUrl?: string,
  callback?(mp: Clean_Member|Member): void,
}

export const Lookup = ({ callback, queryUrl = 'http://localhost:4545' }: Props) => {
  // the different types of search that can be performed:
  const options = ['constituencies', 'names', 'posts', 'postcodes'];
  // controlled form variables:
  const [inputValue, setInputValue] = React.useState<string>('');
  const [termValue, setTermValue] = React.useState<string>(options[0]);

  // default button click handler, will be overwritten by whatever is
  // passed as the `handleLookup` prop:
  const handleSubmit = async ({ url = queryUrl, searchBy, searchFor }: LookupParams): Promise<any> => {
    const mp = await useSingleLookup(url, searchBy, searchFor);
    if (callback) callback(mp);
    else console.log(mp);
  }

  return <div className="lookup">
    <SearchTerm options={options} value={termValue} handleChange={setTermValue} />
    <SearchInput value={inputValue} handleChange={setInputValue} searchTerm={ termValue } />
    <Submit
      text="Find your MP"
      searchTerm={ termValue }
      searchValue={ inputValue }
      handleSubmit={ handleSubmit }
      queryUrl={ queryUrl }
    />
  </div>
}
