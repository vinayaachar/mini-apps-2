import React from 'react';
import ReactDom from 'react-dom';


class Search extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <h2>Hello World</h2>
    )
  }
}


ReactDom.render(<Search />, document.getElementById('root'));
