import React, { useState, useEffect } from 'react'

const PollsShow = (props) => {
  const [poll, setPoll] = useState(
    {
      name: '',
      description: '',
      candidates: [],
    }
  )
  const [valid, setValid] = useState(null)

  useEffect( () => {
    fetch(`/api/v1/links/${props.link}`, {
      headers: {
        'Accept': 'application/json'
      }
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
      if (json.link){
        setPoll(json.link.poll)
        setValid(json.link.valid)
      }
    })
  }, [])

  useEffect( () => {
    if (poll.candidates.length > 0){
      props.cable.subscriptions.create(
        {
          channel: "VoteChannel",
          token: props.link
        },
        {
          connected: () => console.log("CONNECTED"),
          disconnected: () => console.log("DISCONNECTED"),
          received: (data) => {
            console.log(data)
            setValid(data.valid)
          }
        }
      )
    }
  }, [poll])
  
  const handleVote = (event) => {
    event.preventDefault()
    if (valid){
      channel.send(
        {
          candidate_id: event.currentTarget.getAttribute('candidateid')
        }
      )
    }
  }

  const candidates = poll.candidates.map( (candidate) => {
    return (
      <div className="grid-x grid-padding-x" key={candidate.id} candidateid={candidate.id} >
        <div className="cell small-12 medium-10">
          <div className="primary-faded callout clearfix">
            <h3 className="inline title" >{candidate.name}</h3>
            <button type="button" className="inline float-right button" onClick={handleVote} candidateid={candidate.id}>Vote</button>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className="grid-padding-y">
      <div className="grid-x grid-padding-x cell">
        <div className="cell small-12 medium-9 medium-offset-1">
          <div className="secondary callout">
            <div className="grid-padding-y">
              <div className="cell">
                <h2 className="title">{poll.name}</h2>
              </div>
              <p>{poll.description}</p>
              {candidates}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PollsShow