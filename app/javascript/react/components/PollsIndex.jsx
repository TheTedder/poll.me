import React from 'react'

const PollsIndex = (props) => {
  return (
    <div className="grid-y grid-padding-y">
      <div className="grid-x grid-padding-x cell">
        <div className="text-center cell">
          <a className="large title button alert new-poll-button" href="/new">Create New Poll</a>
        </div>
      </div>
    </div>
  )
}

export default PollsIndex