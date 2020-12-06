import * as React from 'react';
import { render } from '@testing-library/react';
import { SearchInput } from './SearchInput';

import { mpsList } from '../../_data';

describe('<SearchInput />', () => {
  test('renders without crashing with default props', async () => {
    const mockHandleChange = jest.fn();
    const { findByTestId, findAllByTestId } = render(<SearchInput value="" handleChange={ mockHandleChange } list={['test', 'demo']} />);
    const SEARCH_INPUT = await findByTestId('search-input--root');
    const SEARCH_INPUT_FIELD = await findByTestId('search-input--input');
    const SEARCH_INPUT_DATALIST = await findByTestId('search-input--datalist-custom');
    const options = await findAllByTestId('search-input--option');
    
    expect(SEARCH_INPUT).toBeInTheDocument();
    expect(SEARCH_INPUT_FIELD).toHaveAttribute('placeholder', 'search for an MP');
    expect(SEARCH_INPUT_DATALIST).toBeInTheDocument();
    expect(options[0]).toHaveValue('test');
  });

  test('renders the correct placeholder text', async () => {
    const mockHandleChange = jest.fn();
    const { findByTestId } = render(<SearchInput value="" searchTerm="postcodes" handleChange={ mockHandleChange } />);
    const SEARCH_INPUT_FIELD = await findByTestId('search-input--input');

    expect(SEARCH_INPUT_FIELD).toHaveAttribute('placeholder', 'e.g. TW15 1LW');
  });

  test('renders the correct datalist', async () => {
    const mockHandleChange = jest.fn();
    const { findByTestId, findAllByTestId } = render(<SearchInput value="" searchTerm="names" list={ mpsList } handleChange={ mockHandleChange } />);
    const SEARCH_INPUT_DATALIST = await findByTestId('search-input--input');
    const options = await findAllByTestId('search-input--option');

    expect(SEARCH_INPUT_DATALIST).toBeInTheDocument();
    expect(options[0]).toHaveValue('Ms Diane Abbott');
  });
});