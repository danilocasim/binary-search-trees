import { sortRemoveDuplicates } from "./helper.js";

class Node {
  constructor(data = null) {
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

    if (root.data > value) {
      root.left = this.insert(value, root.left);
    }

    if (root.data < value) {
      root.right = this.insert(value, root.right);
    }

    return root;
  }

  deleteValue(value, root = this.root) {
    if (root == null) return root;

    if (root.data > value) {
      root.left = this.deleteValue(value, root.left);
    } else if (root.data < value) {
      root.right = this.deleteValue(value, root.right);
    } else {
      //delete leap node
      if (!root.left && !root.right) return null;
      //delete node with 1 single child
      if (!root.left ^ !root.right) {
        if (root.left) {
          root.data = this.deleteValue(value, root.left);
        } else if (root.right) {
          root.data = this.deleteValue(value, root.right);
        }
        return root.data;
      }

      //delete node with 2 child
      if (root.left && root.right) {
        let rightSubtree = root.right;
        while (rightSubtree.left !== null && rightSubtree !== null) {
          rightSubtree = rightSubtree.left;
        }

        root.data = rightSubtree.data;

        root.right = this.deleteValue(root.data, root.right);
      }
    }
    return root;
  }

  find(value, root = this.root) {
    if (root === null) return null;
    if (value === root.data) return root;

    if (root.data < value) {
      return this.find(value, root.right);
    }
    if (root.data > value) {
      return this.find(value, root.left);
    }
  }

  levelOrder(callback) {
    if (this.root === null) return;
    if (!callback instanceof Function)
      throw new Error(`${callback} is not a function`);

    const que = [];
    que.push(this.root);

    while (que.length !== 0) {
      const curr = que[0];
      callback(curr.data);
      if (curr.left !== null) que.push(curr.left);
      if (curr.right !== null) que.push(curr.right);

      que.shift();
    }
  }
  levelOrderRecursion(callback, que = [this.root]) {
    if (this.root === null) return;
    if (!callback instanceof Function)
      throw new Error(`${callback} is not a function`);
    if (que.length === 0) return;

    const curr = que[0];
    callback(curr.data);
    if (curr.left !== null) que.push(curr.left);
    if (curr.right !== null) que.push(curr.right);

    que.shift();

    return this.levelOrderRecursion(callback, que);
  }

  preOrder(callback, root = this.root) {
    if (!callback instanceof Function)
      throw new Error(`${callback} is not a function`);
    if (root === null) return null;

    callback(root.data);
    root.left = this.preOrder(callback, root.left);
    root.right = this.preOrder(callback, root.right);
    return root;
  }

  inOrder(callback, root = this.root) {
    if (!callback instanceof Function)
      throw new Error(`${callback} is not a function`);
    if (root === null) return null;

    root.left = this.inOrder(callback, root.left);
    callback(root.data);
    root.right = this.inOrder(callback, root.right);
    return root;
  }

  postOrder(callback, root = this.root) {
    if (!callback instanceof Function)
      throw new Error(`${callback} is not a function`);
    if (root === null) return null;

    root.left = this.postOrder(callback, root.left);
    root.right = this.postOrder(callback, root.right);
    callback(root.data);

    return root;
  }

  height(value) {
    let height = 0;

    let node = this.find(value);
    if (!node) return null;

    while (node.right !== null || node.left !== null) {
      let leftHeight = 0;
      let rightHeight = 0;

      let nodeLeft = node;
      while (nodeLeft.left !== null) {
        nodeLeft = nodeLeft.left;
        leftHeight++;
      }

      let nodeRight = node;
      while (nodeRight.right !== null) {
        nodeRight = nodeRight.right;
        rightHeight++;
      }

      if (leftHeight < rightHeight) {
        node = node.right;
        height++;
      } else {
        node = node.left;
        height++;
      }
    }

    return height;
  }

  depth(value) {
    let depth = 0;

    let findNode = this.find(value);
    if (!findNode) return null;
    let node = this.find(this.root.data);

    while (node.right !== null || node.left !== null) {
      if (node.data > value) {
        node = node.left;
        depth++;
      } else if (node.data < value) {
        node = node.right;
        depth++;
      } else {
        return depth;
      }
    }
    if (this.height(this.root.data) === depth) return null;

    return depth;
  }

  isBalanceRecur(root = this.root) {
    if (root === null) return null;
    if (root.left === null && root.right === null) return true;

    if (root.left !== null || root.right !== null) {
      const rootLeftHeight =
        root.left !== null ? this.height(root.left.data) : 0;

      const rootRightHeight =
        root.right !== null ? this.height(root.right.data) : 0;

      const firstNum =
        rootLeftHeight >= rootRightHeight ? rootLeftHeight : rootRightHeight;

      const secondNum =
        rootLeftHeight >= rootRightHeight ? rootRightHeight : rootLeftHeight;

      if (firstNum - secondNum > 1) {
        return false;
      }

      root.left = this.isBalanceRecur(root.left);
      root.right = this.isBalanceRecur(root.right);
    }

    return true;
  }

  isBalance() {
    const allBalanceOutputPerNode = [];

    this.levelOrder((data) => {
      const node = this.find(data);

      const rootLeftHeight =
        node.left !== null ? this.height(node.left.data) + 1 : 0;

      const rootRightHeight =
        node.right !== null ? this.height(node.right.data) + 1 : 0;

      console.log(node);
      console.log(
        "Root Left: " + rootLeftHeight,
        "Root Right: " + rootRightHeight
      );
      const firstNum =
        rootLeftHeight >= rootRightHeight ? rootLeftHeight : rootRightHeight;

      const secondNum =
        rootLeftHeight >= rootRightHeight ? rootRightHeight : rootLeftHeight;

      if (firstNum - secondNum > 1) {
        allBalanceOutputPerNode.push(false);
        return;
      }
      allBalanceOutputPerNode.push(true);
    });

    return allBalanceOutputPerNode.includes(false) ? false : true;
  }

  isBalanceIteration() {
    let leftChild = this.root.left;
    let rightChild = this.root.right;

    while (leftChild !== null || rightChild !== null) {
      const rootLeftHeight = this.height(leftChild.data);
      const rootRightHeight = this.height(rightChild.data);

      const firstNum =
        rootLeftHeight >= rootRightHeight ? rootLeftHeight : rootRightHeight;

      const secondNum =
        rootLeftHeight >= rootRightHeight ? rootRightHeight : rootLeftHeight;

      if (firstNum - secondNum > 1) {
        return false;
      }
      leftChild = leftChild.left;
      rightChild = rightChild.right;
    }
    return true;
  }

  rebalance() {
    const newArray = [];

    this.inOrder((data) => {
      newArray.push(data);
    });

    this.root = this.buildTree(newArray);

    return this.root;
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

function randomArr(arr = []) {
  if (arr.length === 100) return arr;
  arr.push(Math.floor(Math.random() * 100) + 1);
  return randomArr(arr);
}

const tree = new Tree([4]);
tree.insert(3);
tree.insert(2);

tree.insert(1);
tree.insert(5);
tree.insert(6);

tree.insert(7);

prettyPrint(tree.root);

console.log(tree.isBalance());

console.log("");
console.log("Rebalance the tree");

tree.rebalance();
prettyPrint(tree.root);
``;
console.log(tree.isBalance());

// console.log(tree.isBalanceRecur());

// prettyPrint(tree.root);
// console.log(tree.isBalanceRecur());
// prettyPrint(tree.root);
// tree.inOrder(console.log);
