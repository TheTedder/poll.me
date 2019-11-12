import React from 'react'

import LinkBoxTile from './LinkBoxTile'

const LinkBoxContainer = (props) => {
  return props.links.map( (link) => {
    return (
      <div className="grid-x grid-padding-x" key={link.id}>
        <LinkBoxTile valid ={link.valid} singleUse={link.single_use} slug={link.slug} />
      </div>
    )
  })
}

export default LinkBoxContainer