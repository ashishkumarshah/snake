import Grid from './grid.js';
var gridInput = [
  [1, 1, 1, 1,1,1,1,1,1,1,1],
  [1, null, null,null, null, null, null, null, null, null, 1],
  [1, null, null,null, null, null, null, null, null, null, 1],
  [1, null, null,null, null, null, null, null, null, null, 1],
  [1, null, null,null, null, null, null, null, null, null, 1],
  [1, null, null,null, null, null, null, null, null, null, 1],
  [1, null, null,null, null, null, null, null, null, null, 1],
  [1, null, null,null, null, null, null, null, null, null, 1],
  [1, null, null,null, null, null, null, null, null, null, 1],
  [1, null, null,null, null, null, null, null, null, null, 1],
  [1, null, null,null, null, null, null, null, null, null, 1],
  [1, null, null,null, null, 0, null, null, null, null, 1],
  [1, null, null,null, null, null, null, null, null, null, 1],
  [1, null, null,null, null, null, null, null, null, null, 1],
  [1, null, null,null, null, null, null, null, null, null, 1],
  [1, null, null,null, null, null, null, null, null, null, 1],
  [1, null, null,null, null, null, null, null, null, null, 1],
  [1, null, null,null, null, null, null, null, null, null, 1],
  [1, 1,1,1, 1,1,1,1,1,1,1]
];
var g = new Grid(gridInput);
var leftMovementHandler = g.setLeftAsNextDirection.bind(g);
var rightMovementHandler = g.setRightAsNextDirection.bind(g);
var upMovementHandler = g.setUpAsNextDirection.bind(g);
var downMovementHandler = g.setDownAsNextDirection.bind(g);

document.getElementById('left').addEventListener('click', leftMovementHandler);
document.getElementById('right').addEventListener('click', rightMovementHandler);
document.getElementById('up').addEventListener('click', upMovementHandler);
document.getElementById('down').addEventListener('click', downMovementHandler);