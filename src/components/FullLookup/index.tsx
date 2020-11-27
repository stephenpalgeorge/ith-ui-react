import * as React from 'react';
import { LookupParams, MemberResponse } from '../../lib/members';

import { SearchInput, SearchTerm } from '../_shared';
import { Submit } from '../_shared/Submit';

import { useLookup } from '../../hooks';
import { constituencyList, mpsList } from '../../_data';

interface FullLookupProps {
  buttonText?: string,
  inputLabel?: string,
  selectLabel?: string,
  queryUrl?: string,
  callback?(mp: MemberResponse): void,
}

const FullLookup: React.FC<FullLookupProps> = ({
  buttonText = 'Find your MP',
  callback,
  inputLabel = 'Search for:',
  selectLabel = 'Search in:',
  queryUrl = 'http://localhost:4545'
}) => {
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
    const mp = await useLookup({ url, searchBy, searchFor });
    if (callback) callback(mp);
    console.log(mp);
    setInputValue('');
    setLoading(false);
  }

  return <div className="lookup">
    <SearchTerm labelText={ selectLabel } options={options} value={termValue} handleChange={setTermValue} />
    <SearchInput
      value={ inputValue }
      handleChange={ setInputValue }
      searchTerm={ termValue }
      list={ lists[termValue] }
      labelText={ inputLabel }
    />
    <Submit
      text={ buttonText }
      searchTerm={ termValue }
      searchValue={ inputValue }
      handleSubmit={ handleSubmit }
      queryUrl={ queryUrl }
      isDisabled={ inputValue === '' || loading }
    />
  </div>
}

export default FullLookup;