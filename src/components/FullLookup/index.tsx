import * as React from 'react';
import { LookupParams, MemberResponse } from '../../lib/members';

import { SearchInput, SearchTerm } from '../_shared';
import { Submit } from '../_shared/Submit';

import { useLookup } from '../../hooks';
import { constituencyList, mpsList } from '../../_data';

interface FullLookupProps {
  /**
   * text content for the button.
   * @default 'Find your MP'
   * */
  buttonText?: string,
  /**
   * text for the text-input label.
   * @default 'Search for:'
   * */
  inputLabel?: string,
  /**
   * text for the select input label.
   * @default 'Search in:'
   * */
  selectLabel?: string,
  /**
   * the base path for the API. The only reason for providing this
   * prop is so if the API ever changes it's location/url, old versions
   * of this library can still work by passing the new url here.
   * @default 'http://localhost:4545'
   * @todo deploy the API and change this url to point there.
   * */
  queryUrl?: string,
  /**
   * A function that accepts the API response, allows consumers of this component
   * to then use the response however/wherever they want.
   * @param mp - an object from the API
   * */
  callback?(mp: MemberResponse): void,
}


/**
 * The FullLookup component provides a full-featured interface for querying
 * the API. In addition to the normal input and submit button, this component
 * also uses a `<select>` to allow the user to choose in which category they
 * want to search.
 * */
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
  const [searchBy, setSearchBy] = React.useState<string>(options[0]);
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

  return <div className="full-lookup ith--full-lookup">
    <SearchTerm labelText={ selectLabel } options={options} value={searchBy} handleChange={setSearchBy} />
    <SearchInput
      value={ inputValue }
      handleChange={ setInputValue }
      searchTerm={ searchBy }
      list={ lists[searchBy] }
      labelText={ inputLabel }
    />
    <Submit
      text={ buttonText }
      searchTerm={ searchBy }
      searchValue={ inputValue }
      handleSubmit={ handleSubmit }
      queryUrl={ queryUrl }
      isDisabled={ inputValue === '' || loading }
    />
  </div>
}

export default FullLookup;