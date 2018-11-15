// TO DO: 
// CHANGE FOLDER STRUCTURE WHY THE HELL DO I HAVE COMPONENT FOLDERS WITH INDICES FOR THIS?????
// finish board logic
// display logic
// implement timer
// implement gameover
// implement userWins


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
      intervalId: null
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
        />

      </div>
    );
  }
}
export default Game;