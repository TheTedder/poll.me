import React, { useState, useEffect } from 'react'

const PollsShow = (props) => {
  const [poll, setPoll] = useState(
    {
      id: null,
      name: '',
      description: '',
      candidates: []
    }
  )

  useEffect( () => {
    fetch(`/api/v1/polls/${props.match.params.id}`, {
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
      if (json.poll){
        setPoll(json.poll)
      }
    })
  }, [])
  
  const candidates = poll.candidates.map( (candidate) => {
    return (
      <div className="grid-x grid-padding-x" key={candidate.id} candidateid={candidate.id} >
        <div className="cell small-12 medium-10">
          <div className="primary-faded callout">
            <h3 className="title" >{candidate.name}</h3>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className="grid-padding-y">
      <div className="grid-x grid-padding-x cell">
        <div className="cell small-12 medium-9 medium-offset-1">
          <div className="callout">
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