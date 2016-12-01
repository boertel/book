import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';

import {
    Header,
    Footer,
} from './components';


class App extends Component {
    render() {
        if (!this.props.loaded) {
            return null;
        }

        const { index, total } = this.props;

        return (
            <div className="App">
                <Header title="Header" />
                <div>{this.props.children}</div>
                <Footer index={index} total={total} />
            </div>
        );
    }
}

function select(store, props) {
    return {
        loaded: true,
        index: parseInt(props.params.index, 10),
        total: 0,
    }
}

export default connect(select)(App);
