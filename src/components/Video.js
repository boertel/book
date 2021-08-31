import React from "react";
import ReactPlayer from "react-player";
import styled, { withTheme } from "styled-components";

function Video({ className, width, height, url, theme, title }) {
  const onReady = p => {
    p.getInternalPlayer().setColor(theme.active);
  };

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
        onReady={onReady}
        url={url}
        width="80%"
        config={config}
        {...style}
      />
      {title && <p>{title}</p>}
    </div>
  );
}

export default styled(withTheme(Video))`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin-top: 8px;
    text-align: center;
    font-style: italic;
  }
`;
