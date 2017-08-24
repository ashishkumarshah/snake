class DoubleLinkList {
  constructor (firstNodeData) {
    var node = this.makeNodeFromData(firstNodeData);
    this.head = node;
    this.tail = node;
  }
  makeNodeFromData(data) {
    var node = {};
    node.data = data;
    node.next = null;
    node.previous = null;
    return node;
  }
  addAtHead (data) {
    var node = this.makeNodeFromData(data);
    node.next = this.head;
    this.head.previous = node;
    this.head = node;
  }
  removeAtTail () {
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
  getData () {
    var retval = [];
    var node = this.head;
    while (node.next != null) {
      retval.push(node.data);
      node = node.next;
    }
    return retval;
  }
  getHeadData () {
    var headData = this.head.data;
    return headData;
  }
  getTailData () {
    var tailData = this.tail.data;
    return tailData;
  }
}
export default DoubleLinkList;
