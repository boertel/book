import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import _ from "lodash";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { activate, deactivate } from "../actions/blocks";

const config = {
  accessToken:
    "pk.eyJ1IjoiYm9lcnRlbCIsImEiOiJFV0tXLTQ4In0.4PRhZjzKIuWuhy2ytRi7Eg",
  style: "mapbox://styles/boertel/ciqy9y3fl0001bpnohs9hdps8"
};

const createSource = features => {
  return {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: features
    }
  };
};

const createFeatures = data => {
  return data.map(feature => {
    const viewer = feature.data.viewer;
    const index = parseInt(feature.path.split(":")[0], 10);
    return {
      type: "Feature",
      properties: {
        path: feature.path,
        viewer,
        index
      },
      geometry: {
        type: "Point",
        coordinates: feature.data.coordinates
      }
    };
  });
};

const getBounds = markers => {
  let bounds = new mapboxgl.LngLatBounds();
  markers.forEach(({ data }) => bounds.extend(data.coordinates));
  return bounds;
};

class Map extends Component {
  shouldComponentUpdate(nextProps) {
    const { markers, index } = nextProps;
    if (this.map.isStyleLoaded() && markers.length) {
      // wait until markers have been fetch or next page
      if (
        !_.isEqual(this.props.markers, markers.length) ||
        this.props.index !== index
      ) {
        this.updateSource(nextProps);
        this.map.setFilter("markers", ["==", "index", index]);
        this.map.setFilter("markers-hover", [
          "all",
          ["==", "index", index],
          ["==", "path", ""]
        ]);

        this.map.fitBounds(getBounds(markers), { padding: 120 });
      }
      const actives = markers
        .filter(m => m.data && m.data.active === true)
        .map(({ path }) => path);
      this.map.setFilter("markers-hover", [
        "all",
        ["==", "index", index],
        ["in", "path", ...actives]
      ]);
    }
    return false;
  }

  updateSource(props) {
    const { index, markers } = props;

    const features = createFeatures(markers, index) || [];
    const source = createSource(features);

    if (this.map.getSource("markers")) {
      if (features.length) {
        this.map.getSource("markers").setData(source.data);
      }
    } else {
      this.map.addSource("markers", source);
    }
  }

  onMapLoad = () => {
    const { dispatch, markers, navigate } = this.props;
    this.updateSource(this.props);

    this.map.addLayer({
      id: "markers",
      type: "symbol",
      source: "markers",
      layout: { "icon-image": "marker-15" }
    });

    this.map.addLayer({
      id: "markers-hover",
      type: "symbol",
      source: "markers",
      layout: {
        "icon-image": "marker-15",
        "icon-size": 1.6
      },
      filter: ["==", "path", ""]
    });

    this.map.on("mouseenter", "markers", evt => {
      const { path } = evt.features[0].properties;
      dispatch(activate(path));
      this.map.setFilter("markers-hover", ["==", "path", path]);
    });

    this.map.on("mouseleave", "markers-hover", evt => {
      dispatch(deactivate());
      this.map.setFilter("markers-hover", ["==", "path", ""]);
    });

    this.map.on("click", "markers-hover", evt => {
      const { viewer, path } = evt.features[0].properties;
      if (viewer) {
        navigate(path);
      }
    });

    if (markers.length) {
      this.map.fitBounds(getBounds(markers), { padding: 120 });
    }
  };

  componentDidMount() {
    const { center, } = this.props;

    const maxZoom = 16;

    mapboxgl.accessToken = config.accessToken;
    this.map = new mapboxgl.Map({
      keyboard: false,
      container: this.container,
      center,
      zoom: 12,
      maxZoom,
      style: config.style
    });

    this.map.on("load", this.onMapLoad);

    // TODO(boertel) edit mode redux
    this.map.on("click", evt => {
      const coords = [evt.lngLat.lng, evt.lngLat.lat];
      window.COORDINATES = coords;
      console.log(window.COORDINATES);
    });
  }

  render() {
    const { className } = this.props;
    return (
      <div className={["Map", className].join(" ")}>
        <div ref={div => (this.container = div)} />
      </div>
    );
  }
}

const mapStateToProps = (store, props) => {
  const { index } = props;
  let features = [];
  if (Object.keys(store.blocks).length !== 0 && store.pages[index]) {
    features = _.chain(store.blocks)
      .pick(store.pages[index].blocks)
      .pickBy(
        block =>
          block.data &&
          block.data.coordinates &&
          block.data.coordinates[0] !== 0 &&
          block.data.coordinates[1] !== 0
      )
      .values()
      .value();
  }

  const markers = features.filter(feature => feature.data.type === "marker");

  return {
    markers
  };
};

export default connect(mapStateToProps)(styled(Map)`
  position: relative;
  height: 100%;
  width: 40%;

  .mapboxgl-map {
    height: 100%;
    @media (min-width: 1000px) {
      position: fixed;
      width: inherit;
    }
  }

  canvas {
    outline: none;
  }
`);
