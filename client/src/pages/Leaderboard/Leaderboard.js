import React from "react";
class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardSize: "small",
      chosenMetric: "best_time",
      jsonResponse: null
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
      .then(json => {
        console.log(json);
        this.setState({
          jsonResponse: json
        });
      })
      .catch(err => console.log(err));
  }

  componentDidMount(){
    this.callServer(this.state.boardSize, this.state.chosenMetric);
  }
  componentDidUpdate() {
    console.log(this.state);
  }
  render() {
    let tableRows;
    if (this.state.jsonResponse) {
      tableRows = this.state.jsonResponse.map(record => {
        console.log(this.state.boardSize + "_" + this.state.chosenMetric)
        return (
          <tr>
            <td>
              {record.username}
            </td>
            <td>
              {record[this.state.boardSize + "_" + this.state.chosenMetric]}
            </td>
          </tr>
        )
      })
    } else {
      tableRows = (<div>Could not fetch the data. Try refreshing the browser.</div>)
    }
    return (
      <div>
        <h1>Leaderboard</h1>
        <p>These are the leaderboards</p>
        <label htmlFor="boardSizeSelector">Board size:</label>
        <select onChange={this.switchBoardSize} id="boardSizeSelector">
          <option value="small">small</option>
          <option value="medium">medium</option>
          <option value="large">large</option>
        </select>
        <label htmlFor="metricSelector">Metric: </label>
        <select onChange={this.switchMetric} id="metricSelector">
          <option value="best_time">Best Time</option>
          <option value="avg_time">Average Time</option>
          <option value="win_rate">Win Rate</option>
        </select>

        <p>Chosen board size: {this.state.boardSize}</p>
        <p>Chosen Metric: {this.state.chosenMetric}</p>
        <table>
          <tr>
            <th>User &nbsp; &nbsp; &nbsp;</th>
            <th>{this.state.chosenMetric} - Board Size: {this.state.boardSize}</th>
          </tr>
          {tableRows ? tableRows : "Something went wrong"}
        </table>
      </div>
    )
  }
}

export default Leaderboard;