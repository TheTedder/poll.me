import React from 'react'

const LinkBoxTile = (props) => {

  const copy = (event) => {
    const inputElement = event.currentTarget.parentElement.parentElement.getElementsByTagName('input')[0]
    navigator.clipboard.writeText(inputElement.value)
  }

  const highlight = (event) => {
    event.currentTarget.select()
  }

  const link = `https://${process.env.APP_URL}/${props.slug}`

  if (props.valid){
    return (
      <div className="input-group cell small-12 medium-10">
        <input className="input-group-field linkbox" type="text" onFocus={highlight} value={link} readOnly/>
        <div className="input-group-button">
          <button type="button" className="primary button" onClick={copy}>Copy</button>
        </div>
      </div>
    )
  } else{
    return (
      <div className="cell small-12 medium-10">
        <input className="linkbox disabled" type="text" value={link} readOnly disabled/>
      </div>
    )
  }
}

export default LinkBoxTile