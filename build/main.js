/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _grid = __webpack_require__(1);

var _grid2 = _interopRequireDefault(_grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gridInput = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, null, null, null, null, null, null, null, null, null, 1], [1, null, null, null, null, null, null, null, null, null, 1], [1, null, null, null, null, null, null, null, null, null, 1], [1, null, null, null, null, null, null, null, null, null, 1], [1, null, null, null, null, null, null, null, null, null, 1], [1, null, null, null, null, null, null, null, null, null, 1], [1, null, null, null, null, null, null, null, null, null, 1], [1, null, null, null, null, null, null, null, null, null, 1], [1, null, null, null, null, null, null, null, null, null, 1], [1, null, null, null, null, null, null, null, null, null, 1], [1, null, null, null, null, 0, null, null, null, null, 1], [1, null, null, null, null, null, null, null, null, null, 1], [1, null, null, null, null, null, null, null, null, null, 1], [1, null, null, null, null, null, null, null, null, null, 1], [1, null, null, null, null, null, null, null, null, null, 1], [1, null, null, null, null, null, null, null, null, null, 1], [1, null, null, null, null, null, null, null, null, null, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
var g = new _grid2.default(gridInput);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Snake = function () {
  function Snake(initialXPosition, initialYPosition, obstacleHandler, foodHandler, endGameHandler, eatenHandler, tailMovementHandler, headMovementHandler) {
    _classCallCheck(this, Snake);

    this.head = null;
    this.validDirections = ['up', 'right', 'down', 'left'];
    this.obstacleHandler = obstacleHandler;
    this.foodHandler = foodHandler;
    this.endGameHandler = endGameHandler;
    this.eatenHandler = eatenHandler;
    this.tailMovementHandler = tailMovementHandler;
    this.headMovementHandler = headMovementHandler;
    var node = {};
    node.x = initialXPosition;
    node.y = initialYPosition;
    node.next = null;
    this.head = node;
    this.direction = this.validDirections[0];
  }

  _createClass(Snake, [{
    key: 'moveAhead',
    value: function moveAhead() {
      var node = {};
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
        var penultimate = this.head;
        while (penultimate.next.next != null) {
          penultimate = penultimate.next;
        }
        var lastNode = penultimate.next;
        this.notifyTailMovement(lastNode);
        lastNode = null;
        penultimate.next = null;
      } else {
        this.notifyEaten(this.head);
        console.log("Yummy!");
      }
    }
  }, {
    key: 'notifyHeadMovement',
    value: function notifyHeadMovement(node) {
      return this.headMovementHandler(node.x, node.y);
    }
  }, {
    key: 'notifyTailMovement',
    value: function notifyTailMovement(node) {
      return this.tailMovementHandler(node.x, node.y);
    }
  }, {
    key: 'notifyEaten',
    value: function notifyEaten(head) {
      return this.eatenHandler(head.x, head.y);
    }
  }, {
    key: 'isFood',
    value: function isFood(head) {
      return this.foodHandler(head.x, head.y);
    }
  }, {
    key: 'getXOffset',
    value: function getXOffset() {
      return 1;
    }
  }, {
    key: 'getYOffset',
    value: function getYOffset() {
      return 0;
    }
  }, {
    key: 'isDead',
    value: function isDead(head) {
      var obstacle = this.obstacleHandler(head.x, head.y);
      if (!obstacle) {
        return false;
      }
      console.log("Tried to eat " + head.x + " " + head.y);
      return true;
    }
  }, {
    key: 'notifyDead',
    value: function notifyDead() {
      this.endGameHandler();
    }
  }]);

  return Snake;
}();

var Grid = function () {
  function Grid(input) {
    _classCallCheck(this, Grid);

    this.grid = Array(input.length).fill([]);
    var rowIter = 0,
        colIter = 0;
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
    this.snake = new Snake(Math.floor(rowIter / 2), Math.floor(colIter / 2), this.isObstacle.bind(this), this.isFood.bind(this), this.endGame.bind(this), this.eatenHandler.bind(this), this.tailMovementHandler.bind(this), this.headMovementHandler.bind(this));
    this.headMovementHandler(Math.floor(rowIter / 2), Math.floor(colIter / 2));
    this.startGame();
  }

  _createClass(Grid, [{
    key: 'startListeningToDirectionInputs',
    value: function startListeningToDirectionInputs() {
      document.onkeypress = this.arrowKeysHandler.bind(this);
    }
  }, {
    key: 'startGame',
    value: function startGame() {
      console.log("New Game Started");
      this.interval = setInterval(this.handleNextTick.bind(this), 1000);
    }
  }, {
    key: 'handleNextTick',
    value: function handleNextTick() {
      console.log("Next Turn");
      this.snake.moveAhead();
    }
  }, {
    key: 'isObstacle',
    value: function isObstacle(px, py) {
      var x = px;
      var y = py;
      if (this.grid[x][y] == 1) {
        this.markFatal(px, py);
        return true;
      }
      return false;
    }
  }, {
    key: 'isFood',
    value: function isFood(px, py) {
      var x = px;
      var y = py;
      if (this.grid[x][y] == 0) {
        return true;
      }
      return false;
    }
  }, {
    key: 'endGame',
    value: function endGame() {
      clearInterval(this.interval);
    }
  }, {
    key: 'tailMovementHandler',
    value: function tailMovementHandler(px, py) {
      console.log("Trail " + px + " " + py);
      var cell = document.getElementById(px + '-' + py);
      cell.setAttribute("class", "cell");
    }
  }, {
    key: 'headMovementHandler',
    value: function headMovementHandler(px, py) {
      console.log("Head Moves to " + px + " " + py);
      var cell = document.getElementById(px + '-' + py);
      cell.setAttribute("class", "occupied");
    }
  }, {
    key: 'eatenHandler',
    value: function eatenHandler(px, py) {
      console.log("Ate " + px + " " + py);
      var cell = document.getElementById(px + '-' + py);
      cell.setAttribute("class", "occupied");
      var unoccupiedCells = document.getElementsByClassName("cell");
      var unoccupiedCellsCount = unoccupiedCells.length;
      var randomUnoccupiedCell = Math.floor(Math.random() * unoccupiedCellsCount);
      var nextFoodCellXY = unoccupiedCells[randomUnoccupiedCell].id.split('-');
      this.markFood(nextFoodCellXY[0], nextFoodCellXY[1]);
    }
  }, {
    key: 'markObstacle',
    value: function markObstacle(px, py) {
      var cell = document.getElementById(px + '-' + py);
      cell.setAttribute("class", "obstacle");
    }
  }, {
    key: 'markFood',
    value: function markFood(px, py) {
      var cell = document.getElementById(px + '-' + py);
      cell.setAttribute("class", "food");
    }
  }, {
    key: 'markFatal',
    value: function markFatal(px, py) {
      var cell = document.getElementById(px + '-' + py);
      cell.setAttribute("class", "fatal");
    }
  }, {
    key: 'arrowKeysHandler',
    value: function arrowKeysHandler(event) {
      event = event || window.event;
      console.log(e.keyCode);
    }
  }]);

  return Grid;
}();

exports.default = Grid;

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map