import React from 'react';

const Events = ({ data }) => {
  return (
    <ul className='list-group mb-4'>
      {data.map(event => (
        <li className='list-group-item'>Date of Event: {event.date} | Summary:  {event.description}</li>
      ))}
    </ul>
  );
}



export default Events;