import * as React from 'react';
import PropTypes from 'prop-types';
import {
  LookupError,
  LookupParams,
  MemberLookupReturn,
  UseLookupReturn,
} from '../../lib/members';

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
   * an index that selects the 'option' to be used as the initial
   * value of the <select>.
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
  callback?(mp: MemberLookupReturn): void,
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
  defaultOption = 0,
  inputLabel = 'Search for:',
  Loader,
  selectLabel = 'Search in:',
  queryUrl = 'http://localhost:4545'
}) => {
  // the different types of search that can be performed:
  const options = ['constituencies', 'names', 'posts', 'postcodes', 'search'];
  const lists = {
    constituencies: constituencyList,
    names: mpsList,
  }
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<LookupError|null>(null);
  // controlled form variables:
  const [inputValue, setInputValue] = React.useState<string>('');
  const [searchBy, setSearchBy] = React.useState<string>(options[defaultOption]||options[0]);

  // default button click handler, will be overwritten by whatever is
  // passed as the `handleLookup` prop:
  const handleSubmit = async ({ url = queryUrl, searchBy, searchFor }: LookupParams): Promise<any> => {
    const type = searchFor.indexOf(',') >= 0 ? 'list' : 'single';
    setLoading(true);
    const [mp, err]: UseLookupReturn = await useLookup({ url, searchBy, searchFor, type });

    if (err) setError(err);
    else if ((callback && mp)) callback(mp);
    else console.log(mp);

    setLoading(false);
    setInputValue('');
  }

  const handleChange = (value: string): void => {
    setInputValue(value);
    if (error) setError(null);
  }

  return <div className="full-lookup ith--full-lookup" data-testid="full-lookup--root">
    <SearchTerm labelText={ selectLabel } options={options} value={searchBy} handleChange={setSearchBy} />
    <SearchInput
      value={ inputValue }
      handleChange={ handleChange }
      searchTerm={ searchBy }
      list={ lists[searchBy] }
      labelText={ inputLabel }
    />
    { (Loader && loading) && Loader }
    { (!Loader && loading) && <div className="loader">Loading...</div> }
    {
      !loading &&
      <Submit
        text={ buttonText }
        searchTerm={ searchBy }
        searchValue={ inputValue }
        handleSubmit={ handleSubmit }
        queryUrl={ queryUrl }
        isDisabled={ inputValue === '' || loading }
      />
    }

    {
      (error && error.message) && <p className="ith--lookup-error">
        { error.message }
      </p>
    }
  </div>
}

FullLookup.propTypes = {
  buttonText: PropTypes.string,
  defaultOption: PropTypes.number,
  inputLabel: PropTypes.string,
  Loader: PropTypes.node,
  selectLabel: PropTypes.string,
  queryUrl: PropTypes.string,
  callback: PropTypes.func,
}

export default FullLookup;