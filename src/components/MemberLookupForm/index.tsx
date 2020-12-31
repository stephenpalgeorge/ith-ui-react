import * as React from 'react';
import { useLookup } from '../../hooks';
import { SearchInput } from '../_shared';

import { constituencyList, mpsList } from '../../_data';
import {
  LookupError,
  MemberLookupReturn,
  UseLookupReturn,
} from '../../lib/members';

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
  Loader,
  queryUrl = "http://localhost:4545",
}) => {
  const lists = {
    constituencies: constituencyList,
    names: mpsList,
  }

  const [error, setError] = React.useState<LookupError|null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>('');

  const handleChange = (value: string): void => {
    setInputValue(value);
    if (error) setError(null);
  }

  return <form className="member-lookup-form ith--member-lookup-form" data-testid="member-lookup-form--root" onSubmit={async e => {
    e.preventDefault();
    const type = inputValue.indexOf(',') >= 0 ? 'list' : 'single';
    setLoading(true);
    const [mp, err]: UseLookupReturn = await useLookup({ url: queryUrl, searchBy, searchFor: inputValue, type });
    
    if (err) setError(err);
    else if (callback && mp) callback(mp);
    else console.log(mp);

    setLoading(false);
    setInputValue('');
  }}>
    <SearchInput
      searchTerm={ searchBy }
      value={ inputValue }
      labelText={ labelText }
      handleChange={ handleChange }
      list={ lists[searchBy] }
    />
    
    { (Loader && loading) && Loader }
    { (!Loader && loading) && <div className="loader">Loading...</div>}
    {
      !loading &&
      <button className="ith--member-lookup-form__submit-btn" type="submit" disabled={ inputValue.length === 0 || loading }>
        { buttonText }
      </button>
    }

    { error && <p className="ith--lookup-error">
      { error.message }
    </p> }
  </form>
}

export default MemberLookupForm;