import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PollsIndex from './PollsIndex'
import PollsNew from './PollsNew'
import PollsShow from './PollsShow'
import PollMonitor from './PollMonitor'

const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PollsIndex} />
        <Route exact path="/new" component={PollsNew} />
        <Route exact path="/:link" component={PollsShow} />
        <Route exact path="/polls/:id" component={PollMonitor} />
      </Switch>
    </Router>
  )
}

export default App