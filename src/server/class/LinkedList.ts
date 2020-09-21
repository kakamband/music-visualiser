/**
 * @class ListNode<Type>
 * @description Node type for linked list
 */
class ListNode<Type> {
  public data: Type;
  public next: ListNode<Type> | any;

  constructor(data: Type) {
    this.data = data;
    this.next = null;
  }
}

/**
 * @class LinkedList<Type>
 * @description Node type for linked list
 */
export class LinkedList<Type> {
  private start: ListNode<Type> | any;
  private count: number;

  constructor() {
    this.start = null;
    this.count = 0;
  }

  public addToList(val: Type) {
    let currentNode: ListNode<Type> = this.start;

    if (this.start == null) {
      this.start = new ListNode<Type>(val);
    } else {
      while (currentNode.next != null) {
        currentNode = currentNode.next;
      }
      currentNode.next = new ListNode<Type>(val);
    }

    this.count++;
  }

  public printList() {
    process.stdout.write(`List: `);
    let currentNode: ListNode<Type> = this.start;

    if (currentNode == null) {
      process.stdout.write(` Empty list.`);
    }

    while (currentNode != null) {
      process.stdout.write(`${currentNode.data}, `);
      currentNode = currentNode.next;
    }

    process.stdout.write(`\n`);
  }

  public get elementCount(): number {
    return this.count;
  }
}
