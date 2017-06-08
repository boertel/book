import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import { loadBlocks } from '../actions/blocks'

import { Content, Map, Header, Footer } from '../components'

import { Viewer } from '../views'


class Page extends Component {
    constructor(props) {
        super(props);
        this.onKeydown = this.onKeydown.bind(this);
    }

    componentDidMount() {
        const { dispatch, index } = this.props;
        dispatch(loadBlocks(index));
        window.addEventListener('keydown', this.onKeydown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeydown);
    }

    onKeydown(evt) {
        if (evt.key === 'j') {
            // TODO(boertel) open viewer from start/end
        }
        if (evt.key === 'k') {
        }
    }

    render() {
        const {
            children,
            blocks,
            index,
            total,
            className,
        } = this.props;
        if (!blocks) {
            return <div>Loading...</div>;
        }
        return (
            <div style={{ display: "flex", height: "100%" }}>
                {children}
                <div className={['Page', className].join(' ')}>
                    <Header title="Header" />
                    <Content root={blocks[0]} index={index} />
                    <Footer index={index} total={total} />
                </div>
                <Map index={index} />
                <Route path="/pages/:index/:medium" component={Viewer} />
            </div>
        );
    }
}

function select(store, props) {
    const index = props.match.params.index;
    const page = store.pages[index];
    const total = Object.keys(store.pages).length;
    return {
        index,
        total,
        ...page
    };
}

export default connect(select)(styled(Page)`
    display: flex;
    flex-direction: column;
    height: 100%;
    flex-basis: 60%;
    padding: 2em 2em 0 2em;
`);
