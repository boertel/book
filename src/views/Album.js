import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import {
    loadAlbum,
} from '../actions/albums'

import Page from './Page'


class Album extends Component {
    constructor(props) {
        super(props)

        this.load = this.load.bind(this)
    }

    load(props) {
        props = props || this.props

        const {
            dispatch,
            match,
        } = props

        dispatch(loadAlbum(match.params.album))
    }

    componentDidMount() {
        this.load()
    }

    render() {
        const {
            pages,
        } = this.props

        if (pages === undefined) {
            return <div>Loading...</div>
        }

        return (
            <Route path='/:album/:index' component={Page} />
        )
    }
}


const mapStateToProps = (state, props) => {
    const { album } = props.match.params

    return {
        album,
        ...state.albums[album]
    }
}

export default connect(mapStateToProps)(Album)
