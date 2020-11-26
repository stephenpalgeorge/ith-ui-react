import * as React from 'react';
import { LookupParams, Member, Clean_Member } from '../../lib/members';

import { SearchInput, SearchTerm } from '../shared';
import { Submit } from './Submit';

import { useSingleLookup } from '../../hooks';
import { constituencyList, mpsList } from '../../_data';

interface Props {
  buttonText?: string,
  queryUrl?: string,
  callback?(mp: Clean_Member|Member): void,
}

export const Lookup = ({
  buttonText = 'Find your MP',
  callback,
  queryUrl = 'http://localhost:4545'
}: Props) => {
  // the different types of search that can be performed:
  const options = ['constituencies', 'names', 'posts', 'postcodes'];
  const lists = {
    constituencies: constituencyList,
    names: mpsList,
  }
  // controlled form variables:
  const [inputValue, setInputValue] = React.useState<string>('');
  const [termValue, setTermValue] = React.useState<string>(options[0]);
  const [loading, setLoading] = React.useState<boolean>(false);

  // default button click handler, will be overwritten by whatever is
  // passed as the `handleLookup` prop:
  const handleSubmit = async ({ url = queryUrl, searchBy, searchFor }: LookupParams): Promise<any> => {
    setLoading(true);
    const mp = await useSingleLookup(url, searchBy, searchFor);
    if (callback) callback(mp);
    else console.log(mp);
    setInputValue('');
    setLoading(false);
  }

  return <div className="lookup">
    <SearchTerm options={options} value={termValue} handleChange={setTermValue} />
    <SearchInput value={inputValue} handleChange={setInputValue} searchTerm={ termValue } list={lists[termValue]} />
    <Submit
      text={ buttonText }
      searchTerm={ termValue }
      searchValue={ inputValue }
      handleSubmit={ handleSubmit }
      queryUrl={ queryUrl }
      isDisabled={ inputValue === '' || loading}
    />
  </div>
}
