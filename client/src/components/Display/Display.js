import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
  },
});

const Display = (props) => {
  const { classes } = props;
  return (
    <div id="display-container" className={classes.root}>
      <Grid container direction="row" justify="space-around">
        <Grid sm={5}>
          <Typography variant="h6">
            Bombs: {props.mines - props.flagsPlaced}
          </Typography >
        </Grid>
        <Grid sm={5}>
          <Typography variant="h6">Time: {props.timeElapsed}
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

Display.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Display);