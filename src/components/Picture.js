import React, { Component } from 'react'


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

let _cache = {}

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


    if (!_cache[max]) {
        while (i > limits.length - 1 || max >= limits[i].pixels) {
            i += 1;
        }
        _cache[max] = limits[i].ext
    }
    return _cache[max]
}


class Picture extends Component {
    constructor(props) {
        super(props)

        this._image = new Image()
        this.onload = this.onload.bind(this)
        const size = threshold(props.width, props.height)
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

        this._image.addEventListener('load', this.onload)
        this._image.src = this.getUrl()
    }

    onload() {
        this.setState({
            loaded: true,
        })
    }

    componentWillUnmount() {
        this._image.removeEventListener('load', this.onload)
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
