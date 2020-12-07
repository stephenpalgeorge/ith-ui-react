import * as React from 'react';
import { render } from '@testing-library/react';

import { MemberContact } from '../../../lib/members';
import { ContactLink } from '../ContactLink';

const testContactWeb: MemberContact = {
  type: 'test',
  typeDescription: 'test',
  typeId: 1,
  isPreferred: true,
  isWebAddress: true,
  line1: 'https://test.org',
}

const testContactEmail: MemberContact = {
  type: 'test',
  typeDescription: 'test',
  typeId: 1,
  isPreferred: true,
  isWebAddress: false,
  email: 'test@email.com',
  line1: 'https://test.org',
}

const testContactAddress: MemberContact = {
  type: 'test',
  typeDescription: 'test',
  typeId: 1,
  isPreferred: true,
  isWebAddress: false,
  line1: '14 Yemen Road, Yemen',
}

describe('<ContactLink />', () => {
  test('renders without crashing', async () => {
    const { findByTestId } = render(<ContactLink linkObject={ testContactWeb } />);
    const CONTACT_LINK = await findByTestId('contact-link--root');
    expect(CONTACT_LINK).toBeInTheDocument();
  });

  test('correctly renders link to web address', async () => {
    const { findByTestId } = render(<ContactLink linkObject={ testContactWeb } />);
    const CONTACT_LINK = await findByTestId('contact-link--root');
    expect(CONTACT_LINK).toHaveAttribute('href', testContactWeb.line1);
  });

  test('correctly prefers email address', async () => {
    const { findByTestId } = render(<ContactLink linkObject={ testContactEmail } />);
    const CONTACT_LINK = await findByTestId('contact-link--root');
    expect(CONTACT_LINK).toHaveAttribute('href', `mailto:${testContactEmail.email}`);
  });

  test('doesn\'t render on physical address', async () => {
    const { queryByTestId } = render(<ContactLink linkObject={ testContactAddress } />);
    const CONTACT_LINK = await queryByTestId('contact-link--root');
    expect(CONTACT_LINK).toBeNull();
  });
});