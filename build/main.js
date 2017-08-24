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

var _snake = __webpack_require__(2);

var _snake2 = _interopRequireDefault(_snake);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grid = function () {
  function Grid(input) {
    _classCallCheck(this, Grid);

    this.grid = Array(input.length).fill([]);
    this.nextMove = 40;
    this.speed = 1000;
    this.score = 0;
    this.directions = ['left', 'up', 'right', 'down'];
    this.nextDirection = this.directions[3];
    this.offsetMapping = {
      'up': {
        'x': -1,
        'y': 0
      },
      'down': {
        'x': 1,
        'y': 0
      },
      'left': {
        'x': 0,
        'y': -1
      },
      'right': {
        'x': 0,
        'y': 1
      }
    };
    var rowIter = 0,
        colIter = 0;
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
    var initialSnakeXPosition = Math.floor(rowIter / 2);
    var initialSnakeYPosition = Math.floor(colIter / 2);
    this.startGame(initialSnakeXPosition, initialSnakeYPosition);
  }

  _createClass(Grid, [{
    key: 'arrowKeysHandler',
    value: function arrowKeysHandler(event) {
      event = event || window.event;
      var keyCode = event.keyCode;
      if (keyCode >= 37 && keyCode <= 40) {
        this.nextDirection = this.directions[keyCode - 37];
      }
    }
  }, {
    key: 'setLeftAsNextDirection',
    value: function setLeftAsNextDirection() {
      this.nextDirection = this.directions[0];
    }
  }, {
    key: 'setUpAsNextDirection',
    value: function setUpAsNextDirection() {
      this.nextDirection = this.directions[1];
    }
  }, {
    key: 'setRightAsNextDirection',
    value: function setRightAsNextDirection() {
      this.nextDirection = this.directions[2];
    }
  }, {
    key: 'setDownAsNextDirection',
    value: function setDownAsNextDirection() {
      this.nextDirection = this.directions[3];
    }
  }, {
    key: 'startListeningToDirectionInputs',
    value: function startListeningToDirectionInputs() {
      document.onkeypress = this.arrowKeysHandler.bind(this);
      document.onkeyup = this.arrowKeysHandler.bind(this);
    }
  }, {
    key: 'stopListeningToDirectionInputs',
    value: function stopListeningToDirectionInputs() {
      document.onkeypress = null;
      document.onkeyup = null;
    }
  }, {
    key: 'startGame',
    value: function startGame(x, y) {
      console.log("New Game Started");
      this.snake = new _snake2.default(x, y);
      this.handleHeadMovement(x, y);
      this.currentSnakeBody = this.snake.getBody();
      this.startListeningToDirectionInputs();
      setTimeout(this.handleNextTick.bind(this), this.speed);
    }
  }, {
    key: 'endGame',
    value: function endGame() {
      this.stopListeningToDirectionInputs();
      clearInterval(this.interval);
      console.log("End Game");
    }
  }, {
    key: 'handleNextTick',
    value: function handleNextTick() {
      console.log("Evaluating Next Turn");
      var currentHead = this.snake.getHeadPosition();
      var nextOffsets = this.offsetMapping[this.nextDirection];
      var nextX = currentHead.x + nextOffsets.x;
      var nextY = currentHead.y + nextOffsets.y;
      if (this.isObstacle(nextX, nextY) || this.isBite(nextX, nextY)) {
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
        this.markEmpty(nextX, nextY);
        this.markFood(nextFoodPosition.x, nextFoodPosition.y);
        this.handleHeadMovement(nextX, nextY);
      } else {
        this.handleHeadMovement(nextX, nextY);
        this.handleTailMovement(oldTail.x, oldTail.y);
      }
      this.currentSnakeBody = this.snake.getBody();
      setTimeout(this.handleNextTick.bind(this), this.speed);
    }
  }, {
    key: 'isObstacle',
    value: function isObstacle(px, py) {
      if (this.grid[px][py] == 1) {
        return true;
      }
      return false;
    }
  }, {
    key: 'isBite',
    value: function isBite(px, py) {
      var iter;
      var node;
      if (this.currentSnakeBody.length > 1) {
        for (iter = 0; iter < this.currentSnakeBody.length - 1; iter++) {
          node = this.currentSnakeBody[iter];
          if (px === node.x && py === node.y) {
            return true;
          }
        }
      }
      return false;
    }
  }, {
    key: 'isFood',
    value: function isFood(px, py) {
      if (this.grid[px][py] == 0) {
        return true;
      }
      return false;
    }
  }, {
    key: 'handleTailMovement',
    value: function handleTailMovement(px, py) {
      console.log("Trail " + px + " " + py);
      var cell = document.getElementById(px + '-' + py);
      cell.setAttribute("class", "cell");
    }
  }, {
    key: 'handleHeadMovement',
    value: function handleHeadMovement(px, py) {
      console.log("Head Moves to " + px + " " + py);
      var cell = document.getElementById(px + '-' + py);
      cell.setAttribute("class", "occupied");
    }
  }, {
    key: 'useCSSMagicToChooseNextFoodPositionAtRandom',
    value: function useCSSMagicToChooseNextFoodPositionAtRandom() {
      var unoccupiedCells = document.getElementsByClassName("cell");
      var unoccupiedCellsCount = unoccupiedCells.length;
      var randomUnoccupiedCell = Math.floor(Math.random() * unoccupiedCellsCount);
      var nextFoodCellXY = unoccupiedCells[randomUnoccupiedCell].id.split('-');
      var node = {};
      node.x = nextFoodCellXY[0];
      node.y = nextFoodCellXY[1];
      return node;
    }
  }, {
    key: 'setClassForCell',
    value: function setClassForCell(px, py, className) {
      var cell = document.getElementById(px + '-' + py);
      cell.setAttribute("class", className);
    }
  }, {
    key: 'markObstacle',
    value: function markObstacle(px, py) {
      this.grid[px][py] = 1;
      this.setClassForCell(px, py, "obstacle");
    }
  }, {
    key: 'markFood',
    value: function markFood(px, py) {
      this.grid[px][py] = 0;
      this.setClassForCell(px, py, "food");
    }
  }, {
    key: 'markEmpty',
    value: function markEmpty(px, py) {
      this.grid[px][py] = null;
      this.setClassForCell(px, py, "cell");
    }
  }]);

  return Grid;
}();

