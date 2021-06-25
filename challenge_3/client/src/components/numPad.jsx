import React from 'react';
import ReactDom  from 'react-dom';

const Num = ( {data, handleClick} ) => {
  return (
    <div>
      {data.map((num, id) => (
        <button style = {{cursor: 'pointer'}}onClick = {(e) => handleClick(e)} key={id}> {num} </button>
      ))}
    </div>
  )
}


export default Num;