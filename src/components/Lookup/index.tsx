import * as React from 'react';
import { useLookup } from '../../hooks';
import { SearchInput, Submit } from '../_shared';

import { constituencyList, mpsList } from '../../_data';
import { LookupParams, MemberResponse } from '../../lib/members';

interface Props {
  searchBy: string,
  labelText?: string,
  queryUrl?: string,
  callback?(mp: MemberResponse): void,
}

export const Lookup = ({
  searchBy,
  labelText = "Search for:",
  queryUrl = "http://localhost:4545",
  callback,
}: Props) => {
  const lists = {
    constituencies: constituencyList,
    names: mpsList,
  }

  const [loading, setLoading] = React.useState<boolean>(false);
  const [input, setInput] = React.useState<string>('');

  const handleSumbit = async ({ url = queryUrl, searchFor }: LookupParams) => {
    setLoading(true);
    const mp: MemberResponse = await useLookup({ url, searchBy, searchFor });
    if (callback) callback(mp);
    else console.log(mp);
    setLoading(false);
  }

  console.log(searchBy);

  return <div className="lookup">
    <SearchInput
      value={ input }
      handleChange={ setInput }
      labelText={ labelText }
      list={ lists[searchBy] }
    />

    <Submit
      text="Find my MP"
      searchValue={ input }
      handleSubmit={ handleSumbit }
      queryUrl={ queryUrl }
      isDisabled={ input.length === 0 || loading }
    />
  </div>
}
