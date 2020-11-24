import React from 'react'

import { Lookup } from 'ith-ui-react'
import 'ith-ui-react/dist/index.css'

const App = () => {
  const [mpResult, setMpResult] = React.useState(null);
  console.log(mpResult);
  return <Lookup callback={setMpResult} />
}

export default App
