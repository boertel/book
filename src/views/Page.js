import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import { loadBlocks } from '../actions/blocks'

import {
    Content,
    Map,
    Header,
    Footer,
    Edit,
} from '../components'

import { Viewer } from '../views'


class Page extends Component {
    constructor(props) {
        super(props)
        this.onKeydown = this.onKeydown.bind(this)
    }

    componentDidMount() {
        const { dispatch, index } = this.props
        dispatch(loadBlocks(index))
        window.addEventListener('keydown', this.onKeydown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeydown)
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch, index } = nextProps
        if (nextProps.index !== this.props.index) {
            dispatch(loadBlocks(index))
        }
    }

    onKeydown(evt) {
        if (evt.target.tagName.toLowerCase() === 'input') {
            return
        }
        if (evt.key === 'j') {
            // TODO(boertel) open viewer from start/end
        }
        if (evt.key === 'k') {
        }
    }

    render() {
        const {
            title,
            children,
            blocks,
            index,
            total,
            className,
        } = this.props;
        let content = <div>Loading...</div>;
        let viewer = null;

        if (blocks) {
            content = <Content root={blocks[0]} index={index} />
            viewer = <Route path="/pages/:index/:medium" component={Viewer} />
        }

        return (
            <div className={className}>
                {children}
                <div className="Page">
                    <Header title={title} />
                    {content}
                    <Footer index={index} total={total} />
                </div>
                <Map index={index} />
                {viewer}
                <Edit />
            </div>
        );
    }
}

function select(store, props) {
    const index = parseInt(props.match.params.index, 10)
    const page = store.pages[index]
    //const total = Object.keys(store.pages).length
    const total = 3

    // TODO(boertel) hardcoded
    return {
        index,
        total,
        title: 'Rome',
        ...page
    };
}

export default connect(select)(styled(Page)`
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
