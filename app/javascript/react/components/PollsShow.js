import React, { useState, useEffect } from 'react'

const PollsShow = (props) => {
  const [poll, setPoll] = useState(
    {
      id: null,
      name: '',
      description: '',
      options: []
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
      setPoll(json.poll)
    })
  }, [])
  
  return (
    <div className="grid-padding-y">
      <div className="grid-x grid-padding-x cell">
        <div className="cell small-12 medium-9 medium-offset-1">
          <div className="primary callout">
            <h2 className="title">title</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PollsShow