const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor () {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {

    const newNode = new Node(data);

    if (!this._root) {
      this._root = newNode;
    } else {
      const addItem = node => {
        if (node.data === data) {
          return null;
        } else if (node.data > data) {
          if (!node.left) {
            node.left = newNode;
          } else {
            return addItem(node.left);
          }
        } else {
          if (node.data < data) {
            if (!node.right) {
              node.right = newNode;
            } else {
              return addItem(node.right);
            }
          }
        }
      }
      addItem(this._root);
    }
  }

  has(data) {
    if (!this._root) {
      return false;
    } else {
      const hasItem = node => {
        if (!node) {
          return false;
        }

        if (node.data === data) {
          return true;
        } else if (node.data < data) {
          return hasItem(node.right);
        } else {
          return hasItem(node.left);
        }
      }
      return hasItem(this._root) || false;
    }
  }

  find(data) {
    if (!this._root) {
      return null;
    } else {
      const hasItem = node => {
        if (!node) {
          return null;
        }
        if (node.data === data) {
          return node;
        } else if (node.data < data) {
          return hasItem(node.right);
        } else {
          return hasItem(node.left);
        }
      }
      return hasItem(this._root);
    }
  }

  remove(data) {
    const removeNode = (node, value) => {
      if (node.data > value) {
        node.left = removeNode(node.left, value);
        return node;
      } else if (node.data < value) {
        node.right = removeNode(node.right, value);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minRightSide = node.right;
        while (minRightSide.left) {
          minRightSide = minRightSide.left;
        }

        node.data = minRightSide.data;
        node.right = removeNode(node.right, minRightSide.data);

        return node;
      }
    }
    return removeNode(this._root, data);
  }

  min() {
    let currentNode = this._root;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  max() {
    let currentNode = this._root;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree
};