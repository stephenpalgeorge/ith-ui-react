import * as React from 'react';
import { render } from '@testing-library/react';
import MemberCard from '../index';

import { testMp } from '../../../_data';

describe('<MemberCard />', () => {
  test('renders without crashing', async () => {
    const { findByTestId } = render(<MemberCard mp={ testMp } />);
    const MEMBER_CARD = await findByTestId('member-card--root');
    expect(MEMBER_CARD).toBeInTheDocument();
  });

  test('doesn\'t render image when showImage === false', async() => {
    const { queryByTestId } = render(<MemberCard mp={ testMp } showImage={ false } />);
    const IMAGE_CONTAINER = queryByTestId('member-card--image-container');
    expect(IMAGE_CONTAINER).toBeNull();
  });
});
