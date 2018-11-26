import React from 'react';
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
  },
  button: {
    margin: theme.spacing.unit,
  },
});


const Signup = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography variant="h4" style={{marginBottom:20}}>SIGN UP</Typography>
      <Paper className={classes.container}>

        <TextField
          id="signupUsername"
          label="Username"
          className={classes.textField}
          value={props.signupUsername}
          onChange={props.handleChange}
          margin="normal"
        />

        <TextField
          id="signupPassword"
          label="Password"
          className={classes.textField}
          onChange={props.handleChange}
          value={props.signupPassword}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />

        {/* <label htmlFor="signupUsername">Username</label>
        <input type="text" onChange={props.handleChange} id="signupUsername"></input> */}
        {/* <label htmlFor="signupPassword">Password</label>
        <input type="password" onChange={props.handleChange} id="signupPassword"></input> */}
        <Button variant="outlined" color="primary" className={classes.button} onClick={props.submitSignup}>
        Sign Up!
      </Button>
      </Paper>
    </div>
  )
}


Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);