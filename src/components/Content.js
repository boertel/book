import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Anchor from './Anchor'
import Row from './Row'
import Picture from './Picture'
import Paragraph from './Paragraph'

import {
    activate,
    deactivate,
} from '../actions/blocks'


// TODO(boertel) replace native tag with custom one to support active and co
const mapping = {
    'paragraph': {
        type: Paragraph,
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
}

function generate(nodes, dispatch, index, history, i) {
    i = i || 0;
    nodes = nodes || [];
    return nodes.map((node) => {
        if (node.kind === 'block') {
            const options = mapping[node.type]
            const data = node.data || {}

            let props = Object.assign({}, {
                key: node.path,
            }, data)

            const children = generate(node.nodes, dispatch, index, history, i)
            // TODO(boertel) is this supposed to be here? can this be abstracted?
            if (data.viewer) {
                // TODO(boertel) can I use path always? instead of i
                const url = `/pages/${index}/${node.path}`
                const onClick = () => {
                    // only when not in viewer already
                    history.push(url)
                    console.log('hello')
                };
                i += 1
                props = Object.assign(props, {onClick})
            }
            if (data.anchor || data.coordinates) {
                const onMouseOver = () => {
                    dispatch(activate(node.path))
                }
                const onMouseOut = () => {
                    dispatch(deactivate(node.path))
                }
                props = Object.assign(props, {onMouseOver, onMouseOut})
            }
            return React.createElement(options.type, props, children)
        } else if (node.kind === 'text') {
            return node.text
        }
        return null
    })
}

class Content extends Component {
    render() {
        const {
            nodes,
            index,
            dispatch,
            history,
            className,
        } = this.props
        const children = generate(nodes, dispatch, index, history)
        return (
            <div className={['Content', className].join(' ')}>{children}</div>
        )
    }
}

function deserialize(root, dict) {
    let output = Object.assign({}, root)
    if (root.nodes) {
        output.nodes = []
        root.nodes.forEach((path) => {
            const node = dict[path]
            output.nodes = output.nodes.concat(deserialize(node, dict))
        })
    }
    return output
}

function select(store, props) {
    const root = store.blocks[props.root];
    const nodes = props.nodes || deserialize(root, store.blocks).nodes;
    return {
        nodes,
    }
}

export default withRouter(connect(select)(styled(Content)`
    h2 {
        margin-bottom: 1em;
    }

    .ref {
        border-bottom: 1px dotted orange;
        cursor: pointer;
    }

    .ref.active, .ref:hover {
        color: orange;
    }
`))
