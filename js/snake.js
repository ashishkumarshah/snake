import DoubleLinkList from './DoubleLinkList.js';
class Snake
{
  constructor (initialXPosition, initialYPosition) {
    var cordinateData = {};
    cordinateData.x = initialXPosition;
    cordinateData.y = initialYPosition;
    this.linkList = new DoubleLinkList(cordinateData);
  }

  move (nextX, nextY, isFood) {
    var newHead = {};
    newHead.x = nextX;
    newHead.y = nextY;
    this.linkList.addAtHead(newHead);
    if (!isFood) {
      this.linkList.removeAtTail();
    }
  }

  getBody () {
    var body = this.linkList.getData();
    return body;
  }

  getHeadPosition () {
    return this.linkList.getHeadData();
  }

  getTailPosition () {
    return this.linkList.getTailData();
  }
}
export default Snake;
