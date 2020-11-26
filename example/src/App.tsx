import React from 'react'

import { FullLookup } from 'ith-ui-react'
import 'ith-ui-react/dist/index.css'

const App = () => {
  const [mpResult, setMpResult] = React.useState(null);
  console.log(mpResult);
  return <FullLookup callback={setMpResult} />
}

export default App
