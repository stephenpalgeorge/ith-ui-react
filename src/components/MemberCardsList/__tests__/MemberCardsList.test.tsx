import * as React from 'react';
import { render } from '@testing-library/react';
import MemberCardsList from '../index';

import { testMp } from '../../../_data';

describe('<MemberCardsList />', () => {
  test('renders without crashing with default props', async () => {
    const { findByTestId } = render(<MemberCardsList members={[ testMp ]} />);
    const MEMBER_CARD_LIST = await findByTestId('container--main');
    expect(MEMBER_CARD_LIST).toBeInTheDocument();
  });
});
