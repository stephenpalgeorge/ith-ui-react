import * as React from 'react';

import { MemberLookup } from 'ith-ui-react';
// import 'ith-ui-react/dist/index.css';

const App = () => {
  const [mpResult, setMpResult] = React.useState(null);
  console.log(mpResult, setMpResult);
  return <MemberLookup searchBy="postcodes" />;
}

export default App;
