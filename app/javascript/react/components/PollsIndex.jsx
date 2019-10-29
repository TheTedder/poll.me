import React from 'react'
import { Link } from 'react-router-dom'

const PollsIndex = (props) => {
  return (
    <div className="grid-y grid-padding-y">
      <div className="grid-x grid-padding-x cell">
        <div className="text-center cell">
          <Link to="/new" className="large title button primary new-poll-button">Create New Poll</Link>
        </div>
      </div>
    </div>
  )
}

export default PollsIndex