import * as React from 'react';
import { Member } from '../../lib/members';

import { SearchInput, SearchTerm } from '../_shared';
import { useLookup } from '../../hooks';
import { constituencyList, mpsList } from '../../_data';

interface FullLookupFormProps {
  buttonText? : string,
  inputLabel?: string,
  selectLabel?: string,
  queryUrl?: string,
  callback?(mp: Member): void
}

const FullLookupForm: React.FC<FullLookupFormProps> = ({
  buttonText = "Find my MP",
  callback,
  inputLabel = 'Search for:',
  selectLabel = 'Search by:',
  queryUrl = 'http://localhost:4545'
}) => {
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
    const mp = await useLookup({ url: queryUrl, searchBy, searchFor: input });
    if (callback) callback(mp);
    else console.log(mp);
    setLoading(false);
    setInput('');
  }}>
    <SearchTerm labelText={ selectLabel } options={ options } handleChange={ setSearchBy } value={ searchBy } />
    <SearchInput
      searchTerm={ searchBy }
      value={ input }
      handleChange={ setInput }
      list={ lists[searchBy] }
      labelText={ inputLabel }
    />
    <button type="submit" disabled={ input === '' || loading }>
      { buttonText }
    </button>
  </form>
}

export default FullLookupForm;