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

  isBalance(root = this.root) {
    if (root === null) return null;
    const leftNode = root.left;
    const rightNode = root.right;

    if (root.left !== null && root.right !== null) {
      const rootLeftHeight = this.height(leftNode.data);
      const rootRightHeight = this.height(rightNode.data);

      const firstNum =
        rootLeftHeight >= rootRightHeight ? rootLeftHeight : rootRightHeight;

      const secondNum =
        rootLeftHeight >= rootRightHeight ? rootRightHeight : rootLeftHeight;

      if (firstNum - secondNum > 1) {
        return false;
      }
      // return false if the difference is greater than 1
    }

    root.left = this.isBalance(root.left);
    root.right = this.isBalance(root.right);

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

const tree = new Tree([
  1, 1, 4, 5, 4, 3, 3, 3, 3, 6, 7, 2, 8, 9, 10, 11, 12, 13, 14, 15,
]);

tree.insert(16);
tree.insert(17);

console.log(tree.isBalance());

prettyPrint(tree.root);

tree.rebalance();
prettyPrint(tree.root);

console.log(tree.isBalance());
