import { sortRemoveDuplicates } from "./helper.js";

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    const sortedArr = sortRemoveDuplicates(arr);
    if (sortedArr.length === 0) return null;

    const mid = Math.floor(sortedArr.length / 2);
    const root = new Node(sortedArr[mid]);

    root.left = this.buildTree(sortedArr.slice(0, mid));

    root.right = this.buildTree(sortedArr.slice(mid + 1, sortedArr.length));

    return root;
  }

  insert(value, root = this.root) {
    if (root === null) return new Node(value);

    if (root === value) {
      return root;
    }

    if (root.data > value) {
      root.left = this.insert(value, root.left);
    }

    if (root.data < value) {
      root.right = this.insert(value, root.right);
    }

    return root;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const tree = new Tree([1, 1, 4, 5, 4, 3, 3, 3, 3, 6, 7]);
tree.insert(2);

console.log(tree.root);
prettyPrint(tree.root);
