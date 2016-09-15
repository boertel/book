import React, { Component } from 'react';

import Anchor from './Anchor';


const mapping = {
    'paragraph': {
        type: 'p',
    },
    'link': {
        type: 'a',
    },
    'anchor': {
        type: Anchor,
        propKeys: ['reference'],
    }
};

function generate(nodes, depth) {
    depth = depth || 0;
    return nodes.map((node, i) => {
        if (node.kind === 'block') {
            const options = mapping[node.type];
            const propKeys = options.propKeys || ['className'];
            let props = {
                key: depth + ':' + i,
            };
            propKeys.forEach((key) => {
                props[key] = node[key];
            });
            const children = generate(node.nodes, depth + 1)
            return React.createElement(options.type, props, children);
        } else if (node.kind === 'text') {
            return node.text;
        }
        return null;
    });
}

export default class Description extends Component {
    render() {
        const children = generate(this.props.description.nodes);
        return (
            <div className="Description">{children}</div>
        );
    }
}
