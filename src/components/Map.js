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

const createSource = (data, index) => {
    return {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': data.map((feature) => {
                return {
                    type: 'Feature',
                    properties: {
                        path: feature.path,
                        index,
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: feature.data.coordinates,
                    }
                }
            })
        }
    }
}

// TODO(boertel) split up this file
const createLayer = (id, options) => {
    options = options || {}

    let layer = {
        id,
        type: options.type,
        source: id,
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
        console.log('constructor map')
        this._layers = []
    }

    getBounds() {
        let bounds = new mapboxgl.LngLatBounds();
        this._layers.forEach((layer) => {
            this.props[layer].map(({data}) => bounds.extend(data.coordinates))
        })
        return bounds
    }

    shouldComponentUpdate() {
        return false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.index !== this.props.index) {
            if (this._layers.indexOf(`markers-${nextProps.index}`) === -1) {
                this.createLayers(nextProps.index, nextProps)
            }
            this._layers.forEach((layer) => {
                this.map.setFilter(`${layer}-hover`, ['==', 'index', nextProps.index])
                this.map.setFilter(`${layer}`, ['==', 'index', nextProps.index])
            })
        } else {
            this._layers.forEach((layer) => {
                if (nextProps[layer]) {
                    const filter = generateFilter(nextProps[layer])
                    this.map.setFilter(`${layer}-hover`, filter)
                }
            })
        }
    }

    createHoveredLayers(id, options, props) {
        const {
            dispatch,
            history,
            index,
        } = props
        const data = props[id]

        this._layers.push(id)
        const source = createSource(data, index)

        this.map.addSource(id, source)
        this.map.addLayer(createLayer(id, {
            type: options.type,
            paint: options.paint,
            layout: options.layout
        }))

        const hoverId = `${id}-hover`
        this.map.addSource(hoverId, source)
        this.map.addLayer(createLayer(hoverId, {
            type: options.type,
            paint: options.hoverPaint,
            layout: options.hoverLayout,
            filter: options.filter,
        }))


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

    createLayers(index, props) {
        this.createHoveredLayers(`markers-${index}`, {
            type: 'symbol',
            layout: {
                'icon-image': 'marker-15'
            },
            hoverLayout: {
                'icon-image': 'marker-15',
                'icon-size': 1.3,
            },
            filter: ['==', 'path', '']
        }, props)

        // TODO(boertel) color comes from styled theme
        this.createHoveredLayers(`circles-${index}`, {
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
        }, props)
    }

    componentDidMount() {
        console.log('mount')
        const {
            index,
        } = this.props

        mapboxgl.accessToken = config.accessToken
        this.map = new mapboxgl.Map({
            keyboard: false,
            container: this.container,
            center: [-100.486052, 37.830348],
            zoom: 2,
            style: config.style,
        })

        this.map.on('load', () => {
            this.createLayers(index, this.props)
            const bounds = this.getBounds()
            //this.map.fitBounds(bounds, { padding: 120})
        })
    }

    render() {
        console.log('render map')
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
    let features = []
    if (Object.keys(store.blocks).length !== 0) {
        features = _.chain(store.blocks)
            .pick(store.pages[index].blocks)
            .pickBy((block) => block.data && block.data.coordinates)
            .values()
            .value();
    }

    const markers = features.filter((feature) => feature.data.type === 'marker');
    const circles = features.filter((feature) => feature.data.type === 'circle');

    let output = {}
    output[`markers-${index}`] = markers
    output[`circles-${index}`] = circles
    return output
}

export default withRouter(connect(select)(styled(Map)`
    position: relative;
    height: 100%;
    width: 40%;

    canvas {
        outline: none;
    }
`))
