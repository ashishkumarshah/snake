import Snake from './snake.js';

class Grid {
  constructor(input) {
    this.grid = Array(input.length).fill([]);
    this.nextMove = 40;
    this.speed = 1000;
    this.score = 0;
    this.directions = ['left','up','right','down'];
    this.nextDirection = this.directions[3];
    this.currentDirection = this.nextDirection;
    this.offsetMapping = {
      'up' : {
        'x' : -1,
        'y' : 0
      },
      'down' : {
        'x' : 1,
        'y' : 0
      },
      'left' : {
        'x' : 0,
        'y' : -1
      },
      'right' : {
        'x' : 0,
        'y' : 1
      }
    };
    var rowIter = 0, colIter = 0;
    for (rowIter = 0; rowIter < input.length; rowIter++) {
      this.grid[rowIter] = Array(input[rowIter].length).fill(null);
      for (colIter = 0; colIter < input[rowIter].length; colIter++) {
        if (input[rowIter][colIter] != null && input[rowIter][colIter] === 1) {
          this.markObstacle(rowIter, colIter);
        } else if (input[rowIter][colIter] != null && input[rowIter][colIter] === 0) {
          this.markFood(rowIter, colIter);
        } else {
          this.markEmpty(rowIter, colIter);
        }
      }
    }
    var initialSnakeXPosition = Math.floor(rowIter/2);
    var initialSnakeYPosition = Math.floor(colIter/2);
    this.startGame(initialSnakeXPosition, initialSnakeYPosition);
  }

  arrowKeysHandler(event) {
    event = event || window.event;
    var keyCode = event.keyCode;
    if (keyCode >= 37 && keyCode <=40) {
      this.nextDirection = this.directions[keyCode - 37];
    }
  }

  setLeftAsNextDirection () {
    this.nextDirection = this.directions[0];
  }

  setUpAsNextDirection () {
    this.nextDirection = this.directions[1];
  }

  setRightAsNextDirection () {
    this.nextDirection = this.directions[2];
  }

  setDownAsNextDirection () {
    this.nextDirection = this.directions[3];
  }

  startListeningToDirectionInputs() {
    document.onkeypress = this.arrowKeysHandler.bind(this);
    document.onkeyup = this.arrowKeysHandler.bind(this);
  }

  stopListeningToDirectionInputs() {
    document.onkeypress = null;
    document.onkeyup = null;
  }

  startGame(x,y) {
    console.log("New Game Started");
    this.snake = new Snake(x,y);
    this.handleHeadMovement(x,y);
    this.currentSnakeBody = this.snake.getBody();
    this.startListeningToDirectionInputs();
    setTimeout(this.handleNextTick.bind(this), this.speed);
  }

  endGame () {
    this.stopListeningToDirectionInputs();
    clearInterval(this.interval);
    console.log("End Game");
  }

  handleNextTick() {
    console.log("Evaluating Next Turn");
    var currentHead = this.snake.getHeadPosition();
    var nextOffsets = {};
    if (this.isTurnAllowed()) {
    	nextOffsets = this.offsetMapping[this.nextDirection];
    } else {
    	nextOffsets = this.offsetMapping[this.currentDirection];
    	this.nextDirection = this.currentDirection;
    }
    var nextX = currentHead.x + nextOffsets.x;
    var nextY = currentHead.y + nextOffsets.y;
    if (this.isObstacle(nextX,nextY) || this.isBite(nextX,nextY)) {
      this.endGame();
      return;
    }
    var isFood = this.isFood(nextX, nextY);
    var oldTail = this.snake.getTailPosition();
    this.snake.move(nextX, nextY, isFood);
    this.handleHeadMovement(nextX, nextY);
    if (isFood) {
      this.score = this.score + 1;
      if (this.score % 2 === 0) {
        this.speed = this.speed * 0.9;
      }
      var nextFoodPosition = this.useCSSMagicToChooseNextFoodPositionAtRandom();
      this.markEmpty(nextX,nextY);
      this.markFood(nextFoodPosition.x, nextFoodPosition.y);
      this.handleHeadMovement(nextX, nextY);
    } else {
      this.handleHeadMovement(nextX, nextY);
      this.handleTailMovement(oldTail.x,oldTail.y);
    }
    this.currentSnakeBody = this.snake.getBody();
    this.currentDirection = this.nextDirection;
    setTimeout(this.handleNextTick.bind(this), this.speed);
  }
  
  isTurnAllowed () {
  	switch (this.currentDirection) {
  		case 'up':
  			if (this.nextDirection == 'down') {
  				return false;
  			}
  		break;
  		case 'down':
  			if (this.nextDirection == 'up') {
  				return false;
  			}
  		break;
  		case 'left':
  			if (this.nextDirection == 'right') {
  				return false;
  			}
  		break;
  		case 'right':
  			if (this.nextDirection == 'left') {
  				return false;
  			}
  		break;
  	}
  	return true;
  }



  isObstacle (px,py) {
    if (this.grid[px][py] == 1) {
      return true;
    }
    return false;
  }

  isBite (px,py) {
    var iter;
    var node;
    if (this.currentSnakeBody.length > 1) {
      for (iter = 0; iter < this.currentSnakeBody.length-1; iter++) {
        node = this.currentSnakeBody[iter];
        if (px === node.x && py === node.y) {
          return true;
        }
      }
    }
    return false;
  }

  isFood (px,py) {
    if (this.grid[px][py] == 0) {
      return true;
    }
    return false;
  }

  handleTailMovement(px,py) {
    console.log("Trail "+px + " "+ py);
    var cell = document.getElementById(px+'-'+py);
    cell.setAttribute("class", "cell");
  }

  handleHeadMovement(px,py) {
    console.log("Head Moves to "+px + " "+py);
    var cell = document.getElementById(px+'-'+py);
    cell.setAttribute("class", "occupied");
  }

  useCSSMagicToChooseNextFoodPositionAtRandom () {
    var unoccupiedCells = document.getElementsByClassName("cell");
    var unoccupiedCellsCount = unoccupiedCells.length;
    var randomUnoccupiedCell = Math.floor(Math.random()*unoccupiedCellsCount);
    var nextFoodCellXY = unoccupiedCells[randomUnoccupiedCell].id.split('-');
    var node = {};
    node.x = nextFoodCellXY[0];
    node.y = nextFoodCellXY[1];
    return node;
  }

  setClassForCell(px,py,className) {
    var cell = document.getElementById(px+'-'+py);
    cell.setAttribute("class", className);
  }

  markObstacle(px,py) {
    this.grid[px][py] = 1;
    this.setClassForCell(px,py,"obstacle");
  }

  markFood(px,py) {
    this.grid[px][py] = 0;
    this.setClassForCell(px,py,"food");
  }

  markEmpty(px,py) {
    this.grid[px][py] = null;
    this.setClassForCell(px,py,"cell");
  }
}
export default Grid;
