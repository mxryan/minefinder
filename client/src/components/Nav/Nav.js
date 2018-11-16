import React from "react";
const Nav = (props) => {
  return (
    <div>
      <button name="game" onClick={props.changePage}>Game</button>
      <button name="signup" onClick={props.changePage}>Signup</button>
      <button name="welcome" onClick={props.changePage}>Welcome</button>
      <button name="login" onClick={props.changePage}>login</button>
    </div>
  )
}

export default Nav;