import React from 'react';

const Events = ({ data }) => {
  return (
    <ul>
      {data.map(event => (
        <li>Date of Event: {event.date} | Summary:  {event.description}</li>
      ))}
    </ul>
  );
}



export default Events;