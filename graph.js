class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
    return true;
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.nodes.add(vertex);
    }
    return true;
  }

  findVertex(value) {
    for (const vertex of this.nodes) {
      if (vertex.value === value) {
        return vertex;
      }
    }
    return null; // Return null if the vertex with the specified value is not found
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    const vertex1 = this.findVertex(v1.value);
    const vertex2 = this.findVertex(v2.value);

    if (vertex1 && vertex2) {
      vertex1.adjacent.add(vertex2);
      vertex2.adjacent.add(vertex1);
    } else {
      console.log("One or both vertices not found in the graph.");
    }
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    const vertex1 = this.findVertex(v1.value);
    const vertex2 = this.findVertex(v2.value);

    if (vertex1 && vertex2) {
      vertex1.adjacent.delete(vertex2);
      vertex2.adjacent.delete(vertex1);
    } else {
      console.log("One or both vertices not found in the graph.");
    }
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);

    // Update adjacency lists
    for (const node of this.nodes) {
      node.adjacent.delete(vertex);
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    // Recursive DFS helper function
    function dfs(node) {
      visited.add(node);
      result.push(node.value);

      for (const neighbor of node.adjacent) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
    }

    dfs(start);
    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const visited = new Set();
    const result = [];
    const queue = [];

    visited.add(start);
    queue.push(start);

    while (queue.length > 0) {
      const current = queue.shift();
      result.push(current.value);

      for (const neighbor of current.adjacent) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }
}

module.exports = { Graph, Node };
