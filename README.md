# minefinder
Full stack react/express app and and fully-functional minesweeper clone. 

View the deployed site <a href="https://obscure-dawn-52713.herokuapp.com/">here</a>.

## Tech Stack:
  * MySQL
  * Express
  * React
  * NodeJS
  * PassportJS
  * Material-UI

## Game Instructions

* You are presented with a grid of tiles.
* Start the game by clicking anywhere on the board.
* When you click, "mines" will be randomly placed on the board.
* The goal is to unveil all the tiles without mines and to flag the positions of the tiles that contain mines.
* The numbers on the tiles represent the number of mines located in adjacent squares.
* Left click to unveil a tile, right click to place a flag.
* You win when have revealed all tiles and flagged all mines.
* You lose if you unveil a tile containing a bomb.

## Features
* Every user can view their personal statistics on the stat page
* There are leaderboards for each size board and are calculated by one of three metrics: best time, average time, or win rate.

## Bugs
* Sometimes you will win but the function that registers the win won't trigger. If you unflag an then reflag a tile it should trigger.
* Under very specific circumstances you can end up submitting a loss and a win to the server. This only happens when you were supposed to lose, so take the win as a consolation untill I fix the issue :) .