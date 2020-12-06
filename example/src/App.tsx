import * as React from 'react';

import { FullLookup, MemberCard, MemberCardsList } from 'ith-ui-react';
// import 'ith-ui-react/dist/index.css';

const App = () => {
  const [mpResult, setMpResult] = React.useState(null);
  return <div>
    <FullLookup buttonText="Search MPs" Loader={<p>I'm loading!!</p>} defaultOption={4} callback={ setMpResult } />
    {
      Array.isArray(mpResult) ?
        <MemberCardsList members={ mpResult } /> :
        <MemberCard mp={mpResult} />
    }
  </div>;
}

export default App;
