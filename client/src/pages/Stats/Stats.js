import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

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
    fetch("/api/stats").then(res => {
      return res.json();
    }).then(json => {
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
      <Paper className={this.props.classes.root}>
      <Table className={this.props.classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Board Size</TableCell>
            <TableCell numeric>Wins</TableCell>
            <TableCell numeric>Losses</TableCell>
            <TableCell numeric>Average Time</TableCell>
            <TableCell numeric>Best Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
              <TableRow>
                <TableCell component="th" scope="row">
                  Small
                </TableCell>
                <TableCell numeric>{this.state.smallWins}</TableCell>
                <TableCell numeric>{this.state.smallLosses}</TableCell>
                <TableCell numeric>{this.state.smallTime / this.state.smallWins}</TableCell>
                <TableCell numeric>{this.state.smallBestTime}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Medium
                </TableCell>
                <TableCell numeric>{this.state.mediumWins}</TableCell>
                <TableCell numeric>{this.state.mediumLosses}</TableCell>
                <TableCell numeric>{this.state.mediumTime / this.state.mediumWins}</TableCell>
                <TableCell numeric>{this.state.mediumBestTime}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Large
                </TableCell>
                <TableCell numeric>{this.state.largeWins}</TableCell>
                <TableCell numeric>{this.state.largeLosses}</TableCell>
                <TableCell numeric>{this.state.largeTime / this.state.largeWins}</TableCell>
                <TableCell numeric>{this.state.largeBestTime}</TableCell>
              </TableRow>
         
        </TableBody>
      </Table>
    </Paper>
    )
  }
}

Stats.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Stats);

