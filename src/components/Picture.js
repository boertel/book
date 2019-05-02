import React, { Component } from "react";

const buildFlickrUrl = (photo, size) => {
  var extension = photo.extension || "jpg";
  var base = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${
    photo.id
  }_${photo.secret}`;
  if (extension === "gif") {
    size = "o_d";
  }
  if (size !== undefined) {
    base += "_" + size;
  }
  return base + "." + extension;
};

let _cache = {};

const threshold = (width, height) => {
  let limits = [
    { ext: "t", pixels: 100 },
    { ext: "m", pixels: 240 },
    { ext: "n", pixels: 320 },
    { ext: undefined, pixels: 500 },
    { ext: "z", pixels: 640 },
    { ext: "c", pixels: 800 },
    { ext: "b", pixels: 1024 },
    { ext: "h", pixels: 1600 },
    { ext: "k", pixels: 2048 }
  ];
  var max = Math.max(width, height),
    i = 0;

  if (!_cache[max]) {
    while (i > limits.length - 1 || max >= limits[i].pixels) {
      i += 1;
    }
    _cache[max] = limits[i].ext;
  }
  return _cache[max];
};

class Picture extends Component {
  constructor(props) {
    super(props);

    this._image = new Image();
    this.state = {
      loaded: false,
      url: this.getUrl(),
    };
  }

  getUrl = (props, refresh) => {
    props = props || this.props;
    const size = threshold(props.width, props.height);
    let url;
    if (typeof props.src === "string") {
      url = props.src;
    } else {
      if (props.src.type === "flickr") {
        url = buildFlickrUrl(props.src, refresh ? undefined : size);
      }
    }
    return url;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.loaded !== this.state.loaded;
  }

  componentDidUpdate(prevProps) {
    if (this.getUrl(prevProps) !== this.getUrl()) {
      this.load();
    }
  }

  load = (refresh) => {
    this.setState({
      loaded: false
    });

    this._image.addEventListener("load", this.onLoad);
    this._image.addEventListener("error", this.onError);
    const url = this.getUrl(this.props, refresh);
    this._image.src = url;
    if (this.state.url !== url) {
      this.setState({
        url,
      })
    }
  }

  onError = () => {
    this.load(true);
  }

  onLoad = () => {
    this.setState({
      loaded: true
    });
  }

  componentWillUnmount() {
    this._image.removeEventListener("load", this.onLoad);
    this._image.removeEventListener("error", this.onError);
  }

  componentDidMount() {
    this.load();
  }

  render() {
    if (this.state.loaded) {
      return <img src={this.state.url} alt={this.state.url} onClick={this.props.onClick} />;
    }
    return null;
  }
}

export default Picture;
