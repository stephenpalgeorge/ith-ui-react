import * as React from 'react';

import { MemberLookupForm, MemberCard } from 'ith-ui-react';
// import 'ith-ui-react/dist/index.css';

const App = () => {
  const [mpResult, setMpResult] = React.useState(null);
  return <div>
    <MemberLookupForm searchBy="postcodes" callback={ setMpResult } />
    <MemberCard showImage={ true } mp={mpResult} />
  </div>;
}

export default App;
