import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Anchor from "./Anchor";
import Row from "./Row";
import Picture from "./Picture";
import Paragraph from "./Paragraph";
import Heading from "./Heading";
import Video from "./Video";

import { activate, deactivate } from "../actions/blocks";

// TODO(boertel) replace native tag with custom one to support active and co
const mapping = {
  paragraph: {
    type: Paragraph
  },
  div: {
    type: "div"
  },
  link: {
    type: "a"
  },
  anchor: {
    type: Anchor
  },
  title: {
    type: "h1"
  },
  heading: {
    type: Heading
  },
  row: {
    type: Row
  },
  picture: {
    type: Picture
  },
  root: {
    type: "div"
  },
  video: {
    type: Video
  }
};

function generate(nodes, dispatch, index, navigate) {
  nodes = nodes || [];
  return nodes.map(node => {
    if (node.kind === "block") {
      const options = mapping[node.type];
      const data = node.data || {};

      let props = {
        key: node.path,
        ...data
      };

      const children = generate(node.nodes, dispatch, index, navigate);
      // TODO(boertel) is this supposed to be here? can this be abstracted?
      if (data.viewer) {
        const onClick = () => {
          // only when not in viewer already
          navigate(node.path);
        };
        props = { ...props, onClick };
      }
      if (data.anchor || data.coordinates) {
        const onMouseOver = () => {
          dispatch(activate(node.path));
        };
        const onMouseOut = () => {
          dispatch(deactivate(node.path));
        };
        props = {
          ...props,
          onMouseOver,
          onMouseOut,
          anchor: true
        };
      }
      return React.createElement(options.type, props, children);
    } else if (node.kind === "text") {
      return node.text;
    }
    return null;
  });
}

function Content({ nodes, index, dispatch, className, navigate }) {
  const children = generate(nodes, dispatch, index, navigate);
  return <div className={["Content", className].join(" ")}>{children}</div>;
}

function deserialize(root, dict) {
  let output = Object.assign({}, root);
  if (root.nodes) {
    output.nodes = [];
    root.nodes.forEach(path => {
      const node = dict[path];
      output.nodes = output.nodes.concat(deserialize(node, dict));
    });
  }
  return output;
}

const mapStateToProps = (state, props) => {
  const root = state.blocks[props.root];
  const nodes = props.nodes || deserialize(root, state.blocks).nodes;
  return {
    nodes
  };
};

export default connect(mapStateToProps)(styled(Content)`
  h1 {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
  h2 {
    margin-top: 1.5em;
    margin-bottom: 0.5em;
  }

  .ref {
    border-bottom: 1px dotted orange;
    cursor: pointer;
  }

  .ref.active,
  .ref:hover {
    color: orange;
  }
`);
