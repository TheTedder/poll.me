import React, { useState, useEffect } from 'react'
import ThankYou from './ThankYou'

const PollsShow = (props) => {
  const [poll, setPoll] = useState(
    {
      name: '',
      description: '',
      candidates: [],
      open: null,
      votes_per_person: null
    }
  )
  const [page, setPage] = useState(null)
  const [votes, setVotes] = useState([])

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
        if(json.link.poll.open){
          setPoll(json.link.poll)
          if(json.link.valid){
            setPage('show')
          }
        } //TODO: else render results
      }
    })
  }, [])
  
  const handleVote = (event) => {
    setVotes(
      [...votes, Number.parseInt(event.currentTarget.getAttribute('candidateid'))]
    )
  }

  useEffect( () => {
    if (poll.votes_per_person !== null){
      if (votes.length >= poll.votes_per_person){
        fetch('/api/v1/votes',{
          credentials: 'same-origin',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(
            {
              token: props.link,
              vote: {
                candidates: votes
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
        .then( (response) => {
          setPage('thankyou')
        })
      }
    }
  }, [votes.length])

  switch (page) {
    case 'show':
      const candidates = poll.candidates.map( (candidate) => {
        let button
        if (!votes.includes(Number.parseInt(candidate.id))){
          button = <button type="button" className="inline float-right button" onClick={handleVote} candidateid={candidate.id}>Vote</button>
        }
        return (
          <div className="grid-x grid-padding-x" key={candidate.id} candidateid={candidate.id} >
            <div className="cell small-12 medium-10">
              <div className="primary-faded callout clearfix">
                <h3 className="inline title" >{candidate.name}</h3>
                {button}
              </div>
            </div>
          </div>
        )
      })

      return (
        <div className="grid-padding-y">
          <div className="grid-x grid-padding-x cell">
            <div className="cell small-12 medium-9 medium-offset-1">
              <div className="grid-padding-y">
                <div className="cell">
                  <h2 className="white title">{poll.name}</h2>
                </div>
                <p>{poll.description}</p>
                {candidates}
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