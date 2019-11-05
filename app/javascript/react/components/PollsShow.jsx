import React, { useState, useEffect } from 'react'
import ThankYou from './ThankYou'

const PollsShow = (props) => {
  const [poll, setPoll] = useState(
    {
      name: '',
      description: '',
      candidates: [],
    }
  )
  const [page, setPage] = useState(null)

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
        //TODO: check if poll expired
        setPage('show')
      }
    })
  }, [])
  
  const handleVote = (event) => {
    event.preventDefault()
    fetch('/api/v1/votes',{
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then( (response) => {
      if (response.ok){
        return response
      } else{
        throw new Error(`${response.status} (${response.statusText})`)
      }
    })
    .then( (response) => {
      setPage('thankyou')
    })
  }

  switch (page) {
    case 'show':
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
    case 'thankyou':
      return <ThankYou />
    default:
      return <div></div>
  }
}

export default PollsShow