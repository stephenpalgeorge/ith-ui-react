import * as React from 'react';

import { MemberLookupForm, MemberCard, MemberCardsList } from 'ith-ui-react';
// import 'ith-ui-react/dist/index.css';

const App = () => {
  const [mpResult, setMpResult] = React.useState(null);
  return <div>
    <MemberLookupForm buttonText="Search MPs" searchBy="search" callback={ setMpResult } />
    {
      Array.isArray(mpResult) ?
        <MemberCardsList members={ mpResult } /> :
        <MemberCard mp={mpResult} />
    }
  </div>;
}

export default App;
