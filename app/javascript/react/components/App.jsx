import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PollsIndex from './PollsIndex'

const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={PollsIndex} />
      </Switch>
    </Router>
  )
}

export default App