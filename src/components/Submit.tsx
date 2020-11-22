import * as React from 'react';
import { LookupParams } from '../lib/members';

interface Props {
  text: string,
  searchTerm: string,
  searchValue: string,
  handleSubmit(params: LookupParams): void,
  queryUrl: string
}

export const Submit = ({
  text,
  handleSubmit,
  searchTerm,
  searchValue,
  queryUrl,
}: Props) => {
  return (
    <button
      disabled={ searchValue.length === 0 }
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