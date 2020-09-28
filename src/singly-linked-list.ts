/**
 * 单向链表
 * @author wendy
 */

interface SNode<E> {
  key: E;
  next: SNode<E> | null;
}

interface SInfo {
  name: string;
  sex: number;
}

class SinglyNode<E> implements SNode<E> {
  key: E;
  next: SNode<E> | null;
  constructor(key: E) {
    this.next = null;
    this.key = key;
  }
}

class SinglyLinkedList<E> {
  head: SNode<E> | null;
  length: number = 0;
  constructor() {
    this.head = null;
  }

  /**
   * 创建一个节点
   */
  static newNode(key: any) {
    let node = new SinglyNode(key);
    return node;
  }

  /**
   * 插入数据一般放在头节点之后，节省O(n)
   * @param key 数据
   */
  insert(node: SNode<E>) {
    if (this.head) {
      node.next = this.head;
    } else {
      node.next = null;
    }
    this.head = node;
    this.length++;
  }

  /**
   * 查找
   * @param key 数据
   */
  find(key: E) {
    let node = this.head;

    while (node !== null && node.key !== key) {
      node = node.next;
    }

    return node;
  }

  /**
   * @param node 删除的节点
   */
  delete(node: SNode<E>) {
    if (node === this.head) {
      this.head = node.next;
      return;
    }

    let prevNode: SNode<E> | null = this.head;
    while (prevNode?.next !== node) {
      prevNode = node.next;
    }

    if (node.next === null) {
      prevNode.next = null;
    }

    if (node.next) {
      prevNode.next = node.next;
    }

    this.length--;
  }
}

// demo
var testSinglyLinkedList = new SinglyLinkedList<SInfo>();
const testSInfo: SInfo = {
  name: 'wendy',
  sex: 0,
};
const testSNode = SinglyLinkedList.newNode(testSInfo);
testSinglyLinkedList.insert(testSNode);
console.log('find:', testSinglyLinkedList.find(testSInfo));
const currentSnode = testSinglyLinkedList.find(testSInfo);
testSinglyLinkedList.delete(currentSnode as any);
console.log('find:', testSinglyLinkedList.find(testSInfo));
