/**
 * 双向链表
 * @author wendy
 */

interface DNode<E> {
  key: E;
  prev: DNode<E> | null;
  next: DNode<E> | null;
}

class DoublyNode<E> implements DNode<E> {
  key: E;
  prev: DNode<E> | null;
  next: DNode<E> | null;
  constructor(key: E) {
    this.key = key;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList<E> {
  head: DNode<E> | null;
  length: Number;
  constructor() {
    this.head = null;
    this.length = 0;
  }

  static newNode(key: any) {
    let node = new DoublyNode(key);
    return node;
  }

  insert(node: DNode<E>) {
    node.prev = null;
    node.next = this.head;
    if (this.head) {
      this.head.prev = node;
    }
    this.head = node;
  }

  find(key: E) {
    let node = this.head;
    while (node !== null && node.key !== key) {
      node = node.next;
    }
    return node;
  }

  delete(node: DNode<E>) {
    if (node === this.head) {
      this.head = node.next;
      return;
    }

    const { prev, next } = node;

    if (prev) {
      prev.next = next;
    }

    if (next) {
      next.prev = prev;
    }
  }
}

const testDInfo = {
  name: 'wendy',
  age: '100',
};
const testDNode = DoublyLinkedList.newNode(testDInfo);
const testDoublyLinkedList = new DoublyLinkedList();
testDoublyLinkedList.insert(testDNode);
console.log('find:', testDoublyLinkedList.find(testDInfo));
testDoublyLinkedList.delete(testDNode);
console.log('find:', testDoublyLinkedList.find(testDInfo));
