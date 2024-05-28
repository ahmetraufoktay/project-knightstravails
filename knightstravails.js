class Queue {
  constructor() {
    this.queue = [];
  }
  enqueue(element) {
    this.queue.push(element);
  }
  dequeue() {
    if (this.queue.length > 0) return this.queue.shift();
    return undefined;
  }
  isEmpty() {
    return this.queue.length == 0;
  }
  clear() {
    this.queue = [];
  }
  show() {
    console.log(this.queue);
  }
}

const rq = new Queue();
const cq = new Queue();
let nodes_in_next_layer = 0;
let nodes_left_in_layer = 1;

function firstsearch(start, visited, parent) {
  let [r, c] = start;
  let dr = [-2, -2, -1, -1, 1, 1, 2, 2];
  let dc = [-1, 1, -2, 2, -2, 2, -1, 1];

  for (let i = 0; i < 8; i++) {
    let rr = r + dr[i];
    let cc = c + dc[i];

    if (rr < 0 || cc < 0 || rr >= 8 || cc >= 8) continue;
    if (visited[rr][cc]) continue;

    rq.enqueue(rr);
    cq.enqueue(cc);
    visited[rr][cc] = true;
    parent[rr][cc] = `(${r}, ${c})`;
    nodes_in_next_layer++;
  }
}

function traverseThrough(start, finish, parent) {
  const [sr, sc] = start;
  let [fr, fc] = finish;
  let myArray = [[fr, fc]];
  while (parent[fr][fc] !== `(${sr}, ${sc})`) {
    [fr, fc] = parent[fr][fc].replace(/[()]/g, "").split(", ").map(Number);
    myArray.push([fr, fc]);
  }
  myArray.push([sr, sc]);
  return myArray.reverse();
}

function extensiveSearch(start, finish) {
  const visited = Array.from({ length: 8 }, () => Array(8).fill(false));
  const parent = Array.from({ length: 8 }, () => Array(8).fill(null));
  let reachedend = false;
  const [sr, sc] = start;
  const [fr, fc] = finish;

  rq.enqueue(sr);
  cq.enqueue(sc);
  visited[sr][sc] = true;

  while (!rq.isEmpty()) {
    const r = rq.dequeue();
    const c = cq.dequeue();

    if (r == fr && c == fc) {
      reachedend = true;
      break;
    }

    firstsearch([r, c], visited, parent);
    nodes_left_in_layer--;

    if (nodes_left_in_layer == 0) {
      nodes_left_in_layer = nodes_in_next_layer;
      nodes_in_next_layer = 0;
    }
  }
  let myarray = traverseThrough(start, finish, parent);
  return reachedend ? myarray : -1;
}

console.log(extensiveSearch([6, 7], [7, 7]));
