import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'

import './Viewer.css'

import Content from '../components/Content'


const nextMedium = (page, medium) => {
    let url = `/pages/${page.index}/${medium.index + 1}`;
    if (medium.index + 1 > medium.total - 1) {
        url = `/pages/${page.index}`;
    }
    return url;
}

const previousMedium = (page, medium) => {
    let url = `/pages/${page.index}/${medium.index - 1}`;
    if (medium.index === 0) {
        url = `/pages/${page.index}`;
    }
    return url;
}


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
            dispatch,
            index,
            history,
        } = this.props;
        history.push(`/pages/${index}`)
    }

    next() {
        const {
            dispatch,
            index,
            total,
            mediumIndex,
            mediumTotal,
            history,
        } = this.props
        history.push(nextMedium({index, total}, {index: mediumIndex, total: mediumTotal}))
    }

    previous() {
        const {
            index,
            total,
            mediumIndex,
            mediumTotal,
            history,
        } = this.props
        history.push(previousMedium({index, total}, {index: mediumIndex, total: mediumTotal}))
    }

    render() {
        const {
            nodes,
            mediumIndex,
        } = this.props
        return (
            <div className="Viewer" onClick={this.close}>
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
    } else {
        mediumIndex = parseInt(params.medium, 10)
        medium = media[mediumIndex]
    }

    mediumIndex = media.indexOf(medium)
    // TODO(boertel) media is only one node right now, and always picture
    return {
        nodes: [
            {
                type: 'row',
                kind: 'block',
                path: `v${index}:${mediumIndex}`,
                nodes: [ medium ]
            }
        ],
        index,
        total: media.length,
        mediumIndex,
        mediumTotal: media.length,
    }
}

export default withRouter(connect(select)(Viewer))
