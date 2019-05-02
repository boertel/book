import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Responsive from "./Responsive";
import Picture from './Picture';
import { selectPhoto } from "../resources/photos";

class EditPhoto extends Component {
  onClick = () => {
    this.props.select();
  };

  render() {
    const { src, ...etc } = this.props;
    return <Responsive {...etc} onClick={this.onClick}><Picture src={src} /></Responsive>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.photos.entities[ownProps.id]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    select: () => dispatch(selectPhoto(ownProps.id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(styled(EditPhoto)`
  border-width: 1px;
  border-style: solid;
  border-color: ${props => (props.selected === true ? "green" : "transparent")};
`);
