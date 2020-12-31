import * as React from 'react';
import { render } from '@testing-library/react';
import MemberLookup from '../index';

describe('<MemberLookup />', () => {
  test('renders without crashing', async () => {
    const { findByTestId } = render(<MemberLookup searchBy="name" />);
    const MEMBER_LOOKUP = await findByTestId('member-lookup--root');
    expect(MEMBER_LOOKUP).toBeInTheDocument();
  });
});
