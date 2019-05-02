import React, { Component } from "react";
import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";

import { loadAlbum } from "../actions/albums";
import defaultTheme from "../theme";

class Album extends Component {
  load = () => {
    const { loadAlbum, name } = this.props;
    loadAlbum(name);
  };

  componentDidMount() {
    this.load();
  }

  render() {
    const { pages, color, } = this.props;

    if (pages === undefined) {
      return <div>Loading...</div>;
    }

    const theme = {
      ...defaultTheme,
      active: color
    };

    return <ThemeProvider theme={theme}>{this.props.children}</ThemeProvider>;
  }
}

const mapStateToProps = (state, { name }) => {
  return {
    ...state.albums[name]
  };
};

export default connect(
  mapStateToProps,
  { loadAlbum }
)(Album);
