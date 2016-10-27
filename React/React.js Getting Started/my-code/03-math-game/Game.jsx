import React from 'react';

class StarsFrame extends React.Component {
  render() {
    const numberOfStars = Math.floor(Math.random()*(10-1) + 1);
    let stars = [];;
    for( let i=0; i<numberOfStars; i++ ) {
      stars.push(
        <span className="glyphicon glyphicon-star"></span>
      );
    }
    
    return (
      <div id='stars-frame'>
        <div className="well">
          {stars}
        </div>
      </div>
    )
  }
  
}
class ButtonFrame extends React.Component {
  render() {
    return (
      <div id='button-frame'>
        <button className="btn btn-primary btn-lg">=</button>
      </div>
    )
  }
}

class AnswerFrame extends React.Component {
  render() {
    return (
      <div id='answer-frame'>
        <div className="well">...</div>
      </div>
    )
  }
}

class NumbersFrame extends React.Component {
  render() {
    let numbers = [];
    for (let i=1; i<=9; i++) {
      numbers.push(
        <div className='number'>{i}</div>
      )
    }
    return (
      <div id='numbers-frame'>
        <div className="well">
          {numbers}
        </div>
      </div>
    )
  }
}

class Game extends React.Component {
  render() {
    return (
      <div is='game'>
        <h2>Play Nine</h2>
        <hr />
        <div className="clearFix">
          <StarsFrame />
          <ButtonFrame />
          <AnswerFrame />
        </div>
        <NumbersFrame />
      </div>
    )
  }
}

export default Game;