import React from "react";
const ControlPanel = (props) => {
  return (
    <div>
      Size: &nbsp;
      <button name="small" onClick={props.changeBoardSize}>Small</button>
      <button name="medium" onClick={props.changeBoardSize}>Med</button>
      <button name="large" onClick={props.changeBoardSize}>Large</button>
      &nbsp; &nbsp;
      {props.intervalId
        ? <span></span>
        : <button onClick={props.resetBoard}>Reset Board</button>
      }

    </div>
  )
}

export default ControlPanel;