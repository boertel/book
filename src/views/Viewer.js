import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'

import Content from '../components/Content'


class Viewer extends Component {
    constructor(props) {
        super(props)
        this.onKeydown = this.onKeydown.bind(this)
        this.next = this.next.bind(this)
        this.previous = this.previous.bind(this)
        this.close = this.close.bind(this)
    }

    componentDidMount() {
        window.addEventListener('keydown', this.onKeydown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeydown)
    }

    onKeydown(evt) {
        if (evt.target.tagName.toLowerCase() === 'input') {
            return
        }
        if (evt.key === 'k' || evt.key === 'ArrowRight') {
            this.next()
        }
        if (evt.key === 'j' || evt.key === 'ArrowLeft') {
            this.previous()
        }
        if (evt.key === 'Escape') {
            this.close()
        }
    }

    close() {
        const {
            index,
            history,
        } = this.props;
        history.push(`/pages/${index}`)
    }

    next() {
        const {
            history,
            nextPath
        } = this.props
        history.push(nextPath)
    }

    previous() {
        const {
            history,
            previousPath,
        } = this.props
        history.push(previousPath)
    }

    render() {
        const {
            nodes,
            mediumIndex,
            className,
        } = this.props
        return (
            <div className={['Viewer', className].join(' ')} onClick={this.close}>
                <Content nodes={nodes} index={mediumIndex} />
            </div>
        )
    }
}


function select(store, props) {
    const { params } = props.match
    const index = parseInt(params.index, 10)
    let medium, mediumIndex

    // TODO(boertel) selector in case `reselect` is used
    const media = _.chain(store.blocks)
        .pick(store.pages[index].blocks)
        .pickBy((block) => block.data && block.data.viewer)
        .values()
        .value()

    if (params.medium.indexOf(':') !== -1) {
        const mediumId = params.medium
        medium = store.blocks[mediumId]
    }

    mediumIndex = media.indexOf(medium)
    let previousPath
    let nextPath

    if (mediumIndex === 0) {
        previousPath = `/pages/${index - 1}`;
    }

    if (mediumIndex > 0) {
        const previous = media[mediumIndex - 1]
        previousPath = `/pages/${index}/${previous.path}`
    }

    if (mediumIndex < media.length - 1) {
        const next = media[mediumIndex + 1]
        nextPath = `/pages/${index}/${next.path}`
    }

    if (mediumIndex + 1 > media.length - 1) {
        nextPath = `/pages/${index + 1}`;
    }

    const { title, location } = medium.data
    const text = {
        'kind': 'block',
        'type': 'paragraph',
        'data': {
            'width': 200,
            'height': window.innerHeight,
        },
        'nodes': [
            {'kind': 'text', 'text': title || ''},
            {'kind': 'text', 'text': location || ''}
        ]
    }

    // TODO(boertel) media is only one node right now, and always picture
    return {
        nodes: [
            {
                type: 'row',
                kind: 'block',
                path: `v${index}:${mediumIndex}`,
                nodes: [ medium, text ]
            }
        ],
        previousPath,
        nextPath,
        index,
    }
}

export default withRouter(connect(select)(styled(Viewer)`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;

    .Content {
        width: 100%;
        height: 100%;

        .Row {
            margin-top: 0;
            height: 100%;
        }
    }

    .legend {
        color: #fff;
        padding-left: 1em;
        margin-bottom: 5em;
        align-self: flex-end;
    }
`))
