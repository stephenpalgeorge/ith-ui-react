import * as React from 'react';

import { MemberLookupForm, MemberPage } from 'ith-ui-react';
// import 'ith-ui-react/dist/index.css';

const App = () => {
  const [mpResult, setMpResult] = React.useState(null);
  return <div>
    <MemberLookupForm searchBy="postcodes" callback={ setMpResult } />
    <MemberPage mp={mpResult} />
  </div>;
}

export default App;
