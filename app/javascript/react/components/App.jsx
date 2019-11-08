import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import consumer from "../../channels/consumer"
import PollsIndex from './PollsIndex'
import PollsNew from './PollsNew'
import PollsShow from './PollsShow'
import PollMonitor from './PollMonitor'

const App = (props) => {
  const cable = consumer
  return (
    <Router>
      <div className="cell shrink top-bar">
        <div className="top-bar-left">
          <Link to="/"><h1 className="title white">poll.me</h1></Link>
        </div>
      </div>
      <div id="content" className="cell auto cell-block-container">
        <Switch>
          <Route exact path="/" component={PollsIndex} />
          <Route exact path="/new" component={PollsNew} />
          <Route exact path="/:link" render={(props) => <PollsShow cable={cable} link={props.match.params.link} />} />
          <Route exact path="/polls/:id" render={(props) => <PollMonitor cable={cable} pollId={props.match.params.id} />} />
        </Switch>
      </div>
      <footer className="white cell shrink text-center">
        <small>Made by Ted Wollman</small>
      </footer>
    </Router>
  )
}

export default App