import React from "react";
const Instructions = () => {
  return (
    <div>
      <h4>Instructions:</h4>
      <ul>
        <li>Left click to reveal a tile</li>
        <li>The number in the tile indicates the number of bombs located in adjacent tiles</li>
        <li>Right click to mark the location of the bombs</li>
        <li>You win when you have revealed all the safe tiles and have flagged all the bombs</li>
        <li>**KNOWN BUG: Sometimes you will win but the win function wont trigger. You can unflag and then reflag a tile to trigger it**</li>
      </ul>
      <h4>Some more tips:</h4>
      <ul>
        <li>If you have a tile which contains a number, x, and you have placed x flags around that tile, you can left click that tile to automatically reveal unrevealed tiles adjacent. If you've flagged a wrong tile this will cause you to lose.</li>
        <li>Often games will be solvable entirely through logic, but sometimes you will have no choice but to guess. The larger the board, the more likely it is that you will run into a situation where you have to guess</li>
      </ul>
    </div>
  )
}

export default Instructions;