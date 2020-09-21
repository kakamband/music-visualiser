"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
/**
 * @class ListNode<Type>
 * @description Node type for linked list
 */
class ListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
/**
 * @class LinkedList<Type>
 * @description Node type for linked list
 */
class LinkedList {
    constructor() {
        this.start = null;
        this.count = 0;
    }
    addToList(val) {
        let currentNode = this.start;
        if (this.start == null) {
            this.start = new ListNode(val);
        }
        else {
            while (currentNode.next != null) {
                currentNode = currentNode.next;
            }
            currentNode.next = new ListNode(val);
        }
        this.count++;
    }
    printList() {
        process.stdout.write(`List: `);
        let currentNode = this.start;
        if (currentNode == null) {
            process.stdout.write(` Empty list.`);
        }
        while (currentNode != null) {
            process.stdout.write(`${currentNode.data}, `);
            currentNode = currentNode.next;
        }
        process.stdout.write(`\n`);
    }
    get elementCount() {
        return this.count;
    }
}
exports.LinkedList = LinkedList;
//# sourceMappingURL=LinkedList.js.map