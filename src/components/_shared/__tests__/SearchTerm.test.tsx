import * as React from 'react';
import { render } from '@testing-library/react';
import { SearchTerm } from '../SearchTerm';

describe('<SearchTerm />', () => {
  test('renders without crashing with default props', async () => {
    const mockHandleChange = jest.fn();
    const { findByTestId, findAllByTestId } = render(<SearchTerm value="" options={['test', 'demo']} handleChange={ mockHandleChange } />);
    const SEARCH_TERM = await findByTestId('search-term--root');
    const SEARCH_TERM_LABEL = await findByTestId('search-term--label');
    const options = await findAllByTestId('search-term--option');
    
    expect(SEARCH_TERM).toBeInTheDocument();
    expect(SEARCH_TERM_LABEL).toHaveTextContent('Search in:');
    expect(options[0]).toHaveValue('test');
  });

  test('returns null when options is empty', async () => {
    const mockHandleChange = jest.fn();
    const { queryByTestId } = render(<SearchTerm value="" options={[]} handleChange={ mockHandleChange } />);
    const SEARCH_TERM = await queryByTestId('search-term--root');

    expect(SEARCH_TERM).toBeNull();
  });
});