class Snake
{
  constructor (initialXPosition, initialYPosition, obstacleHandler, foodHandler, endGameHandler, eatenHandler, tailMovementHandler, headMovementHandler) {
    this.head = null;
    this.currentDirection = 40;
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
  moveAhead (nextDirection) {
    let node = {};
    if (this.currentDirection) {
      nextDirection = this.setNextDirection(nextDirection);
    }
    node.x = this.head.x + this.getXOffset(nextDirection);
    node.y = this.head.y + this.getYOffset(nextDirection);   
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
  setNextDirection (nextDirection) {
    if(Math.abs(this.currentDirection - nextDirection == 39) == 2) {
      return this.currentDirection;
    } else {
      return nextDirection;
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
  getXOffset(nextDirection) {
    if (nextDirection == 40)
    return 1;
    if (nextDirection == 38) return -1;
    else return 0;
  }
  getYOffset(nextDirection) {
    if (nextDirection == 37) return -1;
    if (nextDirection == 39) return 1;
    else return 0;
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
    this.nextMove = 40;
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
    document.onkeyup = this.arrowKeysHandler.bind(this);
  }
  startGame() {
    console.log("New Game Started");
    this.interval = setInterval(this.handleNextTick.bind(this), 1000);
  }
  handleNextTick(){
    console.log("Next Turn");
    this.snake.moveAhead(this.nextMove);
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
  eatenHandler (px,py) {
    this.grid[px][py] = null;
    console.log("Ate "+px + " "+ py);
    let cell = document.getElementById(px+'-'+py);
    cell.setAttribute("class", "occupied");
    let unoccupiedCells = document.getElementsByClassName("cell");
    let unoccupiedCellsCount = unoccupiedCells.length;
    let randomUnoccupiedCell = Math.floor(Math.random()*unoccupiedCellsCount);
    let nextFoodCellXY = unoccupiedCells[randomUnoccupiedCell].id.split('-');
    this.markFood(nextFoodCellXY[0],nextFoodCellXY[1]);
    
  }
  markObstacle(px,py) {
    let cell = document.getElementById(px+'-'+py);
    cell.setAttribute("class", "obstacle");
  }
  markFood(px,py) {
    this.grid[px][py] = 0;
    let cell = document.getElementById(px+'-'+py);
    cell.setAttribute("class", "food");
  }
  markFatal(px,py) {
    let cell = document.getElementById(px+'-'+py);
    cell.setAttribute("class", "fatal");
  }
  arrowKeysHandler(event) {
    event = event || window.event;
    let keyCode = event.keyCode;
    if (keyCode >= 37 && keyCode <=40) {
      this.nextMove = keyCode;
    }
  }  
}
export default Grid;