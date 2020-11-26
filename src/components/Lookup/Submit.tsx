import * as React from 'react';
import { LookupParams } from '../../lib/members';

interface Props {
  isDisabled?: boolean,
  text: string,
  searchTerm: string,
  searchValue: string,
  handleSubmit(params: LookupParams): void,
  queryUrl: string
}

export const Submit = ({
  isDisabled = false,
  text,
  handleSubmit,
  searchTerm,
  searchValue,
  queryUrl,
}: Props) => {
  return (
    <button
      disabled={ isDisabled }
      className="submit"
      onClick={ () => handleSubmit({
        url: queryUrl,
        searchBy: searchTerm,
        searchFor: searchValue
      })}
    >
      { text }
    </button>
  );
}