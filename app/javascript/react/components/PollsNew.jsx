import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'

const PollsNew = (props) => {
  const [newPoll, setNewPoll] = useState(
    {
      name: "New Poll",
      description: "",
      options: ["", ""],
    }
  )
  const [errors, setErrors] = useState({})
  const [votingDeadline, setVotingDeadline] = useState(
    {
      date: '',
      time: ''
    }
  )
  const [redirect, setRedirect] = useState(null)
  
  const now = new Date()
  const currentDate = `${now.getFullYear()}-${_.padStart(now.getMonth() + 1, 2, '0')}-${_.padStart(now.getDate(), 2, '0')}`

  const setDateTime = (event) => {
    setVotingDeadline(
      {
        ...votingDeadline,
        [event.currentTarget.name]: event.currentTarget.value
      }
    )
  }

  const sign = (num) => {
    return num >=0 ? '+' : '-'
  }

  const ISO8601 = (date, time) => {
    let hours = - now.getTimezoneOffset() / 60
    let offset = _.padStart(Math.abs(hours).toFixed(2).replace('.',':'),5,'0')
    return `${date}T${time}:00${sign(hours)}${offset}`
  }

  const handleChange = (event) => {
    if (event.currentTarget.name === "option"){
      let newOptions = newPoll.options
      newOptions[Number.parseInt(event.currentTarget.getAttribute('optionid'))] = event.currentTarget.value
      setNewPoll(
        {
          ...newPoll,
          options: newOptions
        }
      )
    } else{
      setNewPoll(
        {
          ...newPoll,
          [event.currentTarget.name]: event.currentTarget.value
        }
      )
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch('/api/v1/polls', {
      method: 'POST',
      headers: new Headers(
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      ),
      credentials: 'same-origin',
      body: JSON.stringify(
        {
          poll: {
            ...newPoll,
            votingDeadline: votingDeadline.date !== '' &&  votingDeadline.time !== '' ? ISO8601(votingDeadline.date, votingDeadline.time) : null
          }
        }
      )
    })
    .then( (response) => {
      if (response.ok){
        return response
      } else{
        throw new Error(`${response.status} (${response.statusText})`)
      }
    })
    .then( (response) => response.json() )
    .then( (json) => {
      if (json){
        console.log(json)
        if (json.errors){
          setErrors(json.errors)
        }
        if (json.id){
          setRedirect(json.id)
        }
      }
    })
  }

  if (newPoll.options[newPoll.options.length - 1] !== ""){
    setNewPoll(
      {
        ...newPoll,
        options: newPoll.options.concat("")
      }
    )
  }

  if (newPoll.options[newPoll.options.length - 2] === "" && newPoll.options.length > 2){
    setNewPoll(
      {
        ...newPoll,
        options: newPoll.options.slice(0,newPoll.options.length - 1)
      }
    )
  }

  let options = newPoll.options.map( (option, index) => {
    return (
      <li key={index} className="poll-option-item">
        <div className="grid-x">
          <input type="text" className="cell medium-9 large-6 poll-option-field" placeholder={`Option #${index + 1}`} name="option" optionid={index} value={option} onChange={handleChange} />
        </div>
      </li>
    )
  })

  return (
    <div className="grid-padding-y">
      {redirect ? <Redirect to={`/polls/${redirect}`} /> : null}
      <div className="grid-x grid-padding-x cell align-center">
        <div className="primary cell small-12 medium-7">
          <div className="primary callout">
            <form action="/" onSubmit={handleSubmit}>
              <div className="grid-container">
                <div className="grid-x grid-padding-x">
                  <div className="tall cell grid-x grid-padding-x">
                    <input className="poll-name-field cell small-12 medium-6 large-3 title big-input primary stealth-input" type="text" name="name" value={newPoll.name} autoFocus onChange={handleChange}/>
                    <div className="cell small-12 medium-6 large-9">
                      {errors.name ? errors.name.join(', ') : null}
                    </div>
                  </div>
                </div>

                <div className="grid-x grid-padding-x">
                  <textarea className="poll-description-field cell large-9" name="description" value={newPoll.description} placeholder="description here" onChange={handleChange} />
                </div>
                <div>
                  <input type="date" name="date" value={votingDeadline.date} min={currentDate} onChange={setDateTime}/>
                  <input type="time" name="time" value={votingDeadline.time} onChange={setDateTime}/>
                </div>
                <ul>
                  {options}
                </ul>
                <p className="errortext">
                  {errors.candidates ? errors.candidates.join(', ') : null}
                </p>
                <div className="text-center">
                  <input type="submit" className="title button secondary" value="Create Poll" />
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