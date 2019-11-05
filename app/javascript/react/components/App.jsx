import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import consumer from "../../channels/consumer"
import PollsIndex from './PollsIndex'
import PollsNew from './PollsNew'
import PollsShow from './PollsShow'
import PollMonitor from './PollMonitor'

const App = (props) => {
  const cable = consumer
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PollsIndex} />
        <Route exact path="/new" component={PollsNew} />
        <Route exact path="/:link" render={(props) => <PollsShow cable={cable} link={props.match.params.link} />} />
        <Route exact path="/polls/:id" render={(props) => <PollMonitor cable={cable} pollId={props.match.params.id} />} />
      </Switch>
    </Router>
  )
}

export default App