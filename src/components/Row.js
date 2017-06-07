import React, { Component } from 'react';

import './Row.css';


function aspectRatio(props) {
    return props.width / props.height;
}


export default class Row extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            height: 0,
        };

        this.resize = this.resize.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.width > 0;
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    componentDidMount() {
        this.resize();
        window.addEventListener('resize', this.resize);
    }

    resize() {
        this.setState({
            width: this._row.offsetWidth,
        });
    }

    render() {
        const { active, offset } = this.props;
        const ratio = React.Children.toArray(this.props.children).reduce((ratio, image) => {
            return ratio + aspectRatio(image.props);
        }, 0);

        const children = React.Children.map(this.props.children, (child, i) => {
            return React.cloneElement(child, {
                ratio,
                aspectRatio: aspectRatio(child.props),
                widthContainer: this.state.width,
                i: (i + offset),
            });
        });

        let classNames = ['Row'];
        if (active) {
            classNames.push('active');
        }

        return (
            <div className={classNames.join(' ')} ref={(row) => { this._row = row }}>
                {children}
            </div>
        );
    }
}
