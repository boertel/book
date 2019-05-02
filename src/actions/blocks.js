import axios from "axios";

function serialize(parent, depth) {
  // TODO(boertel) shouldn't get this kind of recursive data from a server but from the interactive UI
  let output = {};
  if (depth) {
    output = {
      [depth]: {
        type: "root",
        kind: "block",
        path: "" + depth,
        nodes: []
      }
    };
  }
  parent.nodes.forEach((node, j) => {
    node.path = (parent.path || depth) + ":" + j;
    if (depth) {
      output[depth].nodes.push(node.path);
    }
    output[node.path] = node;
    if (node.nodes) {
      output = Object.assign({}, output, serialize(node));
      node.nodes = node.nodes.map(child => child.path);
    }
  });
  return output;
}

export const loadBlocks = (album, pid) => {
  return dispatch => {
    axios.get(`/data/${album}/${pid}.json`).then(response => {
      const page = response.data;
      return dispatch({
        type: "BLOCKS_LOADED",
        blocks: serialize(page, pid),
        pid
      });
    });
  };
};

export function activate(bid) {
  return {
    type: "BLOCK_ACTIVATE",
    bid
  };
}

export function deactivate(bid) {
  return {
    type: "BLOCK_DEACTIVATE",
    bid
  };
}

export function register(bid) {
  return {
    type: "ANCHOR_REGISTERED",
    bid
  };
}

export function unregister(bid) {
  return {
    type: "ANCHOR_UNREGISTERED",
    bid
  };
}
