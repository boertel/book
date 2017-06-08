import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import mapboxgl from 'mapbox-gl'

import {
    activate,
    deactivate,
} from '../actions/blocks'


const config = {
    accessToken: 'pk.eyJ1IjoiYm9lcnRlbCIsImEiOiJFV0tXLTQ4In0.4PRhZjzKIuWuhy2ytRi7Eg',
    style: 'mapbox://styles/mapbox/streets-v8'
}

const containerStyle = {
    height: '100%',
    width: 'inherit',
    position: 'fixed',
}

// TODO(boertel) split up this file
const createLayer = (id, data, options) => {
    options = options || {}
    const source = {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': data.map((feature) => {
                return {
                    type: 'Feature',
                    properties: {
                        path: feature.path,
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: feature.data.coordinates,
                    }
                }
            })
        }
    }

    let layer = {
        id,
        type: options.type,
        source,
    }

    const optional = ['paint', 'layout', 'filter']
    optional.forEach((attr) => {
        if (options[attr]) {
            layer[attr] = options[attr]
        }
    })

    return layer
}

const generateFilter = (data) => {
    const activeFeatures = data
        .filter((feature) => feature.data && feature.data.active === true)
        .map(({path}) => path)
    if (activeFeatures.length > 0) {
        return ['in', 'path'].concat(activeFeatures)
    } else {
        return ['==', 'path', '']
    }
}


class Map extends Component {
    constructor(props) {
        super(props)
        this._done = false
        this._layers = []
    }

    componentWillReceiveProps(nextProps) {
        this._layers.forEach((layer) => {
            const filter = generateFilter(nextProps[layer])
            this.map.setFilter(`${layer}-hover`, filter)
        })
    }

    createHoveredLayers(id, options) {
        const data = this.props[id]

        this._layers.push(id)
        this.map.addLayer(createLayer(id, data, {
            type: options.type,
            paint: options.paint,
            layout: options.layout
        }))

        const hoverId = `${id}-hover`
        this.map.addLayer(createLayer(hoverId, data, {
            type: options.type,
            paint: options.hoverPaint,
            layout: options.hoverLayout,
            filter: options.filter,
        }))

        const {
            dispatch,
            history,
            index,
        } = this.props

        const mouseenter = (evt) => {
            const properties = evt.features[0].properties
            dispatch(activate(properties.path))
            this.map.setFilter(hoverId, ['==', 'path', properties.path])
        }
        const mouseleave = (evt) => {
            dispatch(deactivate())
            this.map.setFilter(hoverId, ['==', 'path', ''])
        }

        const click = (evt) => {
            const properties = evt.features[0].properties
            history.push(`/pages/${index}/${properties.path}`)
        }

        this.map.on('click', id, click)
        this.map.on('mouseenter', id, mouseenter)
        this.map.on('mouseleave', id, mouseleave)
    }

    componentDidMount() {
        mapboxgl.accessToken = config.accessToken
        this.map = new mapboxgl.Map({
            keyboard: false,
            container: this.container,
            center: [-100.486052, 37.830348],
            zoom: 2,
            style: config.style,
        })

        this.map.on('load', () => {
            this._done = true

            this.createHoveredLayers('markers', {
                type: 'symbol',
                layout: {
                    'icon-image': 'marker-15'
                },
                hoverLayout: {
                    'icon-image': 'marker-15',
                    'icon-size': 1.3,
                },
                filter: ['==', 'path', '']
            })

            // TODO(boertel) color comes from styled theme
            this.createHoveredLayers('circles', {
                type: 'circle',
                paint: {
                    'circle-radius': 100,
                    'circle-color': 'rgba(255, 165, 0, 0.3)',
                },
                hoverPaint: {
                    'circle-radius': 100,
                    'circle-color': 'rgba(255, 165, 0, 0.8)',
                },
                filter: ['==', 'path', '']
            })
        })

    }

    render() {
        const { className } = this.props
        return (
            <div className={className}>
                <div style={containerStyle} ref={(div) => this.container = div}></div>
            </div>
        )
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

export default withRouter(connect(select)(styled(Map)`
    position: relative;
    height: 100%;
    width: 40%;
`))
