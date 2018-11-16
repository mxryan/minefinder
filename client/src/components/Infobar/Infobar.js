import React from "react";
const Infobar = (props) => {
  return (
    <div>
      <button onClick={props.pingServer}>Ping server</button>
      <span>User info will eventually go on this bar like username, wins,losses,etc?</span>
    </div>
  );
}

export default Infobar;