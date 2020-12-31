# ith-ui-react

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/ith-ui-react.svg)](https://www.npmjs.com/package/ith-ui-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save ith-ui-react
```

## Usage

This simple example shows the use of a lookup component, and a display component. You could, of course, write your own custom components to render the data that the API returns, but the library provides a couple of pre-built options (in this case, the `<MemberCard />` component).

The `<MemberLookup />` component renders a simple UI that includes a button that will query the In The House API on click with the user input. Passing a callback exposes the return value of the API to the parent component. You could write any function you like to handle the response, but this example shows a common pattern where the resultant MP is stored as local state and then passed off to another component.

```tsx
import React from 'react'

import { MemberCard, MemberLookup, MemberResponse } from 'ith-ui-react'

const App = () => {
  const [member, setMember] = React.useState<MemberResponse | null>(null)

  return (
    <div>
      <MemberCard mp={member} />
      <MemberLookup callback={setMember} searchBy='name' />
    </div>
  )
}
```

## License

MIT © [stephenpalgeorge](https://github.com/stephenpalgeorge)
