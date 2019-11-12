import React from 'react'
import { Link } from 'react-router-dom'

const ThankYou = (props) => {
  return (
    <div className="text-center">
      <h2 className="title">Thanks for voting!</h2>
      <p className="lead">Your response has been recorded.</p>
      <Link to='/' className="white primary large button title">Browse Polls</Link>
    </div>
  )
}

export default ThankYou