import * as React from 'react';
import { render } from '@testing-library/react';
import { Container, Variations } from './Container';

describe('<Container />', () => {
  test('renders without crashing with default props', async () => {
    const { findByTestId } = render(<Container />);
    const CONTAINER_MAIN = await findByTestId('container--main');
    expect(CONTAINER_MAIN).toBeInTheDocument();
  });

  test('renders as section', async() => {
    const { findByTestId } = render(<Container variation={ Variations.section} />);
    const CONTAINER_SECTION = await findByTestId('container--section');
    expect(CONTAINER_SECTION).toBeInTheDocument();
  });

  test('renders as a div', async () => {
    const { findByTestId } = render(<Container variation={ Variations.div } />);
    const CONTAINER_DIV = await findByTestId('container--div');
    expect(CONTAINER_DIV).toBeInTheDocument();
  });
});