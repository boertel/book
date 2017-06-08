import React, { Component } from 'react'
import { Feature } from 'react-mapbox-gl'
import { withRouter } from 'react-router-dom'

import {
    activate,
    deactivate,
} from '../actions';


class Marker extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);

        this.state = {
            onMouseOver: false,
        };
    }

    onClick() {
        console.log('onclick')
        const { index, history, path } = this.props;
        history.push(`/pages/${index}/${path}`)
    }

    onMouseOver() {
        console.log('mouseover')
        const { dispatch, path } = this.props;
        if (!this.state.onMouseOver) {
            dispatch(activate(path));
            this.setState({
                onMouseOver: true,
            });
        }
    }

    onMouseOut() {
        const { dispatch, path } = this.props;
        this.setState({
            onMouseOut: true,
        });
        dispatch(deactivate(path));
    }

    render() {
        const { path, coordinates } = this.props;

        return (
            <Feature
                key={path}
                onClick={this.onClick}
                onHover={this.onMouseOver}
                onEndHover={this.onMouseOut}
                coordinates={coordinates}
            />
        )
    }
}

export default withRouter(Marker)
