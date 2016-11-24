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

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    componentDidMount() {
        this.resize();
        window.addEventListener('resize', this.resize);
    }

    resize() {
        console.log(this._row.offsetWidth);
        this.setState({
            width: this._row.offsetWidth,
        });
    }

    render() {
        const ratio = React.Children.toArray(this.props.children).reduce((ratio, image) => {
            return ratio + aspectRatio(image.props);
        }, 0);


        const children = React.Children.map(this.props.children, (child, i) => {
            return React.cloneElement(child, {
                ratio,
                aspectRatio: aspectRatio(child.props),
                widthContainer: this.state.width,
                i: (i + this.props.offset),
            });
        });

        const style = Object.assign({}, {width: '100%'}, this.props.style);

        return (
            <div className="Row" style={style} ref={(row) => { this._row = row }}>
                {children}
            </div>
        );
    }
}
