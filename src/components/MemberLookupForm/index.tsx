import * as React from 'react';
import { useLookup } from '../../hooks';
import { SearchInput } from '../_shared';

import { constituencyList, mpsList } from '../../_data';
import { MemberLookupReturn } from '../../lib/members';

interface MemberLookupFormProps {
  /**
   * text content for the button.
   * @default 'Find my MP'
   * */
  buttonText?: string,
  /**
   * a function that accepts the return value of the API call.
   * This allows consumers of the component to access and use the data
   * however/wherever they want.
   * @param mp - the response from the API call
   * */
  callback?(mp: MemberLookupReturn): void,
  /**
   * the category in which the input value is to be checked.
   * */
  searchBy: string,
  /**
   * text content for the text-input label.
   * @default 'Search for:'
   * */
  labelText?: string,
  /**
   * the base path for the API. The only reason for providing this
   * prop is so if the API ever changes it's location/url, old versions
   * of this library can still work by passing the new url here.
   * @default 'http://localhost:4545'
   * @todo deploy the API and change this url to point there.
   * */
  queryUrl?: string,
}

/**
 * The MemberLookupForm component provides a simple input and submit button
 * that will query the API and expose the response to a callback function.
 * Consumers of this component can determine how to implement the search by
 * passing in a 'category' to the `seachBy` prop.
 * */
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
    const type = inputValue.indexOf(',') >= 0 ? 'list' : 'single';
    setLoading(true);
    const mp: MemberLookupReturn = await useLookup({ url: queryUrl, searchBy, searchFor: inputValue, type });
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