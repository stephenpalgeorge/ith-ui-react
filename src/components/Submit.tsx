import * as React from 'react';

interface Props {
  text: string,
  searchTerm: string,
  searchValue: string,
  handleSubmit(searchBy: string, searchFor: string): void,
}

export const Submit = ({ text, handleSubmit, searchTerm, searchValue }: Props) => {
  return <button disabled={ searchValue.length === 0 } className="submit" onClick={ () => handleSubmit(searchTerm, searchValue) }>
    { text }
  </button>
}