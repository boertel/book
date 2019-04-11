import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import ResponsivePicture from "./ResponsivePicture";
import { selectPhoto } from "../resources/photos";

class EditPhoto extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.select();
  }

  render() {
    return <ResponsivePicture {...this.props} onClick={this.onClick} />;
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
