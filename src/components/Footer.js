import React, { Component } from "react";
import { Link } from '@reach/router';
import styled from "styled-components";

import { ArrowLeft, ArrowRight } from "react-feather";

const nextPage = page => {
  let url = `../${page.index + 1}`;
  if (page.index > page.total) {
    url = "/end";
  }
  return url;
};

const previousPage = page => {
  let url = `../${page.index - 1}`;
  if (page.index === 1) {
    url = "/";
  }
  return url;
};

class Footer extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.onKeydown);
  }

  componentWillUnmount() {
    window.addEventListener("keydown", this.onKeydown);
  }

  onKeydown = (evt) => {
    if (evt.target.tagName.toLowerCase() === "input") {
      return;
    }
    if (evt.key === "h") {
      this.previous();
    }
    if (evt.key === "l") {
      this.next();
    }
  }

  next = () => {
    const { index, total, navigate, } = this.props;
    navigate(nextPage({ index, total }));
  }

  previous = () => {
    const { index, total, navigate,} = this.props;
    navigate(previousPage({ index, total }));
  }

  render() {
    const { index, total, className } = this.props;

    const previous =
      index !== 1 ? (
        <Link to={previousPage({ index, total})}>
          <ArrowLeft /> Précedent
        </Link>
      ) : null;
    const next =
      index !== total ? (
        <Link to={nextPage({ index, total})}>
          Suivant <ArrowRight />
        </Link>
      ) : null;
    return (
      <div className={className}>
        <div className="arrow">{previous}</div>
        <div>
          <span className="current">{index}</span>&nbsp;
          <span className="total">/&nbsp;{total}</span>
        </div>
        <div className="arrow">{next}</div>
      </div>
    );
  }
}

export default styled(Footer)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 2em 0;

  .total {
    color: #888;
  }

  .arrow a {
    cursor: pointer;
    display: inline-flex;
    font-size: 0.8em;
    color: #000;

    &:visited {
      color: #000;
    }

    &:hover {
      color: ${props => props.theme.active};
    }

    svg {
      width: 18px;
      margin: 0 0.3em;
    }
  }
`;
