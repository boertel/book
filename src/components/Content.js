import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Anchor from './Anchor'
import Row from './Row'
import ResponsivePicture from './ResponsivePicture'
import Paragraph from './Paragraph'
import Heading from './Heading'
import Video from './Video'

import {
    activate,
    deactivate,
} from '../actions/blocks'

const mapStateToProps = (state, props) => {
    const { data } = state.blocks[props.path]
    const { active } = state.activation[props.path] || {}

    return {
        key: props.path,
        anchor: (data && data.coordinates !== undefined),
        active,
        onClick: (data && data.viewer) ? props.onClick : undefined,
        ...data,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    let onMouseOver, onMouseOut

    if (props.coordinates) {
        onMouseOver = () => dispatch(activate(props.path))
        onMouseOut = () => dispatch(deactivate(props.path))
    }
    return {
        onMouseOver,
        onMouseOut,
    }
}

const Title = (props) => <h1 {...props} />

const blockify =connect(mapStateToProps, mapDispatchToProps)


// TODO(boertel) replace native tag with custom one to support active and co
const mapping = {
    'paragraph': {
        type: blockify(Paragraph),
    },
    'div': {
        type: 'div',
    },
    'link': {
        type: 'a',
    },
    'anchor': {
        type: Anchor,
    },
    'title': {
        type: blockify(Title),
    },
    'heading': {
        type: blockify(Heading),
    },
    'row': {
        type: blockify(Row),
    },
    'picture': {
        type: blockify(ResponsivePicture),
    },
    'root': {
        type: 'div',
    },
    'video': {
        type: blockify(Video),
    }
}

function generate(nodes, dispatch, index, history, i) {
    i = i || 0;
    nodes = nodes || [];
    return nodes.map((node) => {
        if (node.kind === 'block') {
            const options = mapping[node.type]
            const children = generate(node.nodes, dispatch, index, history, i)
            const props = {
                key: node.path,
                path: node.path,
                onClick: () => history.push(`${index}/${node.path}`),
                ...node.data
            }
            return React.createElement(options.type, props, children)
        } else if (node.kind === 'text') {
            return node.text
        }
        return null
    })
}

class Content extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.index !== this.props.index
    }

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
            <div className={['Content', className].join(' ')}>
                {children}
            </div>
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
    h1 {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
    }
    h2 {
        margin-top: 1.5em;
        margin-bottom: 0.5em;
    }

    .ref {
        border-bottom: 1px dotted orange;
        cursor: pointer;
    }

    .ref.active, .ref:hover {
        color: orange;
    }
`))
