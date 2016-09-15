import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import {
    loadPages,
} from './actions';

import {
    Header,
    Footer,
} from './components';


class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(loadPages());
    }

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
    const total = Object.keys(store.pages).length;
    return {
        loaded: !!total,
        index: parseInt(props.params.index, 10),
        total: total,
    }
}

export default connect(select)(App);
