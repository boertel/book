import React, { Component } from 'react'
import styled from 'styled-components'


const buildFlickrUrl = (photo, size) => {
    var extension = photo.extension || 'jpg';
    var base = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`;
    if (extension === 'gif') {
        size = 'o_d';
    }
    if (size !== undefined) {
        base += '_' + size;
    }
    return base + '.' + extension;
}

const threshold = (width, height) => {
    let limits = [
        { ext: 't', pixels: 100 },
        { ext: 'm', pixels: 240 },
        { ext: 'n', pixels: 320 },
        { ext: undefined, pixels: 500 },
        { ext: 'z', pixels: 640 },
        { ext: 'c', pixels: 800 },
        { ext: 'b', pixels: 1024 },
        { ext: 'h', pixels: 1600 },
        { ext: 'k', pixels: 2048 },
    ]
    var max = Math.max(width, height),
        i = 0;

    while (i > limits.length - 1 || max >= limits[i].pixels) {
        i += 1;
    }
    return limits[i].ext;
}


class Picture extends Component {
    constructor(props) {
        super(props)

        let size = threshold(props.width, props.height)
        this.state = {
            loaded: false,
            size,
        }
    }

    getUrl(props) {
        props = props || this.props
        let url
        if (typeof props.src === 'string') {
            url = props.src
        } else {
            if (props.src.type === 'flickr') {
                url = buildFlickrUrl(props.src, this.state.size)
            }
        }
        return url
    }

    shouldComponentUpdate(nextProps, nextState) {
        // TODO(boertel) when update window.height, it could need to be resize
        // it's actually widthContainer which CANNOT shrink and make the pictures
        // bigger and bigger when resizing. The container width should be agnostic
        // from the picture width
        return nextState.loaded !== this.state.loaded
    }

    componentWillReceiveProps(nextProps) {
        if (this.getUrl(nextProps) !== this.getUrl()) {
            this.load()
        }
    }

    load() {
        this.setState({
            loaded: false,
        })

        var image = new Image()
        image.onload = () => {
            this.setState({
                loaded: true,
            })
        }
        image.src = this.getUrl()
    }

    componentDidMount() {
        this.load()
    }

    render() {
        const url = this.getUrl()

        if (this.state.loaded) {
            return <img src={url} alt={url} onClick={this.props.onClick} />
        }
        return null
    }
}

export default Picture