exports.default = Grid;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DoubleLinkList = __webpack_require__(3);

var _DoubleLinkList2 = _interopRequireDefault(_DoubleLinkList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Snake = function () {
  function Snake(initialXPosition, initialYPosition) {
    _classCallCheck(this, Snake);

    var cordinateData = {};
    cordinateData.x = initialXPosition;
    cordinateData.y = initialYPosition;
    this.linkList = new _DoubleLinkList2.default(cordinateData);
  }

  _createClass(Snake, [{
    key: 'move',
    value: function move(nextX, nextY, isFood) {
      var newHead = {};
      newHead.x = nextX;
      newHead.y = nextY;
      this.linkList.addAtHead(newHead);
      if (!isFood) {
        this.linkList.removeAtTail();
      }
    }
  }, {
    key: 'getBody',
    value: function getBody() {
      var body = this.linkList.getData();
      return body;
    }
  }, {
    key: 'getHeadPosition',
    value: function getHeadPosition() {
      return this.linkList.getHeadData();
    }
  }, {
    key: 'getTailPosition',
    value: function getTailPosition() {
      return this.linkList.getTailData();
    }
  }]);

  return Snake;
}();

exports.default = Snake;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DoubleLinkList = function () {
  function DoubleLinkList(firstNodeData) {
    _classCallCheck(this, DoubleLinkList);

    var node = this.makeNodeFromData(firstNodeData);
    this.head = node;
    this.tail = node;
  }

  _createClass(DoubleLinkList, [{
    key: "makeNodeFromData",
    value: function makeNodeFromData(data) {
      var node = {};
      node.data = data;
      node.next = null;
      node.previous = null;
      return node;
    }
  }, {
    key: "addAtHead",
    value: function addAtHead(data) {
      var node = this.makeNodeFromData(data);
      node.next = this.head;
      this.head.previous = node;
      this.head = node;
    }
  }, {
    key: "removeAtTail",
    value: function removeAtTail() {
      var lastNode = this.tail;
      var penultimateNode = this.tail.previous;
      penultimateNode.next = null;
      if (penultimateNode !== null) {
        this.tail = penultimateNode;
      }
      var data = lastNode.data;
      lastNode = null;
      return data;
    }
  }, {
    key: "getData",
    value: function getData() {
      var retval = [];
      var node = this.head;
      while (node.next != null) {
        retval.push(node.data);
        node = node.next;
      }
      return retval;
    }
  }, {
    key: "getHeadData",
    value: function getHeadData() {
      var headData = this.head.data;
      return headData;
    }
  }, {
    key: "getTailData",
    value: function getTailData() {
      var tailData = this.tail.data;
      return tailData;
    }
  }]);

  return DoubleLinkList;
}();

exports.default = DoubleLinkList;

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map