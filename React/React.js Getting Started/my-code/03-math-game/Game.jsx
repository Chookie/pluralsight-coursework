import React from 'react';

// http://bit.ly/s-pcs
var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

class StarsFrame extends React.Component {
  render() {
    // Can't have this here as gets run each time we redraw the component.
//    const numberOfStars = Math.floor(Math.random()*(10-1) + 1);
    let stars = [];
    let numberOfStars = this.props.numberOfStars;
    for( let i=0; i<numberOfStars; i++ ) {
      stars.push(
        <span className="glyphicon glyphicon-star"></span>
      );
    }
    
    return (
      <div id='stars-frame' className='col-xs-5'>
        <div className="well">
          {stars}
        </div>
      </div>
    )
  }
  
}
class ButtonFrame extends React.Component {
  render() {
    let disabled;
    let correct = this.props.correct;
    let button;
    let redraws = this.props.redraws;
    
    switch(correct) {
      case true:
        button = (
          <button className="btn btn-success btn-lg"
                  onClick = {this.props.acceptAnswer} >
            <span className='glyphicon glyphicon-ok'></span>
          </button>
        )
        break;
      case false:
        button = (
          <button className="btn btn-danger btn-lg" >
            <span className='glyphicon glyphicon-remove'></span>
          </button>
        )
        break;
      default:
        disabled = (this.props.selectedNumbers.length == 0);
        button = (
          <button className="btn btn-primary btn-lg" 
                  disabled={disabled}
                  onClick = {this.props.checkAnswer} >
            =
          </button>
        )
    }
    return (
      <div id='button-frame' className='col-xs-2'>
        {button}
        <br /><br />
        <button className='btn btn-warning btn-xs'
                onClick={this.props.redraw}
                disabled = {redraws === 0} >
          <span className='glyphicon glyphicon-refresh'></span>
          &nbsp;
          {redraws}
        </button>
      </div>
    )
  }
}

class AnswerFrame extends React.Component {
  render() {
    let props = this.props;
    let selectedNumbers = props.selectedNumbers.map( function(i) {
      return ( 
        <span onClick={props.unselectNumber.bind(null, i)}>
          {i}
        </span> )
    });
    return (
      <div id='answer-frame' className='col-xs-5'>
        <div className="well">
          {selectedNumbers}
        </div>
      </div>
    )
  }
}

