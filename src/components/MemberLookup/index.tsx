import * as React from 'react';
import { useLookup } from '../../hooks';
import { SearchInput, Submit } from '../_shared';

import { constituencyList, mpsList } from '../../_data';
import { LookupParams, MemberResponse } from '../../lib/members';

interface MemberLookupProps {
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
  callback?(mp: MemberResponse): void,
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
 * The MemberLookup component provides a simple input and search button
 * that will query the API and expose the response to a callback function.
 * Consumers of this component can determine how to implement the search by
 * passing in a 'category' to the `seachBy` prop.
 * */
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