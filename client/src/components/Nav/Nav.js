import React from "react";
const Nav = (props) => {
  return (
    <div>
      <button name="game" onClick={props.changePage}>Game</button>
      <button name="signup" onClick={props.changePage}>Signup</button>
      <button name="login" onClick={props.changePage}>login</button>
      <button name="stats" onClick={props.changePage}>Stats</button>
    </div>
  )
}

export default Nav;