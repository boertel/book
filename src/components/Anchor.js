import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
    activate,
    deactivate,
    register,
    unregister,
} from '../actions';


class Anchor extends Component {
    componentDidMount() {
        this.props.register();
    }

    componentWillUnmount() {
        this.props.unregister();
    }

    render() {
        const { children, active, count } = this.props;
        if (React.Children.count(children) > 1) {
            console.error("Anchor must have one and only one child");
            return null;
        }

        const child = React.Children.toArray(children)[0];

        let classNames = [];
        if (child.props.className) {
            classNames.push(child.props.className);
        }
        // works only when at least 2 anchors have the same reference.
        if (active && count > 1) {
            classNames.push('active');
        }

        return React.cloneElement(child, {
            className: classNames.join(' '),
            onMouseOver: this.props.activate,
            onMouseOut: this.props.deactivate,
        });
    }
}

function select(store, props) {
    const { reference } = props;
    return {
        ...store.anchors[reference],
    };
}

function actions(dispatch, props) {
    // TODO(boertel) maybe no need to dispatch de/activate actions when there is only one anchor
    return {
        activate: () => dispatch(activate(props.reference)),
        deactivate: () => dispatch(deactivate(props.reference)),
        register: () => dispatch(register(props.reference)),
        unregister: () => dispatch(unregister(props.reference)),
    }
}

export default connect(select, actions)(Anchor);
