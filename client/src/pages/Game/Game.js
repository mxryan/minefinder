import React from "react";
import Display from "../../components/Display";
import Board from "../../components/Board";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeElapsed: 0,
      rows: 16,
      columns: 16,
      mines: 40,
      started: false,
      flagsPlaced: 0,
      intervalId: null,
      gameWon: false
    };
  }
  startGame = () => {
    this.setState({
      started: true,
      intervalId: setInterval(this.incrementTimeElapsed, 1000)
    })
  }

  incrementTimeElapsed = () => {
    this.setState({timeElapsed: this.state.timeElapsed + 1});
  }

  incrementFlagsPlaced = () => {
    this.setState({flagsPlaced: this.state.flagsPlaced + 1});
  }

  decrementFlagsPlaced = () => {
    this.setState({flagsPlaced: this.state.flagsPlaced - 1});
  }

  postGameState = () => {
    let outData = {
      gameStarted: this.state.gameStarted,
      timeElapsed: this.state.timeElapsed,
      gameWon: this.state.gameWon
    }
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(outData)
    })
      .then(r => r.json())
      .then(d => console.log(d))
      .catch(e => console.log(e));
  }

  userWins = () => {
    clearInterval(this.state.intervalId);
    this.setState({
      gameWon: true,
      intervalId: null
    });
    alert("You win!")
  }

  render() {
    return (
      <div className="container">
        <Display
          flagsPlaced={this.state.flagsPlaced}
          mines={this.state.mines}
          timeElapsed={this.state.timeElapsed}
        />
        <Board 
          rows={this.state.rows}
          columns={this.state.columns}
          mines={this.state.mines}
          gameStarted={this.state.started}
          startGame={this.startGame}
          incrementFlagsPlaced={this.incrementFlagsPlaced}
          decrementFlagsPlaced={this.decrementFlagsPlaced}
          userWins={this.userWins}
          flagsPlaced={this.state.flagsPlaced}
        />

      </div>
    );
  }
}
export default Game;