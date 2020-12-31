import * as React from 'react';
import { render } from '@testing-library/react';
import MemberLookupForm from '../index';

describe('<MemberLookupForm />', () => {
  test('renders without crashing', async () => {
    const { findByTestId } = render(<MemberLookupForm searchBy="name" />);
    const MEMBER_LOOKUP_FORM = await findByTestId('member-lookup-form--root');
    expect(MEMBER_LOOKUP_FORM).toBeInTheDocument();
  });
});
