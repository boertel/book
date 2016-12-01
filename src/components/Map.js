import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import _ from 'lodash';

import './Map.css';

import {
    activate,
    deactivate,
} from '../actions';


const config = {
    accessToken: 'pk.eyJ1IjoiYm9lcnRlbCIsImEiOiJFV0tXLTQ4In0.4PRhZjzKIuWuhy2ytRi7Eg',
    style: 'mapbox://styles/mapbox/streets-v8'
};

const containerStyle = {
  height: "100vh",
  width: "100vw"
};

class Map extends Component {
    shouldComponentUpdate() {
        // TODO(boertel) why?
        return false;
    }

    onClick(marker) {
        const { index, dispatch } = this.props;
        dispatch(push(`/pages/${index}/${marker.path}`));
    }

    onMouseOver(marker) {
        const { dispatch } = this.props;
        if (marker.data.anchor) {
            dispatch(activate(marker.path));
        }
    }

    onMouseOut(marker) {
        const { dispatch } = this.props;
        if (marker.data.anchor) {
            dispatch(deactivate(marker.path));
        }
    }

    renderFeatures(features) {
        return features.map((marker, index) => {
            return <Feature
                        key={marker.path}
                        onClick={this.onClick.bind(this, marker)}
                        onHover={this.onMouseOver.bind(this, marker)}
                        onEndHover={this.onMouseOut.bind(this, marker)}
                        coordinates={marker.data.coordinates} />
        });
    }

    render() {
        const markers = this.renderFeatures(this.props.markers);
        const circles = this.renderFeatures(this.props.circles);
        console.log(circles, markers);
        return (
            <div className="Map">
                <ReactMapboxGl
                    center={[ -73.97469444444445, 40.764297222222226 ]}
                    accessToken={config.accessToken}
                    style={config.style}
                    containerStyle={containerStyle}>
                    <Layer
                        type="symbol"
                        id="marker"
                        layout={{'icon-image': 'marker-15', }}>
                        {markers}
                    </Layer>

                    <Layer
                        type="circle"
                        id="circle"
                        paint={{'circle-radius': 100, 'circle-color': 'rgba(0, 255, 0, 0.3)' }}>
                        {circles}
                    </Layer>
                </ReactMapboxGl>
            </div>
        );
    }
}

function select(store, props) {
    const { index } = props;
    const features = _.chain(store.blocks)
        .pick(store.pages[index].blocks)
        .pickBy((block) => block.data && block.data.coordinates)
        .values()
        .value();

    const markers = features.filter((feature) => feature.data.type === 'marker');
    const circles = features.filter((feature) => feature.data.type === 'circle');

    return {
        markers,
        circles,
    }
}

export default connect(select)(Map);
