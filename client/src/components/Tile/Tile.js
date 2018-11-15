import React from "react";

const Tile = (props) => {
  const tileStyleRevealed = {
    fontSize: "14px",
    backgroundColor: "rgb(53,91,123)",
    color: "rgb(248, 177, 149)",
    borderRadius: "1px",
    textAlign: "center"
  }

  const tileStyleUnrevealed = {
    fontSize: "14px",
    backgroundColor: "rgb(248, 177, 149)",
    color: "rgb(248, 177, 149)",
    borderRadius: "1px",
    textAlign: "center"
  }

  let content;
  if (props.revealed === 1) {
    if (props.contents === 99) {
      content = <i class="fas fa-fire"></i>
    } else if (props.contents) {
      content = props.contents
    } else {
      content = ""
    }
  } else if (props.revealed === -1) {
    content = <i className="fas fa-flag" coords={props.coords}></i>
  } else {
    content = "";
  }
  
  return (
    <div 
      style={props.revealed ? tileStyleRevealed : tileStyleUnrevealed}
      onClick={props.handleClick}
      coords={props.coords}
      onContextMenu={props.handleRightClick}
    >{content}</div>
  )
}

export default Tile;