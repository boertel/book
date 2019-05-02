import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

const Header = ({ className, title, }) => {
  return (
    <div className={className}>
      <Link to="../1">{title}</Link>
      <hr />
    </div>
  );
};

export default styled(Header)`
  position: relative;
  width: 100%;
  text-align: center;
  margin-top: 0.5em;
  margin-bottom: 1em;

  hr {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border: none;
    border-bottom: 1px solid #000;
    z-index: -1;
  }
  a {
    background-color: #fff;
    text-decoration: none;
    color: #000;
    padding: 0 1em;
  }
  a:hover {
    color: ${props => props.theme.active};
    text-decoration: underline;
  }
`;
