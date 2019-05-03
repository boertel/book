import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { loadBlocks } from "../actions/blocks";

import { Content, Header, Footer, Map, } from "../components";

import { useQueryParam, } from 'use-query-params';

const BooleanParam = {
  encode: (bool) => bool ? 'true' : 'false',
  decode: (str) => str === 'true',
}



class Page extends Component {
  componentDidMount() {
    this.load();
    window.addEventListener("keydown", this.onKeydown);
  }


  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeydown);
  }

  componentDidUpdate(prevProps) {
    const { index } = this.props;
    if (prevProps.index !== index) {
      window.scrollTo(0, 0);
      this.load();
    }
  }

  load = () => {
    const {
      name,
      index,
      loadBlocks,
    } = this.props;
    loadBlocks(name, index);
  };

  onKeydown = evt => {
    if (evt.target.tagName.toLowerCase() === "input") {
      return;
    }
    if (evt.key === "j" || evt.key === "ArrowLeft") {
      // TODO(boertel) open viewer from start/end
      // something like: history.push(`/${album}/${index}/${path}`)
    }
    if (evt.key === "k" || evt.key === "ArrowRight") {
    }
  };

  render() {
    const { title, children, blocks, index, total, className, navigate, center, showMap, } = this.props;
    let content = <div>Loading...</div>;

    if (blocks) {
      content = <Content root={blocks[0]} index={index} navigate={navigate} />;
    }

    return (
      <div className={className}>
        <div className="Page">
          <Header title={title} />
          {content}
          <Footer index={index} total={total} navigate={navigate} />
        </div>
        <Map index={index} center={center} navigate={navigate} />
        {children}
      </div>
    );
  }
}

const mapStateToProps = (store, { index, name }) => {
  index = parseInt(index, 10);
  const page = store.pages[index];
  const album = store.albums[name];

  return {
    index,
    total: album.pages,
    title: album.title,
    center: album.center,
    ...page
  };
};

const QueryParamsExtraction = (props) => {
  const [ showMap, ] = useQueryParam('map', BooleanParam);
  return <Page {...props} showMap={showMap === undefined ? true : showMap} />
}

export default connect(
  mapStateToProps,
  { loadBlocks }
)(styled(QueryParamsExtraction)`
  display: flex;

  .Page {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1em 2em 0 2em;
    z-index: 1;
    background-color: #fff;
    flex-basis: 60%;
  }

  @media (max-width: 1000px) {
    flex-direction: column-reverse;

    .Page {
      padding: 0.8em 0.8em 0 0.8em;
      flex-basis: initial;
    }

    .Map {
      position: relative;
      height: 200px;
      width: 100%;
    }
  }
`);
