import React, { Component } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

class Video extends Component {
  render() {
    const { className, width, height, url, } = this.props;
    let title = null;
    if (this.props.title) {
      title = <p>{this.props.title}</p>;
    }
    const style = {
      width,
      height,
    };
    return (
      <div className={className} style={style}>
        <ReactPlayer url={url} width="80%" {...style} />
        {title}
      </div>
    );
  }
}

export default styled(Video)`
  p {
    text-align: center;
    font-style: italic;
  }
`;
