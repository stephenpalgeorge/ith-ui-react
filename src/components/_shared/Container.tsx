import * as React from 'react';

enum Variations {
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
  return  variation === 'main' ? <main className={classes}>{ children }</main> :
          variation === 'section' ? <section className={classes}>{ children }</section> :
          <div className={classes}>{ children }</div>;
}
