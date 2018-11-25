import React from 'react';
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


function SimpleTable(props) {
  const { classes } = props;
  let metric;
  if (props.chosenMetric === "best_time") {
    metric = "Best Time";
  } else if (props.chosenMetric === "avg_time") {
    metric = "Average Time";
  } else {
    metric = "Win Rate";
  }
  let rowHolder;
  if (props.userData) {
    rowHolder = props.userData.map(record => {
      return (
        // think about how the data is coming in and then write the map function accordingly
        <TableRow key={record.id}>
          <TableCell component="th" scope="row">
            {record.username}
          </TableCell>
          <TableCell numeric>
            {record[props.boardSize + "_" + props.chosenMetric]}
          </TableCell>

        </TableRow>
      );
    })
  } else {
    rowHolder = (<TableRow>
      <TableCell component="th" scope="row">
            Could not fetch
          </TableCell>
          <TableCell numeric>
            Could not fetch
          </TableCell>
    </TableRow>)
  }
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell numeric>{metric}</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rowHolder}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);