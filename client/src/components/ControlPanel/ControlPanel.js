import React from "react";
const ControlPanel = (props) => {
  return (
    <div>
      Board size: &nbsp;
      <button name="small" onClick={props.changeBoardSize}>Small</button>
      <button name="medium" onClick={props.changeBoardSize}>Medium</button>
      <button name="large" onClick={props.changeBoardSize}>Large</button>
    </div>
  )
}

export default ControlPanel;