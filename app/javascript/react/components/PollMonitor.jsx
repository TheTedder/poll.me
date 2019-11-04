import React, { useState, useEffect } from 'react'
import consumer from "../../channels/consumer"

const PollMonitor = (props) => {
  const [poll, setPoll] = useState(
    {
      name: '',
      description: '',
      links: [],
      candidates: []
    }
  )
  const [channel, setChannel] = useState({})

  useEffect( () => {
    fetch(`/api/v1/polls/${props.match.params.id}`, {
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
      setChannel(consumer.subscriptions.create(
        {
          channel: "ResultChannel",
          id: props.match.params['id']
        },
        {
          connected: () => console.log("CONNECTED"),
          disconnected: () => console.log("DISCONNECTED"),
          received: (data) => {
            console.log(data)
            const index = poll.candidates.findIndex( (candidate) => {
              return candidate.id === data.candidate_id
            })
            console.log("index: " + index.toString())
            let newCandidates = poll.candidates
            newCandidates[index].vote_count = (newCandidates[index].vote_count) + 1
            setPoll(
              {
                ...poll,
                candidates: newCandidates
              }
            )
          }
        }
      ))
    }
  }, [poll.name])

  let link = ''
  if (poll.links.length > 0){
    link = `https://poll-me.herokuapp.com/${poll.links[0].slug}`
  }

  const candidates = poll.candidates.map( (candidate) => {
    return (
      <div className="grid-x grid-padding-x" key={candidate.id} >
        <div className="cell small-12 medium-10">
          <div className="primary-faded callout clearfix">
            <h3 className="inline title" >{candidate.name}</h3>
            <div className="inline float-right text-right">{candidate.vote_count}</div>
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
              <div className="grid-x grid-padding-x">
                <div className="cell small-12 medium-10">
                  <div className="input-group">
                    <input id="linkbox" className="input-group-field" type="text" value={link} readOnly/>
                    <div className="input-group-button">
                      <input type="submit" className="light-grey button" value="Copy" />
                    </div>
                  </div>
                </div>                
              </div>
              {candidates}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PollMonitor