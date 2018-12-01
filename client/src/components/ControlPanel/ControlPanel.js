import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button"
const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
  },

});
const ControlPanel = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography variant="h6">Size </Typography>
      <Button
        name="small"
        onClick={props.changeBoardSize}
        color={props.boardSize === "small" ? "primary" : "default"}
      >
        Small
      </Button>
      <Button
        name="medium"
        onClick={props.changeBoardSize}
        color={props.boardSize === "medium" ? "primary" : "default"}
      >
        Med
      </Button>
      <Button
        name="large"
        onClick={props.changeBoardSize}
        color={props.boardSize === "large" ? "primary" : "default"}
      >
        Large
      </Button>
      &nbsp; &nbsp;
      {props.gameStarted && !props.intervalId
        ? <Button onClick={props.resetBoard}> <i class="fas fa-redo-alt"></i></Button>
        : <span></span>
      }

    </div>
  )
}

ControlPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlPanel);