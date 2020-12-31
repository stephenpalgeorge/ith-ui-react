import * as React from 'react';
import { useLookup } from '../../hooks';
import { SearchInput, Submit } from '../_shared';

import { constituencyList, mpsList } from '../../_data';
import {
  LookupError,
  LookupParams,
  MemberLookupReturn,
  UseLookupReturn,
} from '../../lib/members';

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
   * A react component that will display when the loading state === true and
   * replace the submit button. If nothing is passed, the component will default
   * to a simple spinner.
   * */
  Loader?: React.ReactNode,
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
  Loader,
  queryUrl = "http://localhost:4545",
  callback,
}) => {
  const lists = {
    constituencies: constituencyList,
    names: mpsList,
  }

  const [error, setError] = React.useState<LookupError|null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>('');

  const handleSumbit = async ({ url = queryUrl, searchFor }: LookupParams) => {
    const type = searchFor.indexOf(',') >= 0 ? 'list' : 'single';
    setLoading(true);
    const [mp, err]: UseLookupReturn = await useLookup({ url, searchBy, searchFor, type });

    if (err) setError(err);
    else if (callback && mp) callback(mp);
    else console.log(mp);

    setLoading(false);
    setInputValue('');
  }

  const handleChange = (value: string): void => {
    setInputValue(value);
    if (error) setError(null);
  }

  return <div className="member-lookup ith--member-lookup" data-testid="member-lookup--root">
    <SearchInput
      value={ inputValue }
      handleChange={ handleChange }
      labelText={ labelText }
      list={ lists[searchBy] }
      searchTerm={ searchBy }
    />

    { (Loader && loading) && Loader }
    { (!Loader && loading) && <div className="loader">Loading...</div> }
    {
      !loading &&
      <Submit
        text={ buttonText }
        searchValue={ inputValue }
        handleSubmit={ handleSumbit }
        queryUrl={ queryUrl }
        isDisabled={ inputValue.length === 0 || loading }
      />
    }

    { error && <p className="ith--lookup-error">
      { error.message }
    </p> }
  </div>
}

export default MemberLookup;
