import * as React from 'react';
import { MemberLookupReturn } from '../../lib/members';

import { SearchInput, SearchTerm } from '../_shared';
import { useLookup } from '../../hooks';
import { constituencyList, mpsList } from '../../_data';

interface FullLookupFormProps {
  /**
   * text content for the submit button.
   * @default 'Find my MP'
   * */
  buttonText? : string,
  /**
   * text for the text-input label.
   * @default 'Search for:'
   * */
  inputValueLabel?: string,
  /**
   * text for the select input label.
   * @default 'Search by:'
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
  callback?(mp: MemberLookupReturn): void
}

/**
 * The FullLookupForm component provides a full-featured form for querying
 * the API. In addition to the normal input and submit button, this component
 * also uses a `<select>` to allow the user to choose in which category they
 * want to search.
 * */
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
    const mp: MemberLookupReturn = await useLookup({ url: queryUrl, searchBy, searchFor: inputValue });
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