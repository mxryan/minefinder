import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function Nav(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

          <Button name="game" onClick={props.changePage}>Game</Button>
          <Button name="signup" onClick={props.changePage}>Signup</Button>
          <Button name="login" onClick={props.changePage}>login</Button>
          <Button name="stats" onClick={props.changePage}>Stats</Button>
          <Button name="leaderboard" onClick={props.changePage}>leaderboard</Button>

        </Toolbar>
      </AppBar>
    </div>
  );
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);