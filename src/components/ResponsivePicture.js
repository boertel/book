import React, { Component } from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';

import Picture from './Picture';

class ResponsivePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widthContainer: this.props.widthContainer || 0,
      heightContainer: this.props.heightContainer,
      aspectRatio: this.props.aspectRatio,
      ratio: this.props.ratio,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.active !== this.props.active ||
      (this.props.widthContainer === 0 && nextProps.widthContainer !== 0) ||
      (this.state.widthContainer === 0 && nextState.widthContainer !== 0) ||
      this.props.style !== nextProps.style
    );
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.widthContainer === 0 && nextProps.widthContainer !== 0) {
      this.setState({
        widthContainer: nextProps.widthContainer,
        heightContainer: nextProps.heightContainer,
      })
    }
  }

  componentDidMount() {
    if (this._picture && !this.props.ratio) {
      console.log('no row', this.props)
      this.setState({
        widthContainer: this._picture.offsetWidth,
        heightContainer: window.innerHeight,
        ratio: this.props.width / this.props.height,
        aspectRatio: this.props.width / this.props.height,
      });
    }
  }

  render() {
    const { active, anchor, src, className } = this.props;
    const { widthContainer, heightContainer, ratio, aspectRatio } = this.state;

    if (widthContainer === 0) {
      return (
        <div
          style={{ width: '100%', height: '100%' }}
          ref={picture => {
            this._picture = picture;
          }}
        />
      );
    }
    console.log('render');

    let width = Math.floor(widthContainer / ratio * aspectRatio);
    let height = Math.floor(widthContainer / ratio);

    if (height > heightContainer) {
      height = Math.floor(heightContainer);
      width = height * aspectRatio;
    }

    const style = Object.assign({}, this.props.style, {
      width,
      height,
      active,
    });

    let classNames = [className];
    if (active) {
      classNames.push('active');
    }
    if (anchor) {
      classNames.push('anchor');
    }

    return (
      <div
        className={classNames.join(' ')}
        ref={picture => {
          this._picture = picture;
        }}
        style={style}
        onClick={this.props.onClick}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
      >
        <Picture src={src} width={width} height={height} />
      </div>
    );
  }
}

export default styled(ResponsivePicture)`
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

    &.anchor.active:after, &.anchor:hover:after {
        background-color: ${props => props.theme.active};
    }

    img {
        display: inline-block;
        width: 100%;
        height: 100%;
    }
`;
