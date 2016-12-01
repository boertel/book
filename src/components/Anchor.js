import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    deactivate,
    activate,
    register,
    unregister,
} from '../actions';


class Anchor extends Component {
    constructor(props) {
        super(props);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        // TODO(boertel) go through actions
    }

    onMouseOver() {
        this.props.activate()
    }

    onMouseOut() {
        this.props.deactivate()
    }

    componentDidMount() {
        this.props.register();
    }

    componentWillUnmount() {
        this.props.unregister();
    }

    render() {
        const { active } = this.props;
        const child = React.Children.toArray(this.props.children)[0];
        // not pretty
        const className = active ? 'ref active' : 'ref';
        return React.cloneElement(child, {
            onMouseOver: this.onMouseOver,
            onMouseOut: this.onMouseOut,
            onClick: this.onClick,
            className,
        });
    }
}

function actions(dispatch, props) {
    const { reference } = props;
    return {
        deactivate: () => dispatch(deactivate(reference)),
        activate: () => dispatch(activate(reference)),
        register: () => dispatch(register(reference)),
        unregister: () => dispatch(unregister(reference)),
    }
}

export default connect(null, actions)(Anchor);
