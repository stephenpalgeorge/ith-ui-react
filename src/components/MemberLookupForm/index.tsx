import * as React from 'react';
import { useLookup } from '../../hooks';
import { SearchInput } from '../_shared';

import { constituencyList, mpsList } from '../../_data';
import { MemberResponse } from '../../lib/members';

interface MemberLookupFormProps {
  buttonText?: string,
  callback?(mp: MemberResponse): void,
  searchBy: string,
  labelText?: string,
  queryUrl?: string,
}

const MemberLookupForm: React.FC<MemberLookupFormProps> = ({
  buttonText = "Find my MP",
  searchBy,
  labelText = "Search for:",
  queryUrl = "http://localhost:4545",
  callback,
}) => {
  const lists = {
    constituencies: constituencyList,
    names: mpsList,
  }

  const [loading, setLoading] = React.useState<boolean>(false);
  const [input, setInput] = React.useState<string>('');

  return <form className="lookup" onSubmit={async e => {
    e.preventDefault();
    setLoading(true);
    const mp: MemberResponse = await useLookup({ url: queryUrl, searchBy, searchFor: input });
    if (callback) callback(mp);
    else console.log(mp);
    setLoading(false);
  }}>
    <SearchInput
      value={ input }
      handleChange={ setInput }
      labelText={ labelText }
      list={ lists[searchBy] }
      searchTerm={ searchBy }
    />

    <button type="submit" disabled={ input.length === 0 || loading }>
      { buttonText }
    </button>
  </form>
}

export default MemberLookupForm;