import React from "react";

const Display = (props) => {
  return (
    <div id="display-container">
      <h3>Bombs remaining: {props.mines - props.flagsPlaced}</h3>
      <h3>Time Elapsed: {props.timeElapsed}</h3>
    </div>
  )
}

export default Display;