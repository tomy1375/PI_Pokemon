import React from 'react'
import "./cards.styles.css"
import Card from '../card/card.component'

function Cards({ allUsers }) {
  const usersList = Array.isArray(allUsers) ? allUsers : [];

  return (
    <div className='card-list'>
      {usersList.map((user) => (
        <Card key={user.id} user={user} />
      ))}
    </div>
  );
}


export default Cards