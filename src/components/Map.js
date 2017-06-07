import React, { Component } from 'react';
//import ReactMapboxGl, { Layer } from 'react-mapbox-gl';
import { connect } from 'react-redux';
import _ from 'lodash';

import './Map.css';

import Marker from './Marker';

import {
    activate,
    deactivate,
} from '../actions/blocks';


const config = {
    accessToken: 'pk.eyJ1IjoiYm9lcnRlbCIsImEiOiJFV0tXLTQ4In0.4PRhZjzKIuWuhy2ytRi7Eg',
    style: 'mapbox://styles/mapbox/streets-v8'
};

const containerStyle = {
    height: '100%',
    width: 'inherit',
    position: 'fixed',
};

class Map extends Component {
    shouldComponentUpdate() {
        // TODO(boertel) why?
        return false;
    }

    onClick(marker) {
        const { index, dispatch } = this.props;
        //dispatch(push(`/pages/${index}/${marker.path}`));
    }

    onMouseOver(marker) {
        const { dispatch } = this.props;
        dispatch(activate(marker.path));
    }

    onMouseOut(marker) {
        const { dispatch } = this.props;
        dispatch(deactivate(marker.path));
    }

    renderFeatures(features, bounds) {
        return features.map((marker, index) => {
            bounds.push(marker.data.coordinates);
            return <Marker
                        key={marker.path}
                        path={marker.path}
                        onClick={this.onClick.bind(this, marker)}
                        onHover={this.onMouseOver.bind(this, marker)}
                        onEndHover={this.onMouseOut.bind(this, marker)}
                        coordinates={marker.data.coordinates} />
        });
    }

    render() {
        let bounds = [];

        const markers = this.renderFeatures(this.props.markers, bounds);
        const circles = this.renderFeatures(this.props.circles, []);

        return (
            <div className="Map"> </div>
        );
    }
}

/*
<ReactMapboxGl
    center={[-74.50, 40]}
    fitBounds={bounds}
    accessToken={config.accessToken}
    zoom={[13]}
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
*/


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
