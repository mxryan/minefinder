import React from "react";
class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      smallWins: null,
      smallLosses: null,
      smallTime: null,
      smallBestTime: null,
      mediumWins: null,
      mediumLosses: null,
      mediumTime: null,
      mediumBestTime: null,
      largeWins: null,
      largeLosses: null,
      largeTime: null,
      largeBestTime: null,
    }
  }

  grabDataFromServer = () => {
    console.log("grabDataFromServer called");
    fetch("/api/stats").then(res => {
      return res.json();
    }).then(json => {
      console.log(json);
      this.setState({
      smallWins: json.small_wins,
      smallLosses: json.small_losses,
      smallTime: json.small_time,
      smallBestTime: json.small_best_time,
      mediumWins: json.medium_wins,
      mediumLosses: json.medium_losses,
      mediumTime: json.medium_time,
      mediumBestTime: json.medium_best_time,
      largeWins: json.large_wins,
      largeLosses: json.large_losses,
      largeTime: json.large_time,
      largeBestTime: json.large_best_time
      })
    }).catch(err => {
      console.log(err);
    })
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      this.grabDataFromServer();
    }
  }

  render () {
    return (
      <div>
        <h1>
          Hello I am the Stats page
        </h1>
        <table>
          <tr>
            <th>Board Size &nbsp;&nbsp;&nbsp;</th>
            <th>Wins&nbsp;&nbsp;&nbsp;</th>
            <th>Losses&nbsp;&nbsp;&nbsp;</th>
            <th>Avg Time of a Win&nbsp;&nbsp;&nbsp;</th>
            <th>Best Time</th>
          </tr>
          <tr>
            <th>Small</th>
            <td>{this.state.smallWins}</td>
            <td>{this.state.smallLosses}</td>
            <td>{this.state.smallTime / this.state.smallWins}</td>
            <td>{this.state.smallBestTime}</td>
          </tr>
          <tr>
            <th>medium</th>
            <td>{this.state.mediumWins}</td>
            <td>{this.state.mediumLosses}</td>
            <td>{this.state.mediumTime / this.state.mediumWins}</td>
            <td>{this.state.mediumBestTime}</td>
          </tr>
          <tr>
            <th>large</th>
            <td>{this.state.largeWins}</td>
            <td>{this.state.largeLosses}</td>
            <td>{this.state.largeTime / this.state.largeWins}</td>
            <td>{this.state.largeBestTime}</td>
          </tr>
        </table>
      </div>
    )
  }
}

export default Stats;