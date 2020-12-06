import * as React from 'react';
import PropTypes from 'prop-types';
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
   * an index number that describes the the option to be used as the
   * initial value of the <select>.
   * @default 0
   * */
  defaultOption?: number,
  /**
   * text for the text-input label.
   * @default 'Search for:'
   * */
  inputLabel?: string,
  /**
   * A react component that will display when the loading state === true and
   * replace the submit button. If nothing is passed, the component will default
   * to a simple spinner.
   * */
  Loader?: React.ReactNode,
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
  defaultOption = 0,
  inputLabel = 'Search for:',
  Loader,
  selectLabel = 'Search by:',
  queryUrl = 'http://localhost:4545'
}) => {
  const lists = {
    constituencies: constituencyList,
    names: mpsList,
  }
  const options = ['constituencies', 'names', 'posts', 'postcodes', 'search'];

  const [inputValue, setInputValue] = React.useState<string>('');
  const [searchBy, setSearchBy] = React.useState<string>(options[defaultOption]||options[0]);
  const [loading, setLoading] = React.useState<boolean>(false);


  return <form data-testid="full-lookup-form--root" className="full-lookup-form ith--full-lookup-form" onSubmit={async (e) => {
    e.preventDefault();
    const type = inputValue.indexOf(',') >= 0 ? 'list' : 'single';
    setLoading(true);
    const mp: MemberLookupReturn = await useLookup({ url: queryUrl, searchBy, searchFor: inputValue, type });
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
      labelText={ inputLabel }
    />
    { (Loader && loading) && Loader }
    { (!Loader && loading) && <div className="loader">Loading...</div>}
    {
      !loading &&
      <button className="ith--full-lookup-form__submit-btn" type="submit" disabled={ inputValue === '' || loading }>
        { buttonText }
      </button>
    }
  </form>
}

FullLookupForm.propTypes = {
  buttonText: PropTypes.string,
  defaultOption: PropTypes.number,
  inputLabel: PropTypes.string,
  Loader: PropTypes.node,
  selectLabel: PropTypes.string,
  queryUrl: PropTypes.string,
  callback: PropTypes.func,
}

export default FullLookupForm;