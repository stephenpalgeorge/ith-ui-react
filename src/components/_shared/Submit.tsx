import * as React from 'react';
import { LookupParams } from '../../lib/members';

interface SubmitProps {
  /**
   * a boolean flag used to set the disabled prop of the button.
   * @default false
   * */
  isDisabled?: boolean,
  /**
   * the text content of the button.
   * @default 'Submit'
   * */
  text?: string,
  /**
   * text that denotes the category in which the searchValue will be checked. This
   * value is used as part of the API endpoint url.
   * */
  searchTerm?: string,
  /**
   * text that should be searched for. This value is used as part of the API
   * endpoint url.
   * */
  searchValue: string,
  /**
   * callback function that hits the API.
   * @param params 
   * */
  handleSubmit(params: LookupParams): void,
  /**
   * the base path for the API. This value is used as part of the API endpoint url.
   * */
  queryUrl: string
}

export const Submit: React.FC<SubmitProps> = ({
  isDisabled = false,
  text = "Submit",
  handleSubmit,
  searchTerm,
  searchValue,
  queryUrl,
}) => {
  return (
    <button
      data-testid="submit--button"
      disabled={ isDisabled }
      className="submit"
      onClick={ () => handleSubmit({
        url: queryUrl,
        searchBy: searchTerm ? searchTerm : undefined,
        searchFor: searchValue
      })}
    >
      { text }
    </button>
  );
}