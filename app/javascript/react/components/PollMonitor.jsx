import React, { useState, useEffect } from 'react'

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

  let link = ''
  if (poll.links.length > 0){
    link = `https://${process.env.APP_URL}/${poll.links[0].slug}`
  }

  const candidates = poll.candidates.map( (candidate) => {
    return (
      <div className="grid-x grid-padding-x" key={candidate.id} >
        <div className="cell small-12 medium-10">
          <div className="primary-faded callout clearfix">
            <h3 className="inline title" >{candidate.name}</h3>
            <h3 className="inline float-right text-right">{candidate.vote_count}</h3>
          </div>
        </div>
      </div>
    )
  })

  const copy = (event) => {
    navigator.clipboard.writeText(document.getElementById('linkbox').value)
  }

  return (
    <div className="grid-x grid-padding-x">
      <div className="cell small-12 medium-9 medium-offset-1">
        <h2 className="title">{poll.name}</h2>
        <p>{poll.description}</p>
        <div className="grid-x grid-padding-x">
          <div className="cell small-12 medium-10">
            <div className="input-group">
              <input id="linkbox" className="input-group-field" type="text" value={link} readOnly/>
              <div className="input-group-button">
                <input type="submit" className="light-grey button" value="Copy" onClick={copy}/>
              </div>
            </div>
          </div>                
        </div>
        {candidates}
      </div>
    </div>
  )
}

export default PollMonitor