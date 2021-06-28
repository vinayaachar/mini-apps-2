import React from 'react';
import ReactDom  from 'react-dom';
import Num from './components/numPad.jsx';
import Score from './components/score.jsx';
import Total from './components/total.jsx'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numOfPins : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      totalScore: 0,
      totalScore2: 0,
      roundScore: 1,
      frame: 0,
      player1Score: ['Player 1 Score'],
      player2Score: ['Player 2 Score'],
      isPlayer1: true
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  handleClick(e) {
    if (this.state.frame === 1) {
      this.setState({
        isPlayer1: false,
        frame: 0
      })
    } else {
      this.setState({
        frame: this.state.frame + 1
      })
    }
    var score = parseInt(e.target.innerHTML);
    var totalling = parseInt(e.target.innerHTML)
    if (score === 10) {
      score = 'X';
    } else if(score === 0) {
      score = '/'
    }
    var list = this.state.player1Score.concat(score);
    var totalScore = this.state.totalScore + totalling;
    this.setState({
      player1Score: list,
      totalScore: totalScore
    })
  }

  handleClick2(e) {
    if (this.state.frame === 1) {
      this.setState({
        isPlayer1: true,
        frame: 0,
        roundScore: this.state.roundScore + 1
      })
    }else {
      this.setState({
        frame: this.state.frame + 1
      })
    }
    var score = parseInt(e.target.innerHTML);
    var totalling = parseInt(e.target.innerHTML)
    if (score === 10) {
      score = 'X';
    } else if(score === 0) {
      score = '/'
    }
    var list = this.state.player2Score.concat(score);
    var totalScore = this.state.totalScore2 + totalling;
    this.setState({
      player2Score: list,
      totalScore2: totalScore
    })

  }

  newGame(e) {
    this.setState({
      totalScore: 0,
      totalScore2: 0,
      player1Score: ['Player 1 Score'],
      player2Score: ['Player 2 Score'],
      roundScore: 1
    })
  }


  render() {
    return (
      <div>Pick number of bowling pins:
        {this.state.isPlayer1 ?
          <Num
          data = {this.state.numOfPins}
          handleClick = {this.handleClick}
          /> :
            <Num
            data = {this.state.numOfPins}
            handleClick = {this.handleClick2}
          /> }
        <div style = {{marginTop: 10}}>Round: {this.state.roundScore}</div>
        <Score data = {this.state.player1Score}/>
        <div style= {{marginTop: 10}}>Total Score: {this.state.totalScore}</div>
        <Score data = {this.state.player2Score}/>
        <div style= {{marginTop: 10}}>Total Score: {this.state.totalScore2}</div>
        {this.state.roundScore === 10 ?
          <div>The Winner is: {this.state.totalScore > this.state.totalScore2? 'Player 1' : 'Player 2'}</div> : ''}
        {this.state.roundScore === 10 ?
          <button style = {{marginTop: 10}} onClick = {(e) => {this.newGame(e)}} >New Game </button> : ''}
      </div>

    )
  }
}

ReactDom.render(<App />, document.getElementById('root'));

