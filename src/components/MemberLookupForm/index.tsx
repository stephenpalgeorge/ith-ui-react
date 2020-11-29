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
  callback,
  searchBy,
  labelText = "Search for:",
  queryUrl = "http://localhost:4545",
}) => {
  const lists = {
    constituencies: constituencyList,
    names: mpsList,
  }
  const [loading, setLoading] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>('');

  return <form className="member-lookup-form ith--member-lookup-form" onSubmit={async e => {
    e.preventDefault();
    setLoading(true);
    const mp: MemberResponse = await useLookup({ url: queryUrl, searchBy, searchFor: inputValue });
    if (callback) callback(mp);
    else console.log(mp);
    setLoading(false);
    setInputValue('');
  }}>
    <SearchInput
      searchTerm={ searchBy }
      value={ inputValue }
      labelText={ labelText }
      handleChange={ setInputValue }
      list={ lists[searchBy] }
    />
    
    <button className="ith--member-lookup-form__submit-btn" type="submit" disabled={ inputValue.length === 0 || loading }>
      { buttonText }
    </button>
  </form>
}

export default MemberLookupForm;