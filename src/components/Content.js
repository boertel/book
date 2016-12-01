import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Anchor from './Anchor';
import Row from './Row';
import Picture from './Picture';

import {
    activate,
    deactivate,
} from '../actions';

import './Content.css';


const mapping = {
    'paragraph': {
        type: 'p',
    },
    'link': {
        type: 'a',
    },
    'anchor': {
        type: Anchor,
    },
    'heading': {
        type: 'h2',
    },
    'row': {
        type: Row,
    },
    'picture': {
        type: Picture,
    },
    'root': {
        type: 'div',
    },
};

function generate(nodes, dispatch, index, i) {
    i = i || 0;
    nodes = nodes || [];
    return nodes.map((node) => {
        if (node.kind === 'block') {
            const options = mapping[node.type];
            const data = node.data || {};

            let props = Object.assign({}, {
                key: node.path,
            }, data);

            const children = generate(node.nodes, dispatch, index, i);
            // TODO(boertel) is this supposed to be here? can this be abstracted?
            if (data.viewer) {
                const url = `/pages/${index}/${i}`;
                const onClick = () => {
                    dispatch(push(url));
                };
                i += 1;
                const onMouseOver = () => {
                    if (data.anchor) {
                        dispatch(activate(node.path));
                    }
                };
                const onMouseOut = () => {
                    if (data.anchor) {
                        dispatch(deactivate(node.path));
                    }
                };
                props = Object.assign({}, props, {onClick, onMouseOver, onMouseOut});
            }
            return React.createElement(options.type, props, children);
        } else if (node.kind === 'text') {
            return node.text;
        }
        return null;
    });
}

class Content extends Component {
    render() {
        const { nodes, index, dispatch } = this.props;
        const children = generate(nodes, dispatch, index);
        return (
            <div className="Content">{children}</div>
        );
    }
}

function deserialize(root, dict) {
    let output = Object.assign({}, root);
    if (root.nodes) {
        output.nodes = [];
        root.nodes.forEach((path) => {
            const node = dict[path];
            output.nodes = output.nodes.concat(deserialize(node, dict));
        });
    }
    return output;
}

function select(store, props) {
    const root = store.blocks[props.root];
    const nodes = props.nodes || deserialize(root, store.blocks).nodes;
    return {
        nodes,
    };
}

export default connect(select)(Content);
