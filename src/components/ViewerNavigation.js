import React, { Component } from "react";
import styled from "styled-components";

class ViewerNavigation extends Component {
  render() {
    const { previous, next, counter, total, className } = this.props;

    return (
      <nav className={className}>
        <div className="counter">
          {counter + 1} sur {total}
        </div>
        <div className="previous" onClick={previous}>
          <div />
        </div>
        <div className="next" onClick={next}>
          <div />
        </div>
      </nav>
    );
  }
}

export default styled(ViewerNavigation)`
  position: absolute;
  bottom: 30px;
  right: 30px;

  .counter {
    font-size: 11px;
    font-size: 0.6875rem;
    line-height: 11px;
    line-height: 0.6875rem;
    font-weight: 400;
    font-family: nyt-franklin, arial, helvetica, sans-serif;
    color: #999;
    display: inline-block;
    margin-right: 15px;
    vertical-align: middle;
  }

  .previous,
  .next {
    transition: background-color 0.2s ease-in;
    background-color: #121212;
    display: inline-block;
    width: 40px;
    height: 40px;
    position: relative;
    border: 1px solid #333;
    vertical-align: bottom;
    cursor: pointer;

    &:hover {
      background-color: #333;
    }

    & > div {
      transition: border 0.2s ease-in;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -9px;
      margin-left: -9px;
      border-width: 9px 18px 9px 0;
      border-color: transparent #333 transparent transparent;
      border-style: inset solid inset inset;
    }
  }

  .previous {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;

    &:hover > div {
      border-color: transparent #fff transparent transparent;
    }
  }

  .next {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-left-width: 0;

    &:hover > div {
      border-color: transparent transparent transparent #fff;
    }

    & > div {
      border-width: 9px 0 9px 18px;
      border-color: transparent transparent transparent #333;
      border-style: inset inset inset solid;
    }
  }
`;
