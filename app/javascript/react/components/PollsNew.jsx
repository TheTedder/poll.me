import React, { useState } from 'react'

const PollsNew = (props) => {
  const [newPoll, setNewPoll] = useState(
    {
      name: "New Poll",
      description: ""
    }
  )

  const handleChange = (event) => {
    setNewPoll(
      {
        ...newPoll,
        [event.currentTarget.name]: event.currentTarget.value
      }
    )
  }

  return (
    <div className="grid-y grid-padding-y">
      <div className="grid-x grid-padding-x cell">
        <div className="primary cell small-12 medium-8 medium-offset-2">
          <div className="primary callout">
            <form action="#" onSubmit={event => event.preventDefault()}>
              <div className="grid-container">
                <div className="grid-x grid-padding-x">
                  <input className="cell small-12 medium-6 large-3 title big-input primary stealth-input" type="text" name="name" value={newPoll.name} autoFocus onChange={handleChange}/>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PollsNew