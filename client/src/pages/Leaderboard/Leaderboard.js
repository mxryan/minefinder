import React from "react";
class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardSize: "small",
      chosenMetric: "best_time"
    }
  }

  switchBoardSize = (e) => {
    this.callServer(e.target.value, this.state.chosenMetric);
    this.setState({
      boardSize: e.target.value
    })
  }

  switchMetric = (e) => {
    this.callServer(this.state.boardSize, e.target.value);
    this.setState({
      chosenMetric: e.target.value
    })
  }

  callServer = (size, metric) => {
    fetch(`/api/leaderboard/${metric}/${size}/`)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h1>Leaderboard</h1>
        <p>These are the leaderboards</p>
        <select onChange={this.switchBoardSize}>
          <option value="small">small</option>
          <option value="medium">medium</option>
          <option value="large">large</option>
        </select>
        <select onChange={this.switchMetric}>
          <option value="best_time">Best Time</option>
          <option value="avg_time">Average Time</option>
          <option value="win_rate">Win Ratio</option>
        </select>

        <p>Chosen board size: {this.state.boardSize}</p>
        <p>Chosen Metric: {this.state.chosenMetric}</p>
        <table>
          <tr>
            <th>User</th>
            <th>Best Time - Board Size: Small</th>
          </tr>
          <tr>
            <td>turtleBoy1</td>
            <td>97</td>
          </tr>
          <tr>
            <td>turtleBoy2</td>
            <td>98</td>
          </tr>
          <tr>
            <td>turtleBoy3</td>
            <td>103</td>
          </tr>
        </table>
      </div>
    )
  }
}

export default Leaderboard;