import React from "react";
const Infobar = (props) => {
  return (
    <div>
      <button onClick={props.pingServer}>Ping server</button>
      <button onClick={props.printAppState}>Check app state</button>
      <span>{props.msg}</span>
      <button onClick={props.logout}>Logout</button>
    </div>
  );
}

export default Infobar;