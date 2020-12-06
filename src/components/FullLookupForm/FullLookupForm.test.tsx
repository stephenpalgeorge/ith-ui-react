import * as React from 'react';
import { render } from '@testing-library/react';
import FullLookupForm from './index';

describe('<FullLookupForm />', () => {
  test('renders without crashing', async () => {
    const { findByTestId } = render(<FullLookupForm />);
    const FULL_LOOKUP_FORM = await findByTestId('full-lookup-form--root');
    expect(FULL_LOOKUP_FORM).toBeInTheDocument();
  });
});