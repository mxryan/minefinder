import React from "react";
import Tile from "../Tile";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardState: this.boardInit(this.props.rows, this.props.columns),
      boardRevealedState: this.boardInit(this.props.rows, this.props.columns)
    }
  }

  checkForWin = (arr) => {
    if (this.props.mines === this.props.flagsPlaced) {
      for (let y = 0; y < this.props.rows; y++) {
        for (let x = 0; x < this.props.columns; x++) {
          if (arr[y][x]) continue;
          return false;
        }
      }
      return true;
    }
    return false
  }

  checkForWinOnFlag = (arr) => {
    if (this.props.mines === this.props.flagsPlaced + 1) {
      for (let y = 0; y < this.props.rows; y++) {
        for (let x = 0; x < this.props.columns; x++) {
          if (arr[y][x]) continue;
          return false;
        }
      }
      return true;
    }
    return false
  }

  handleClick = (e) => {
    // if game is started but interval id is null then the current game is over so dont allow a click
    if (this.props.gameStarted && !this.props.intervalId) return;
    if (!e.target.getAttribute("coords")) return;
    let coords = e.target.getAttribute("coords").split(".");
    const clickedCoords = {
      y: parseInt(coords[0]),
      x: parseInt(coords[1])
    }
    let { x, y } = clickedCoords;
    if (!this.props.gameStarted) {
      this.props.startGame();
      this.setBoard(this.props.rows, this.props.columns, this.props.mines, clickedCoords);
    } else {
      const copyOfBoardState = this.copyBoardState(this.props.rows, this.props.columns);
      const copyOfRevealedState = this.copyRevealedState(this.props.rows, this.props.columns);
      if (!this.state.boardRevealedState[clickedCoords.y][clickedCoords.x]) {
        this.revealTile(clickedCoords, copyOfRevealedState, copyOfBoardState);
        this.setState({
          boardRevealedState: copyOfRevealedState
        });
        if (this.checkForWin(copyOfRevealedState)) {
          this.props.userWins();
        }
      } else if (this.state.boardRevealedState[y][x] === 1 &&
        this.countNeighboringFlags(clickedCoords, copyOfRevealedState) === copyOfBoardState[y][x]) {
        for (let i = -1; i < 2; i++) {
          if (y + i >= this.props.rows || y + i < 0) continue;
          for (let j = -1; j < 2; j++) {
            if (x + j >= this.props.columns || x + j < 0) continue;
            if (copyOfRevealedState[y + i][x + j] === 0) {
              this.revealTile({
                y: y + i,
                x: x + j
              }, copyOfRevealedState, copyOfBoardState)
            }
          }
        }
        this.setState({
          boardRevealedState: copyOfRevealedState
        })
        
      }
    }
  }

  countNeighboringFlags = (coords, copyOfRevealedState) => {
    let { x, y } = coords;
    let flagTally = 0;
    for (let i = -1; i < 2; i++) {
      if (y + i >= this.props.rows || y + i < 0) continue;
      for (let j = -1; j < 2; j++) {
        if (x + j >= this.props.columns || x + j < 0) continue;
        if (copyOfRevealedState[y + i][x + j] === -1) flagTally++;
      }
    }
    return flagTally;
  }

  revealTile = (coords, copyOfRevealedState, copyOfBoardState) => {
    let { y, x } = coords;
    if (copyOfBoardState[y][x] === 99) {
      this.props.userLoses();
    }
    if (copyOfRevealedState[y][x] === 0) {
      copyOfRevealedState[y][x] = 1;
    }
    if (copyOfBoardState[y][x] === 0) {

      for (let i = -1; i < 2; i++) {
        if (y + i >= this.props.rows || y + i < 0) continue;
        for (let j = -1; j < 2; j++) {
          if (x + j >= this.props.columns || x + j < 0) continue;
          if (copyOfRevealedState[y + i][x + j] === 0) {
            this.revealTile({
              y: y + i,
              x: x + j
            }, copyOfRevealedState, copyOfBoardState)
          }
        }
      }
    }

  }

  handleRightClick = (e) => {
    e.preventDefault();
    if (this.props.gameStarted && !this.props.intervalId) return;
    let coords = e.target.getAttribute("coords").split(".");
    const clickedCoords = {
      y: parseInt(coords[0]),
      x: parseInt(coords[1])
    }
    if (this.state.boardRevealedState[clickedCoords.y][clickedCoords.x] === 1) return;
    this.setFlag(clickedCoords);
  }

  setFlag = (coords) => {
    const copyOfRevealedState = this.copyRevealedState(this.props.rows, this.props.columns);
    if (!copyOfRevealedState[coords.y][coords.x]) {
      copyOfRevealedState[coords.y][coords.x] = -1;
      if (this.checkForWinOnFlag(copyOfRevealedState)) {
        this.props.userWins();
      }
      this.props.incrementFlagsPlaced();
    } else {
      copyOfRevealedState[coords.y][coords.x] = 0;
      this.props.decrementFlagsPlaced();
    }
    this.setState({
      boardRevealedState: copyOfRevealedState
    });

  }

  copyBoardState = (rows, columns) => {
    const out = [];
    for (let y = 0; y < rows; y++) {
      let newRow = [];
      for (let x = 0; x < columns; x++) {
        newRow.push(this.state.boardState[y][x]);
      }
      out.push(newRow);
    }
    return out;
  }

  copyRevealedState = (rows, columns) => {
    const out = [];
    for (let y = 0; y < rows; y++) {
      let newRow = [];
      for (let x = 0; x < columns; x++) {
        newRow.push(this.state.boardRevealedState[y][x]);
      }
      out.push(newRow);
    }
    return out;
  }

  boardInit = (rows, columns) => {
    const out = [];
    for (let y = 0; y < rows; y++) {
      let newRow = [];
      for (let x = 0; x < columns; x++) {
        newRow.push(0);
      }
      out.push(newRow);
    }
    return out;

  }

  setBoard = (rows, columns, minesToPlace, clickedCoords) => {
    const boardStateCopy = this.copyBoardState(rows, columns);
    const copyOfRevealedState = this.copyRevealedState(rows, columns);
    this.setFreeSpace(rows, columns, clickedCoords, boardStateCopy);
    this.placeMines(rows, columns, minesToPlace, boardStateCopy);
    this.countNeighboringMines(rows, columns, boardStateCopy);
    this.revealTile(clickedCoords, copyOfRevealedState, boardStateCopy, rows, columns);
    this.setState({
      boardState: boardStateCopy,
      boardRevealedState: copyOfRevealedState
    })
    // reveal clicked area
  }

  setFreeSpace = (rows, columns, clickedCoords, boardStateCopy) => {
    for (let i = -1; i < 2; i++) {
      if (clickedCoords.y + i >= 0 && clickedCoords.y + i < rows) {
        for (let j = -1; j < 2; j++) {
          if (clickedCoords.x + j >= 0 && clickedCoords.x + j < columns) {
            boardStateCopy[clickedCoords.y + i][clickedCoords.x + j] = -1;
          }
        }
      }
    }
  }

  placeMines = (rows, columns, minesToPlace, boardStateCopy) => {
    const oddsOfMinePerTile = minesToPlace / (rows * columns);
    while (true) {
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          if (boardStateCopy[y][x] === 0) {
            if (Math.random() <= oddsOfMinePerTile) {
              boardStateCopy[y][x] = 99;
              minesToPlace--;
              if (!minesToPlace) {
                return true;
              }
            }
          }
        }
      }
    }
  }

  countNeighboringMines = (rows, columns, boardStateCopy) => {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        if (boardStateCopy[y][x] < 1) {
          let coordObj = {
            y: y,
            x: x
          };
          this.countTileNeighbors(rows, columns, coordObj, boardStateCopy)
        }
      }
    }
  }
  countTileNeighbors = (rows, columns, coords, boardStateCopy) => {
    if (boardStateCopy[coords.y][coords.x] === -1) {
      boardStateCopy[coords.y][coords.x] = 0;
    }
    for (let i = -1; i < 2; i++) {
      if (coords.y + i >= 0 && coords.y + i < rows) {
        for (let j = -1; j < 2; j++) {
          if (coords.x + j >= 0 && coords.x + j < columns) {
            // if(i === 0 && j === 0) continue;
            if (boardStateCopy[coords.y + i][coords.x + j] === 99) {
              boardStateCopy[coords.y][coords.x]++;
            }
          }
        }
      }
    }
  }

  preventRightClickMenu = (e) => {
    e.preventDefault();
    return false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.rows !== this.props.rows) {
      this.setState({
        boardState: this.boardInit(this.props.rows, this.props.columns),
        boardRevealedState: this.boardInit(this.props.rows, this.props.columns)
      });
    }
    if (prevProps.gameStarted && !this.props.gameStarted) {
      this.setState({
        boardState: this.boardInit(this.props.rows, this.props.columns),
        boardRevealedState: this.boardInit(this.props.rows, this.props.columns)
      });
    }
  }

  render() {

    const boardStyle = {
      backgroundColor: "rgb(246, 114, 128)",
      display: "grid",
      gridTemplateRows: "repeat(" + this.props.rows + ", 30px)",
      gridTemplateColumns: "repeat(" + this.props.columns + ", 30px)",
      gridGap: "2px"
    };

    const tiles = this.state.boardState.map((row, y) => {
      return row.map((tile, x) => {
        return (
          <Tile
            key={y + "." + x}
            contents={this.state.boardState[y][x]}
            revealed={this.state.boardRevealedState[y][x]}
            handleClick={this.handleClick}
            coords={y + "." + x}
            handleRightClick={this.handleRightClick} />
        );
      })
    });

    return (

      <div id="board" style={boardStyle} onContextMenu={this.preventRightClickMenu}> {tiles} </div>

    );
  }
}
export default Board;