import * as React from 'react';
import { useLookup } from '../../hooks';
import { SearchInput, Submit } from '../_shared';

import { constituencyList, mpsList } from '../../_data';
import { LookupParams, MemberResponse } from '../../lib/members';

interface MemberLookupProps {
  buttonText?: string,
  callback?(mp: MemberResponse): void,
  searchBy: string,
  labelText?: string,
  queryUrl?: string,
}

const MemberLookup: React.FC<MemberLookupProps> = ({
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
  const [inputValue, setInputValue] = React.useState<string>('');

  const handleSumbit = async ({ url = queryUrl, searchFor }: LookupParams) => {
    setLoading(true);
    const mp: MemberResponse = await useLookup({ url, searchBy, searchFor });
    if (callback) callback(mp);
    else console.log(mp);
    setLoading(false);
  }

  return <div className="member-lookup ith--member-lookup">
    <SearchInput
      value={ inputValue }
      handleChange={ setInputValue }
      labelText={ labelText }
      list={ lists[searchBy] }
      searchTerm={ searchBy }
    />

    <Submit
      text={ buttonText }
      searchValue={ inputValue }
      handleSubmit={ handleSumbit }
      queryUrl={ queryUrl }
      isDisabled={ inputValue.length === 0 || loading }
    />
  </div>
}

export default MemberLookup;