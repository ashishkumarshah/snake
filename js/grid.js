class Snake
{
  constructor (initialXPosition, initialYPosition, obstacleHandler, foodHandler, endGameHandler, eatenHandler, tailMovementHandler, headMovementHandler) {
    this.head = null;
    this.validDirections = ['up', 'right', 'down', 'left'];
    this.obstacleHandler = obstacleHandler;
    this.foodHandler = foodHandler;
    this.endGameHandler = endGameHandler;
    this.eatenHandler = eatenHandler;
    this.tailMovementHandler = tailMovementHandler;
    this.headMovementHandler = headMovementHandler;
    let node = {};
    node.x = initialXPosition;
    node.y = initialYPosition;
    node.next = null;
    this.head = node;
    this.direction = this.validDirections[0];
  }
  moveAhead () {
    let node = {};
    node.x = this.head.x + this.getXOffset();
    node.y = this.head.y + this.getYOffset();   
    node.next = this.head;
    this.head = node;
    
    if (!this.isFood(this.head)) {
      this.notifyHeadMovement(this.head);
      if (this.isDead(this.head)) {
        this.notifyDead();
        return;
      }
      let penultimate = this.head;
      while(penultimate.next.next != null) {
        penultimate = penultimate.next;
      }
      let lastNode = penultimate.next;
      this.notifyTailMovement(lastNode);
      lastNode = null;
      penultimate.next = null;
    } else {
      this.notifyEaten(this.head);
      console.log("Yummy!");
    }
  }
  notifyHeadMovement(node) {
    return this.headMovementHandler(node.x, node.y);
  }
  notifyTailMovement(node) {
    return this.tailMovementHandler(node.x, node.y);
  }
  notifyEaten(head) {
    return this.eatenHandler(head.x, head.y);
  }
  isFood(head) {
    return this.foodHandler(head.x,head.y);
  }
  getXOffset() {
    return 1;
  }
  getYOffset() {
    return 0;
  }
  isDead(head) {
    let obstacle = this.obstacleHandler(head.x, head.y);
    if (!obstacle) {
      return false;
    }
    console.log("Tried to eat "+head.x+ " "+head.y);
    return true;
  }
  notifyDead() {
    this.endGameHandler();
  }
}

class Grid {
  constructor(input) {
    this.grid = Array(input.length).fill([]);
    let rowIter = 0, colIter = 0;
    for (rowIter = 0; rowIter < input.length; rowIter++) {
      this.grid[rowIter] = Array(input[rowIter].length).fill(null);
      for (colIter = 0; colIter < input[rowIter].length; colIter++) {
        if (input[rowIter][colIter] != null && input[rowIter][colIter] === 1) {
          this.grid[rowIter][colIter] = 1;
          this.markObstacle(rowIter, colIter);
        } else if (input[rowIter][colIter] != null && input[rowIter][colIter] === 0) {
          this.grid[rowIter][colIter] = 0;
          this.markFood(rowIter, colIter);
        } else {
          this.grid[rowIter][colIter] = null;
        }
      }
    }
    this.startListeningToDirectionInputs();
    this.snake = new Snake(Math.floor(rowIter/2), Math.floor(colIter/2),this.isObstacle.bind(this), this.isFood.bind(this),this.endGame.bind(this), this.eatenHandler.bind(this), this.tailMovementHandler.bind(this), this.headMovementHandler.bind(this));
    this.headMovementHandler(Math.floor(rowIter/2), Math.floor(colIter/2));
    this.startGame();
  }
  startListeningToDirectionInputs() {
    document.onkeypress = this.arrowKeysHandler.bind(this);
  }
  startGame() {
    console.log("New Game Started");
    this.interval = setInterval(this.handleNextTick.bind(this), 1000);
  }
  handleNextTick(){
    console.log("Next Turn");
    this.snake.moveAhead();
  }
  isObstacle(px,py) {
    let x = px;
    let y = py;
    if (this.grid[x][y] == 1) {
      this.markFatal(px,py);
      return true;
    }
    return false;
  }
  isFood(px,py) {
    let x = px;
    let y = py;
    if (this.grid[x][y] == 0) {
      return true;
    }
    return false;
  }
  endGame () {
    clearInterval(this.interval);
  }
  eatenHandler (px,py) {
    console.log("Ate "+px + " "+ py);
    let cell = document.getElementById(px+'-'+py);
    cell.setAttribute("class", "occupied");
  }
  tailMovementHandler(px,py) {
    console.log("Trail "+px + " "+ py);
    let cell = document.getElementById(px+'-'+py);
    cell.setAttribute("class", "cell");
  }
  headMovementHandler(px,py) {
    console.log("Head Moves to "+px + " "+py);
    let cell = document.getElementById(px+'-'+py);
    cell.setAttribute("class", "occupied");
  }
  markObstacle(px,py) {
    let cell = document.getElementById(px+'-'+py);
    cell.setAttribute("class", "obstacle");
  }
  markFood(px,py) {
    let cell = document.getElementById(px+'-'+py);
    cell.setAttribute("class", "food");
  }
  markFatal(px,py) {
    let cell = document.getElementById(px+'-'+py);
    cell.setAttribute("class", "fatal");
  }
  arrowKeysHandler(event) {
    event = event || window.event;
    console.log(e.keyCode);    
  }
}
export default Grid;