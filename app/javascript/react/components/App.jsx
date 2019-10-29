import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PollsIndex from './PollsIndex'
import PollsNew from './PollsNew'

const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PollsIndex} />
        <Route exact path="/new" component={PollsNew} />
      </Switch>
    </Router>
  )
}

export default App