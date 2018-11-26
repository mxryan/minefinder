import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LeaderBoardTable from "../../components/LeaderBoardTable";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

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
        this.setState({
          jsonResponse: json
        });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.callServer(this.state.boardSize, this.state.chosenMetric);
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h4" style={{marginBottom:20, marginTop:10}}>LEADERBOARD</Typography>
        <Grid
          container
          direction="row"
          justify="space-evenly"
        >

          <Grid sm={5}>
            <div>
              <Paper className={classes.paper}>

                <div>
                  <Typography variant="h6">Control Panel</Typography>
                  <label htmlFor="boardSizeSelector">
                    <Typography variant="p">Board Size:</Typography>
                  </label>
                  <select onChange={this.switchBoardSize} id="boardSizeSelector">
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
                <hr></hr>
                <div>
                  <label htmlFor="metricSelector">
                    <Typography variant="p">Metric:</Typography>
                  </label>
                  <select onChange={this.switchMetric} id="metricSelector">
                    <option value="best_time">Best Time</option>
                    <option value="avg_time">Average Time</option>
                    <option value="win_rate">Win Rate</option>
                  </select>
                </div>

              </Paper>
            </div>
          </Grid>


          <Grid sm={5}>

            <LeaderBoardTable
              boardSize={this.state.boardSize}
              chosenMetric={this.state.chosenMetric}
              userData={this.state.jsonResponse}
            />


          </Grid>
        </Grid>

      </div>
    )
  }
}

Leaderboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Leaderboard);
