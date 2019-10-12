const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        let newNode = new Node(data);

        if (this.length === 0) {
            this._head = newNode;
            this._tail = newNode;
        } else {
            newNode.prev = this._tail;
            this._tail.next = newNode;
            this._tail = newNode;
        }

        this.length++;
        return this;
    }

   head() {
       return this._head ? this._head.data : null;
   }

   tail() {
       return this._tail ? this._tail.data : null;
   }

    at(index) {
        let current = this._head;
        let position = 0;

        while (position <= index) {
            if (position === index) {
                return current.data;
            }
            this.prev = current;
            current = current.next;
            position++;
        }

        return -1;
    }

    insertAt(index, data) {
        if (index < 0 || this.length < index) {
            return false;
        }

        let node = new Node(data);
        if (index === 0) {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        } else if (index === this.length) {
            this.tail.prev = node;
            node.next = this.tail;
            this.tail = node;
        } else {
            let current = this._head;
            let counter = 1;
            while (current) {
                current = current.next;
                if (counter === index) {
                    node.prev = current.prev;
                    current.prev.next = node;
                    node.next = current;
                    current.prev = node;
                }
                counter++;
            }
        }

        this.length++;
        return this;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        this.length = 0;
        this._head = null;
        this._tail = null;
        
        return this;
    }

    deleteAt(index) {
        if (index < 0 || this.length < index) {
            return false;
        }
        
        let current = this._head;
        let counter = 1;
        
        if (index === 0) {
            this._head.prev = null;
            this._head = this._head.next;
        } else {
            while (current) {
                current = current.next;
                if (current === this._tail) {
                    this._tail = this._tail.prev;
                    this._tail.next = null;
                } else if (counter === index) {
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                    break;
                }
                counter++;
            }
        }
        this.length--;

        return this;
    }

    reverse() {
        let current = this._head;
        let prev = null;

        while (current) {
            let next = current.next;
            current.next = prev;
            current.prev = next;
            prev = current;
            current = next;
        }
        this._tail = this._head;
        this._head = prev;

        return this;
    }

    indexOf(data) {
        let currentNode = this._head;
        let currentIndex = 0;

        while (currentNode) {
            if (currentNode.data === data) {
                return currentIndex;
            }
            currentNode = currentNode.next;
            currentIndex++;
        }

        return -1;
    }
}

module.exports = LinkedList;
