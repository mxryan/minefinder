import React from "react";
const Infobar = (props) => {
  const containerStyle = {
    display: "flex",
    justifyContent: "space-between"
  }
  return (
    <div style={containerStyle}>
      <div><p>Current User: {props.username}</p></div>
      <div><p>{props.msg}</p></div>
      <button onClick={props.logout}>Logout</button>
    </div>
  );
}

export default Infobar;