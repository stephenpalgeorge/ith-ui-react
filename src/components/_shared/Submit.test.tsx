import * as React from 'react';
import { render } from '@testing-library/react';
import { Submit } from './Submit';

describe('<Submit />', () => {
  test('renders without crashing with default props', async () => {
    const mockHandleSubmit = jest.fn();
    const { findByTestId } = render(<Submit searchValue="" queryUrl="https://test.org" handleSubmit={ mockHandleSubmit } />);
    const SUBMIT_BUTTON = await findByTestId('submit--button');

    expect(SUBMIT_BUTTON).toBeInTheDocument();
    expect(SUBMIT_BUTTON).toHaveTextContent('Submit');
  });
});