import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PollsIndex from './PollsIndex'
import PollsNew from './PollsNew'
import PollsShow from './PollsShow'

const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PollsIndex} />
        <Route exact path="/new" component={PollsNew} />
        <Route exact path="/:link" component={PollsShow} />
      </Switch>
    </Router>
  )
}

export default App