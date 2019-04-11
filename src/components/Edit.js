import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import chunk from "lodash/chunk";

import EditPhoto from "./EditPhoto";
import Row from "./Row";

import { loadPhotos } from "../resources/photos";

class Edit extends Component {
  load() {
    const photosetId = this.props.photosetId;
    this.props.loadPhotos(photosetId);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.onkeydown);
    window.addEventListener("keyup", this.onkeyup);
    this.load();
  }

  renderRows() {
    const { pictureIds } = this.props;

    const rows = chunk(pictureIds, 5);
    return rows.map((row, rowIndex) => {
      return (
        <Row key={rowIndex}>
          {row.map(pictureId => (
            <EditPhoto id={pictureId} key={pictureId} />
          ))}
        </Row>
      );
    });
  }

  render() {
    const { className, pictureIds } = this.props;

    if (pictureIds.length === 0) {
      return <div />;
    }

    return (
      <div className={className}>
        <div style={{ width: "80%" }}>{this.renderRows()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const photosetId = "72157677661164877";
  const order = state.photos.order[photosetId] || [];
  return {
    pictureIds: order,
    photosetId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadPhotos: photosetId => dispatch(loadPhotos(photosetId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(styled(Edit)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.95);
  height: 600px;
  z-index: 2;
  display: flex;

  & > div:first-child {
    overflow-y: auto;
  }

  input,
  textarea,
  button {
    margin-bottom: 1em;
    padding: 6px;
    border: none;
  }
`);
