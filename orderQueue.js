class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class OrderQueue {
    constructor() {
        this._head = null;
        this._tail = null;
    }

    get isEmpty() {
        return this._head === null;
    }

    get head() {
        return this._head.value;
    }

    get tail() {
        return this._tail.value;
    }

    enqueue(order) {
        if(this.isEmpty) {
            this._tail = this._head = new Node(order);
            this._head.next = this._tail;
        } else {
            const t = new Node(order);
            this._tail.next = t;
            this._tail = t;
        }
    }

    dequeue() {
        if(this.isEmpty)
            return null;
        const t = this._head;
        this._head = this._head.next;
        return t.value;
    }

    [Symbol.iterator]() {
        return {
            current: this._head,
            last: this._tail,
            next: function() {
                if(this.current === null)
                    return {done: true}
                if(this.current === this.last) {
                    const v = this.current.value;
                    this.current = null;
                    return {done: false, value: v}
                }
                const t = this.current;
                this.current = this.current.next;
                return {done: false, value: t.value};
            }
        };
    }

    map(fn) {
        return [...this].map(fn);
    }

    find(fn) {
        return [...this].find(fn);
    }
}

exports.OrderQueue = OrderQueue;