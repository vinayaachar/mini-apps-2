import React from 'react';

const Score = ( {data} ) => {
  return (
    <div style = {{ marginTop: 50 }}>
      {data.map((score, id) => {
        return <span key={id} style= {{marginRight : 10}}> {score} </span>
      })}
    </div>
  )

}


export default Score;