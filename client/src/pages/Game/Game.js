import React from "react";
import Display from "../../components/Display";
import Board from "../../components/Board";
import ControlPanel from "../../components/ControlPanel";
import Instructions from "../../components/Instructions";

// if you win, hit a bomb, or navigate away from page, send game results to the server
// REMOVE EXTRA CONSOLE LOGS
// on loss, show misplaced flags and all bomb locations?

// **IF YOU REVEAL THE LAST SQUARE AND ITS A BOMB BUT YOU ARE AT 0 BOMBS LEFT (by mistakenly flagging wrong square) THE GAME POSTS A WIN AND A LOSS BUT SHOULD JUST BE A LOSS

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
      gameWon: false,
      dataSentToServer: false,
      boardSize: "medium"
    };
  }

  changeBoardSize = (e) => {
    if (this.state.intervalId) return false;
    let chosenSize = e.currentTarget.getAttribute("name");
    console.log(chosenSize);
    if (chosenSize === "small") {
      this.setState({
        rows: 9,
        columns: 9,
        mines: 10,
        boardSize: chosenSize
      });
    } else if (chosenSize === "medium") {
      this.setState({
        rows: 16,
        columns: 16,
        mines: 40,
        boardSize: chosenSize
      });
    } else {
      this.setState({
        rows: 20,
        columns: 24,
        mines: 85,
        boardSize: chosenSize
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
    this.setState({ timeElapsed: this.state.timeElapsed + 1 });
  }

  incrementFlagsPlaced = () => {
    this.setState({ flagsPlaced: this.state.flagsPlaced + 1 });
  }

  decrementFlagsPlaced = () => {
    this.setState({ flagsPlaced: this.state.flagsPlaced - 1 });
  }

  postGameState = (gameWon) => {
    if (!this.props.loggedIn) {
      this.props.setMsg("Game complete. Sign in to track your stats and appear on the leaderboard!");
    }
    
    if (!this.state.dataSentToServer && this.props.loggedIn) {
      let outData = {
        gameStarted: this.state.started,
        timeElapsed: this.state.timeElapsed,
        gameWon: gameWon,
        boardSize: this.state.boardSize
      }

      fetch("/api/results/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(outData)
      })
        .then(r => r.json())
        .then(d => console.log(d))
        .catch(e => console.log(e));
      this.setState({
        dataSentToServer: true
      })
    }
  }

  userWins = () => {
    clearInterval(this.state.intervalId);
    this.setState({
      gameWon: true,
      intervalId: null
    });
    alert("You win!")
    // this is probably(almost certainly) sending the game state without the win
    this.postGameState(true);
  }

  userLoses = () => {
    clearInterval(this.state.intervalId);
    this.setState({
      intervalId: null
    });
    alert("You lost");
    this.postGameState(false);
  }

  stopGame = () => {
    // button to stop the game so they can navigate away from page?
    console.log("stop game called");
  }

  resetBoard = () => {
    if (this.state.intervalId) return console.log("game in progress");
    let r, c, m;
    if (this.state.boardSize === "small") {
      r = 9
      c = 9
      m = 10
    } else if (this.state.boardSize === "large") {
      r = 20
      c = 24
      m = 85
    } else {
      r = 16
      c = 16
      m = 40
    }

    this.setState({
      timeElapsed: 0,
      rows: r,
      columns: c,
      mines: m,
      started: false,
      flagsPlaced: 0,
      intervalId: null,
      gameWon: false,
      dataSentToServer: false,
      boardSize: this.state.boardSize
    });
    this.props.setMsg("");
    console.log("reset board called and theres no intervalid")

  }

  render() {
    const containerStyle = {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-evenly"
    }

    const leftPanelStyle = {
      display: "inline-block"
    }
    const rightPanelStyle = {
      display: "inline-block"
    }
    return (
      <div style={containerStyle}>
        <div id="left-panel" style={leftPanelStyle}>
          <Display
            flagsPlaced={this.state.flagsPlaced}
            mines={this.state.mines}
            timeElapsed={this.state.timeElapsed}
            boardSize={this.state.boardSize}
          />
          <ControlPanel
            changeBoardSize={this.changeBoardSize}
            resetBoard={this.resetBoard}
            stopGame={this.stopGame}
            intervalId={this.state.intervalId}
            boardSize={this.state.boardSize}
            gameStarted={this.state.started}
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
        <div id="right-panel" style={rightPanelStyle}>
          <Instructions />
        </div>


      </div>
    );
  }
}
export default Game;