import React, { useState, useEffect } from 'react'

import LinkBoxContainer from './LinkBoxContainer'

const PollMonitor = (props) => {
  const [poll, setPoll] = useState(
    {
      name: '',
      description: '',
      links: [],
      candidates: []
    }
  )

  useEffect( () => {
    fetch(`/api/v1/polls/${props.pollId}`, {
      credentials: 'same-origin',
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
      if(json.poll){
        setPoll(json.poll)
      }
    })
  }, [])

  useEffect( () => {
    if (poll.candidates.length > 0){
      props.cable.subscriptions.create(
        {
          channel: "ResultChannel",
          id: props.pollId
        },
        {
          connected: () => console.log("CONNECTED"),
          disconnected: () => console.log("DISCONNECTED"),
          received: (data) => {
            console.log(data)
            let newCandidates = poll.candidates
            for (const [id, votes] of Object.entries(data)){
              const index = poll.candidates.findIndex( (candidate) => {
                return candidate.id === Number.parseInt(id)
              })
              newCandidates[index].vote_count = votes
            }
            setPoll(
              {
                ...poll,
                candidates: newCandidates
              }
            )
          }
        }
      )
    }
  }, [poll.name])

  const candidates = poll.candidates.map( (candidate) => {
    return (
      <div className="grid-x grid-padding-x" key={candidate.id} >
        <div className="cell small-12 medium-10">
          <div className="candidate-monitor-callout callout clearfix">
            <h3 className="inline title" >{candidate.name}</h3>
            <h3 className="inline float-right text-right">{candidate.vote_count}</h3>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className="grid-x grid-padding-x">
      <div className="cell small-12 medium-9 medium-offset-1">
        <h2 className="title">{poll.name}</h2>
        <p className="lead">{poll.description}</p>
        <LinkBoxContainer links={poll.links} />
        {candidates}
      </div>
    </div>
  )
}

export default PollMonitor