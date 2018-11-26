import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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



const Login = (props) => {
  const { classes } = props;
  return (

    <div className={classes.root}>
      <Typography variant="h4" style={{marginBottom:20}}>LOG IN</Typography>
      <Paper className={classes.container}>

        <TextField
          id="loginUsername"
          label="Username"
          className={classes.textField}
          value={props.loginUsername}
          onChange={props.handleChange}
          margin="normal"
        />

        <TextField
          id="loginPassword"
          label="Password"
          className={classes.textField}
          onChange={props.handleChange}
          value={props.loginPassword}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
        <Button variant="outlined" color="primary" className={classes.button} onClick={props.submitLogin}>
        Log In!
      </Button>
      </Paper>
    </div>
  )
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);