class NumbersFrame extends React.Component {
  render() {
    let numbers = [];
    let className;
    let selectedNumbers = this.props.selectedNumbers;
    let selectNumber = this.props.selectNumber;
    let usedNumbers = this.props.usedNumbers;
    for (let i=1; i<=9; i++) {
      className = 'number selected-' + (selectedNumbers.indexOf(i) >= 0 );
      className += ' used-' + (usedNumbers.indexOf(i) >= 0)
      // Need to use bind to create a closure over i
      // otherwise it will be different at runtime.
      // We are setting onClick to the selectNumber function.
      numbers.push(
//        <div className={className} onClick={selectNumber.bind(null,i)}>{i}</div>
        <div className={className} onClick={ () => selectNumber(i)}>{i}</div>
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

class DoneFrame extends React.Component {
  render() {
    return (
      <div className='well text-center'>
        <h2>{this.props.doneStatus}</h2>
        <button className='btn btn-default'
                onClick = {this.props.resetGame} >
          Play again
        </button>
      </div>
    )
  }
}

let randomNumber = function() {
  return Math.floor(Math.random()*(10-1) + 1)
}

const initialState = {selectedNumbers: [],
                      numberOfStars: randomNumber(),
                      correct: null,
                      usedNumbers: [],
                      redraws: 5,
                      doneStatus: null
                     };

class Game extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    // https://codedump.io/share/9D0ewVQwxh1n/1/react-ref-and-setstate-not-working-with-es6
    // This is an issue in React only
    this.selectNumber = this.selectNumber.bind(this);
    this.unselectNumber = this.unselectNumber.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.acceptAnswer = this.acceptAnswer.bind(this);
    this.redraw = this.redraw.bind(this);
    this.updateDoneStatus = this.updateDoneStatus.bind(this);
    this.possibleSolution = this.possibleSolution.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }
  resetGame() {
    // https://stackoverflow.com/questions/34845650/clearing-state-es6-react
    // Set state does a merge so replace first but need to call setState to 
    // cause a redraw
    this.state = initialState;
    this.setState(initialState);
  }
  selectNumber(clickedNumber) {
    if( this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {
      return; 
    }
    this.setState( { selectedNumbers: this.state.selectedNumbers.concat(clickedNumber),
                     correct: null } );
  }
  unselectNumber(clickedNumber) {
    let selectedNumbers = this.state.selectedNumbers;
    let indexOfNumber = selectedNumbers.indexOf(clickedNumber);
    selectedNumbers.splice(indexOfNumber,1);
    // Also reset correct
    this.setState({selectedNumbers: selectedNumbers,
                   correct: null});
  }
  sumOfSelectedNumbers() {
    return this.state.selectedNumbers.reduce( function(p, n) {
      return p + n;
    }, 0)
  }
  checkAnswer() {
    let correct = (this.state.numberOfStars === this.sumOfSelectedNumbers())
    this.setState({correct: correct});
  }
  acceptAnswer() {
    let usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
    this.setState({
      selectedNumbers: [],
      usedNumbers: usedNumbers,
      correct: null,
      numberOfStars: randomNumber()
    }, function() {
      this.updateDoneStatus();
    })
  }
  redraw() {
    if (this.state.redraws === 0) {
      return;
    }
    this.setState({
      numberOfStars: randomNumber(),
      correct: null,
      selectedNumbers: [],
      redraws: this.state.redraws - 1
    }, function() {
      this.updateDoneStatus();
    })
  }
  possibleSolution() {
    let numberOfStars = this.state.numberOfStars;
    let possibleNumbers = [];
    let usedNumbers = this.state.usedNumbers; 
    
    for (var i=1; i<=9; i++) {
      if (usedNumbers.indexOf(i) < 0) {
        possibleNumbers.push(i);
      }
    }
    
    return possibleCombinationSum(possibleNumbers, numberOfStars);
  }
  updateDoneStatus() {
    if (this.state.usedNumbers.length === 9) {
      this.setState({ doneStatus: 'Done. Nice!'});
      return;
    }
    if (this.state.redraws === 0 && !this.possibleSolution()) {
      this.setState({ doneStatus: 'Game Over!'});
    }
  }
  render() {
    let selectedNumbers = this.state.selectedNumbers;
    let numberOfStars = this.state.numberOfStars;
    let correct = this.state.correct;
    let usedNumbers = this.state.usedNumbers;
    let redraws = this.state.redraws;
    let doneStatus = this.state.doneStatus;
    let bottomFrame;
    
    if (doneStatus) {
      bottomFrame = <DoneFrame  doneStatus = {doneStatus} 
                                resetGame = {this.resetGame} />
    } else {
      bottomFrame = <NumbersFrame selectedNumbers = {selectedNumbers} 
                          selectNumber = {this.selectNumber}
                          usedNumbers = {usedNumbers} />
    }
    
    return (
      <div id='game'>
        <div className="clearFix container-fluid">
          <div className='row'>
            <h2>Play Nine</h2>
            <hr />
          </div>
          <div className="clearFix container-fluid">
          </div>
          <div className='row'>
            <StarsFrame numberOfStars={numberOfStars} />
            <ButtonFrame selectedNumbers = {selectedNumbers}
                         correct = {correct} 
                         redraws = {redraws}
                         checkAnswer = {this.checkAnswer} 
                         acceptAnswer = {this.acceptAnswer} 
                         redraw = {this.redraw} />
            <AnswerFrame selectedNumbers = {selectedNumbers} 
                         unselectNumber = {this.unselectNumber} />
          </div>
          <div className="clearFix container-fluid">
          </div>
          <div className='row'>
            {bottomFrame}
          </div>
        </div>
      </div>
    )
  }
}

export default Game;