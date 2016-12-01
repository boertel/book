import React, { Component } from 'react';

import { connect } from 'react-redux';

import { loadBlocks } from '../actions';

import {
    Content,
} from '../components';

import './Page.css';


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
        const { children, blocks, index } = this.props;
        if (!blocks) {
            return <div>Loading...</div>;
        }
        return (
            <div className="Page">
                {children}
                <Content root={blocks[0]} index={index} />
            </div>
        );
    }
}


function select(store, props) {
    const index = props.params.index;
    const page = store.pages[index];
    return {
        index,
        ...page,
    };
}

export default connect(select)(Page);
