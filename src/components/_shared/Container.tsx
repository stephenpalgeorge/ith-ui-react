import * as React from 'react';

enum Variations {
  main = 'main',
  section = 'section',
  div = 'div',
}

interface ContainerProps {
  variation?: Variations,
}

export const Container: React.FC<ContainerProps> = ({ children, variation = 'main' }) => {
  return  variation === 'main' ? <main className="ith--main">{ children }</main> :
          variation === 'section' ? <section className="ith--section">{ children }</section> :
          <div className="ith--page ith--container">{ children }</div>;
}
