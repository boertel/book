import React, { Component } from "react";
import ReactPlayer from "react-player";
import styled, { withTheme } from "styled-components";

class Video extends Component {
  onReady = (p) => {
    p.getInternalPlayer().setColor(this.props.theme.active);
  }

  render() {
    const { className, width, height, url, theme } = this.props;
    let title = null;
    if (this.props.title) {
      title = <p>{this.props.title}</p>;
    }
    const style = {
      width,
      height
    };

    const config = {
      vimeo: {
        playerOptions: {
          color: theme.active
        }
      }
    };

    return (
      <div className={className} style={style}>
        <ReactPlayer
          onReady={this.onReady}
          url={url}
          width="80%"
          config={config}
          {...style}
          ref={this.ref}
        />
        {title}
      </div>
    );
  }
}

export default styled(withTheme(Video))`
  p {
    text-align: center;
    font-style: italic;
  }
`;
