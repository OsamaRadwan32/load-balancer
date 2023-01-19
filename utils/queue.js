class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }

  front() {
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[0];
  }

  isEmpty() {
    return this.items.length == 0;
  }

  printQueue() {
    var str = "";
    for (var i = 0; i < this.items.length; i++) str += this.items[i] + " ";
    return str;
  }
}

var queue = new Queue();
console.log(queue.isEmpty()); // true
console.log(queue.front()); // "No elements in Queue"
console.log(queue.dequeue()); // "Underflow"

queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
console.log(queue.printQueue()); // "10 20 30"
console.log(queue.dequeue()); // 10
console.log(queue.front()); // 20
