import React from 'react'
import "./cards.styles.css"
import Card from '../card/card.component'

function Cards() {
  return (
    <div className='card-list'>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
    </div>
  )
}

export default Cards