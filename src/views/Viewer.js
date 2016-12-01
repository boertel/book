import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import './Viewer.css';
import { nextMedium, previousMedium } from '../actions';

import Content from '../components/Content';


class Viewer extends Component {
    constructor(props) {
        super(props);
        this.onKeydown = this.onKeydown.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.close = this.close.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.onKeydown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeydown);
    }

    onKeydown(evt) {
        if (evt.key === 'k' || evt.key === 'ArrowRight') {
            this.next();
        }
        if (evt.key === 'j' || evt.key === 'ArrowLeft') {
            this.previous();
        }
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    close() {
        const { dispatch, index } = this.props;
        dispatch(push(`/pages/${index}`));
    }

    next() {
        const { dispatch, index, total, mediumIndex, mediumTotal } = this.props;
        dispatch(nextMedium({index, total}, {index: mediumIndex, total: mediumTotal}));
    }

    previous() {
        const { index, total, mediumIndex, mediumTotal, dispatch } = this.props;
        dispatch(previousMedium({index, total}, {index: mediumIndex, total: mediumTotal}));
    }

    render() {
        const { nodes, mediumIndex } = this.props;
        return (
            <div className="Viewer" onClick={this.close}>
                <Content nodes={nodes} index={mediumIndex} />
            </div>
        );
    }
}

import _ from 'lodash';

function select(store, props) {
    const index = parseInt(props.params.index, 10);
    const mediumIndex = parseInt(props.params.medium, 10);
    // TODO(boertel) selector in case `reselect` is used
    const media = _.chain(store.blocks)
        .pick(store.pages[index].blocks)
        .pickBy((block) => block.data && block.data.viewer)
        .values()
        .value();

    // TODO(boertel) media is only one node right now, and always picture
    return {
        nodes: [
            {
                type: 'row',
                kind: 'block',
                path: `v${index}:${mediumIndex}`,
                nodes: [
                    media[mediumIndex]
                ]
            }
        ],
        index,
        total: media.length,
        mediumIndex,
        mediumTotal: media.length,
    };
}

export default connect(select)(Viewer);
