import * as React from 'react';
import { Member } from '../../lib/members';

import { SearchInput, SearchTerm } from '../_shared';
import { useLookup } from '../../hooks';
import { constituencyList, mpsList } from '../../_data';

interface FullLookupFormProps {
  buttonText? : string,
  inputValueLabel?: string,
  selectLabel?: string,
  queryUrl?: string,
  callback?(mp: Member): void
}

const FullLookupForm: React.FC<FullLookupFormProps> = ({
  buttonText = "Find my MP",
  callback,
  inputValueLabel = 'Search for:',
  selectLabel = 'Search by:',
  queryUrl = 'http://localhost:4545'
}) => {
  const lists = {
    constituencies: constituencyList,
    names: mpsList,
  }

  const [inputValue, setInputValue] = React.useState<string>('');
  const [searchBy, setSearchBy] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);


  const options = ['constituencies', 'names', 'posts', 'postcodes'];
  return <form className="full-lookup-form ith--full-lookup-form" onSubmit={async (e) => {
    e.preventDefault();
    setLoading(true);
    const mp = await useLookup({ url: queryUrl, searchBy, searchFor: inputValue });
    if (callback) callback(mp);
    else console.log(mp);
    setLoading(false);
    setInputValue('');
  }}>
    <SearchTerm labelText={ selectLabel } options={ options } handleChange={ setSearchBy } value={ searchBy } />
    <SearchInput
      searchTerm={ searchBy }
      value={ inputValue }
      handleChange={ setInputValue }
      list={ lists[searchBy] }
      labelText={ inputValueLabel }
    />
    <button className="ith--full-lookup-form__submit-btn" type="submit" disabled={ inputValue === '' || loading }>
      { buttonText }
    </button>
  </form>
}

export default FullLookupForm;