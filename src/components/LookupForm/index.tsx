import * as React from 'react';
import { Clean_Member, Member } from '../../lib/members';

import { SearchInput, SearchTerm } from '../shared';
import { useSingleLookup } from '../../hooks';
import { constituencyList, mpsList } from '../../_data';

interface Props {
  buttonText? : string,
  queryUrl?: string,
  callback?(mp: Clean_Member|Member): void
}

export const LookupForm = ({
  buttonText = "Find my MP",
  callback,
  queryUrl = 'http://localhost:4545'
}: Props) => {
  const lists = {
    constituencies: constituencyList,
    names: mpsList,
  }
  
  const [input, setInput] = React.useState<string>('');
  const [searchBy, setSearchBy] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);


  const options = ['constituencies', 'names', 'posts', 'postcodes'];
  return <form onSubmit={async (e) => {
    e.preventDefault();
    setLoading(true);
    const mp = await useSingleLookup(queryUrl, searchBy, input);
    if (callback) callback(mp);
    else console.log(mp);
    setLoading(false);
    setInput('');
  }}>
    <SearchTerm options={options} handleChange={setSearchBy} value={searchBy} />
    <SearchInput searchTerm={searchBy} value={input} handleChange={setInput} list={ lists[searchBy] } />
    <button type="submit" disabled={input === '' || loading}>
      { buttonText }
    </button>
  </form>
}