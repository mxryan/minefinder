import React from "react";
const Infobar = (props) => {
  return (
    <div>
      <span>{props.msg}</span>
      <button onClick={props.logout}>Logout</button>
    </div>
  );
}

export default Infobar;