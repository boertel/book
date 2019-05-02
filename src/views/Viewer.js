import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import _ from "lodash";

import Content from "../components/Content";
import ViewerNavigation from "../components/ViewerNavigation";

class Viewer extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.onKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeydown);
  }

  onKeydown = evt => {
    if (evt.target.tagName.toLowerCase() === "input") {
      return;
    }
    if (evt.key === "k" || evt.key === "ArrowRight") {
      this.next();
    }
    if (evt.key === "j" || evt.key === "ArrowLeft") {
      this.previous();
    }
    if (evt.key === "Escape") {
      this.close();
    }
  };

  close = () => {
    const { navigate, } = this.props;
    navigate(`..`, { replace: true });
  };

  next = () => {
    const { nextPath, navigate, } = this.props;
    if (nextPath) {
      navigate(nextPath, { replace: true });
    } else {
      this.close();
    }
  };

  previous = () => {
    const { previousPath, navigate, } = this.props;
    if (previousPath) {
      navigate(previousPath, { replace: true });
    } else {
      this.close();
    }
  };

  render() {
    const { nodes, className, mediumIndex, total } = this.props;
    return (
      <div className={["Viewer", className].join(" ")}>
        <button className="button close-button" onClick={this.close}>
          <i className="icon" />
        </button>
        <Content nodes={nodes} index={mediumIndex} />
        <ViewerNavigation
          next={this.next}
          previous={this.previous}
          counter={mediumIndex}
          total={total}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, { name, index, block, }) => {
  index = parseInt(index, 10);

  // TODO(boertel) selector in case `reselect` is used
  const media = _.chain(state.blocks)
    .pick(state.pages[index].blocks)
    .pickBy(block => block.data && block.data.viewer)
    .values()
    .value();

  let mediumIndex = media.indexOf(state.blocks[block]);
  let medium = state.blocks[block];

  let previousPath;
  let nextPath;

  if (mediumIndex === 0 && index !== 1) {
    previousPath = `../../${index - 1}`;
  }

  if (mediumIndex > 0) {
    const previous = media[mediumIndex - 1];
    previousPath = `../${previous.path}`;
  }

  if (mediumIndex < media.length - 1) {
    const next = media[mediumIndex + 1];
    nextPath = `../${next.path}`;
  }

  if (mediumIndex + 1 > media.length - 1 && index < state.albums[name].pages) {
    nextPath = `../../${index + 1}`;
  }

  const { title, location } = medium.data;

  let nodes = [];
  nodes.push({
    kind: "block",
    type: "paragraph",
    path: `v${index}:${mediumIndex}:0:0`,
    nodes: [{ kind: "text", text: title || "" }]
  });
  if (location) {
    nodes.push({
      kind: "block",
      type: "paragraph",
      path: `v${index}:${mediumIndex}:0:1`,
      nodes: [{ kind: "text", text: `– ${location}` }]
    });
  }

  const text = {
    kind: "block",
    type: "div",
    path: `v${index}:${mediumIndex}:0`,
    data: {
      width: 300,
      height: window.innerHeight
    },
    nodes: nodes
  };

  const clone = Object.assign({}, medium, {
    data: Object.assign({}, medium.data, { viewer: false })
  });

  return {
    nodes: [
      {
        type: "row",
        kind: "block",
        path: `v${index}:${mediumIndex}`,
        nodes: [clone, text]
      }
    ],
    total: media.length,
    mediumIndex,
    previousPath,
    nextPath,
    index
  };
};

export default connect(mapStateToProps)(styled(Viewer)`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  -webkit-font-smoothing: antialiased;

  button {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 26px;
    height: 26px;
    padding: 0;
    background-color: #666;
    border-radius: 50%;
    border: none;
    transition: background-color 0.2s ease-in;
    z-index: 1;
    cursor: pointer;
    outline: none;
    text-transform: uppercase;
    font-size: 22px;

    .icon::before {
      content: "×";
      position: static;
      display: inline;
      background-color: transparent;
      font-style: normal;
      font-family: arial, helvetica, sans-serif;
      font-weight: 700;
    }
  }

  .Content {
    width: 100%;
    height: 100%;

    .Row {
      margin: 0;
      padding-top: 2em;
      color: #ddd;

      @media (max-width: 1000px) {
        flex-direction: column;
        align-items: center;
        height: 100%;
      }

      & > div {
        background-color: transparent;
      }

      & > div:nth-child(2) {
        padding-left: 1em;
        margin-top: 1em;

        @media (min-width: 1000px) {
          margin-top: 0;
          align-self: flex-end;
        }

        & > p {
          text-align: left;
          color: #ddd;
          font-size: 0.8em;

          &:first-child {
            font-size: 1em;
            color: #fff;
          }
        }
      }
    }
  }
`);
