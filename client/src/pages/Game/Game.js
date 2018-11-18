import React from "react";
import Display from "../../components/Display";
import Board from "../../components/Board";
import ControlPanel from "../../components/ControlPanel";

// if you win, hit a bomb, or navigate away from page, send game results to the server
// game size: small 9*9, 10; 16*16, 40; 20*24, 100(questionable density?);
// NEED TO STOP TIMER IN COMPONTENT WILL UNMOUNT LIFECYCLE METHOD OF BOARD BECAUSE MEM LEAK?
// REMOVE EXTRA CONSOLE LOGS
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

  changeBoardSize = (e) => {
    let chosenSize = e.target.getAttribute("name");
    if (chosenSize === "small") {
      this.setState({
        rows: 9,
        columns: 9,
        mines: 10
      });
    } else if (chosenSize === "medium") {
      this.setState({
        rows: 16,
        columns: 16,
        mines: 40
      });
    } else {
      this.setState({
        rows: 20,
        columns: 24,
        mines: 100
      });
    }
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
    fetch("/api/results", {
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
    this.postGameState();
  }

  userLoses = () => {
    clearInterval(this.state.intervalId);
    this.setState({
      intervalId: null
    });
    alert("You lost");
    this.postGameState();
  }

  render() {
    return (
      <div className="container">
        <Display
          flagsPlaced={this.state.flagsPlaced}
          mines={this.state.mines}
          timeElapsed={this.state.timeElapsed}
        />
        <ControlPanel 
          changeBoardSize={this.changeBoardSize}
        />

        <Board 
          rows={this.state.rows}
          columns={this.state.columns}
          mines={this.state.mines}
          gameStarted={this.state.started}
          intervalId={this.state.intervalId}
          startGame={this.startGame}
          incrementFlagsPlaced={this.incrementFlagsPlaced}
          decrementFlagsPlaced={this.decrementFlagsPlaced}
          userWins={this.userWins}
          userLoses={this.userLoses}
          flagsPlaced={this.state.flagsPlaced}
        />

      </div>
    );
  }
}
export default Game;