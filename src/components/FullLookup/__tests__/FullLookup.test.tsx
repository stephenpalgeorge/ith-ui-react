import * as React from 'react';
import { render } from '@testing-library/react';
import FullLookup from '../index';

describe('<FullLookup />', () => {
  test('renders without crashing', async () => {
    const { findByTestId } = render(<FullLookup />);
    const FULL_LOOKUP = await findByTestId('full-lookup--root');
    expect(FULL_LOOKUP).toBeInTheDocument();
  });

  test('defaultOption prop selects option', async () => {
    const { findByTestId } = render(<FullLookup defaultOption={4} />);
    const SEARCH_TERM = await findByTestId('search-term--select');
    expect(SEARCH_TERM).toHaveValue('search');
  });
});
