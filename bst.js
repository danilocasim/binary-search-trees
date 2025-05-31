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
    if (!root.left && !root.right) return null;

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
    console.log(root);
    return root;
  }

  find(value, root = this.root) {
    if (value === root.data) return root;

    if (root.data < value) {
      return this.find(value, root.right);
    }
    if (root.data > value) {
      return this.find(value, root.left);
    }
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

const tree = new Tree([1, 1, 4, 5, 4, 3, 3, 3, 3, 6, 7, 2]);

console.log(tree.find(2));
prettyPrint(tree.root);
