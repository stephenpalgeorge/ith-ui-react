import * as React from 'react';

export enum Variations {
  main = 'main',
  section = 'section',
  div = 'div',
}

interface ContainerProps {
  /**
   * The variation prop defines the html tag that should be rendered.
   * @default Variations.main
   * */
  variation?: Variations,
}

/**
 * The Container component is a flexible wrapper. It allows for larger components, like
 * MemberPage to be used in a variety of contexts.
 * */
export const Container: React.FC<ContainerProps> = ({ children, variation = Variations.main }) => {
  const classes: string = [`ith--${variation}`, 'ith--page', 'ith--container'].join(', ');
  return  variation === 'main' ? <main className={classes} data-testid="container--main">{ children }</main> :
          variation === 'section' ? <section className={classes} data-testid="container--section">{ children }</section> :
          <div className={classes} data-testid="container--div">{ children }</div>;
}
