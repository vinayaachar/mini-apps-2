import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import Events from './components/events.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchData: [],
      pageCount: 0,
      initial: 0,
      count: 10
    }
    this.onChange = this.onChange.bind(this);
    this.send = this.send.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }



  onChange(e) {
    console.log(this.state.searchTerm, e.target.value);
    this.setState({
      searchTerm: e.target.value
    })
  }

  send() {
    axios.get('http://localhost:4000/api', {
      params: {
        search: this.state.searchTerm,
        pageCount: this.state.pageCount,
        initial: this.state.initial
      }
    })
      .then(response => {
        console.log(response.data.data);
        this.setState({
          searchData: response.data.data,
          pageCount: response.data.count
        })
      })
      .catch(err => console.log(err));
  }

  handlePageClick() {
    var offset = this.state.initial + 10;
    this.setState({ initial: offset}, () => {
      this.send();
    })
  }


  render() {
    return (
      <div className='container mt-5'>
        <input value = {this.state.searchTerm} onChange={this.onChange} />
        <button onClick={this.send}> Search </button>
        <Events data={this.state.searchData}/>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.count}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    )
  }
}


ReactDom.render(<Search />, document.getElementById('react-paginate'));
