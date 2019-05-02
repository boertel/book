import React, { Component } from "react";
import styled from "styled-components";
import { transparentize } from "polished";


class Responsive extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.active !== this.props.active ||
      nextProps.selected !== this.props.selected ||
      nextProps.className !== this.props.className ||
      (this.props.widthContainer === 0 && nextProps.widthContainer !== 0) ||
      this.props.style !== nextProps.style
    );
  }

  render() {
    const {
      active,
      anchor,
      widthContainer,
      heightContainer,
      aspectRatio,
      ratio,
      className,
    } = this.props;

    if (widthContainer === 0) {
      return null;
    }

    let width = Math.floor((widthContainer / ratio) * aspectRatio);
    let height = Math.floor(widthContainer / ratio);

    if (height > heightContainer) {
      height = Math.floor(heightContainer);
      width = height * aspectRatio;
    }

    const style = Object.assign({}, this.props.style, {
      width,
      height,
      active
    });

    let classNames = [className];
    if (active) {
      classNames.push("active");
    }
    if (anchor) {
      classNames.push("anchor");
    }

    const child = React.cloneElement(this.props.children, {
      width, height,
    })

    return (
      <div
        className={classNames.join(" ")}
        style={style}
        onClick={this.props.onClick}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
      >{child}</div>
    );
  }
}

export default styled(Responsive)`
  position: relative;
  cursor: pointer;
  background-color: ${props => props.theme.placeholder};

  &.anchor:after {
    content: " ";
    width: 8px;
    height: 8px;
    background-color: ${props => transparentize(0.4, props.theme.active)};
    border-radius: 8px;
    border: 2px solid ${props => props.theme.active};
    display: block;
    position: absolute;
    bottom: 0px;
    right: 0px;
    margin: 4px;
    pointer-events: none;
  }

  &.anchor:hover {
    cursor: pointer;
  }

  &.anchor.active:after,
  &.anchor:hover:after {
    background-color: ${props => props.theme.active};
  }

  img {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
`;
