// import React from "react";
// const Infobar = (props) => {
//   const containerStyle = {
//     display: "flex",
//     justifyContent: "space-between"
//   }
//   return (
//     <div style={containerStyle}>
//       <div><p>Current User: {props.username}</p></div>
//       <div><p>{props.msg}</p></div>
//       <button onClick={props.logout}>Logout</button>
//     </div>
//   );
// }

// export default Infobar;

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
          Current User: {props.username}
          </Typography>
          <Typography variant="p" color="inherit" className={classes.grow}>
          {props.msg}
          </Typography>
          <Button color="inherit" onClick={props.logout}>Sign Out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);