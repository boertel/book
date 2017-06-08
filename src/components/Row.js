import React, { Component } from 'react'
import styled from 'styled-components'


function aspectRatio(props) {
    return props.width / props.height;
}


class Row extends Component {
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
        const {
            active,
            offset,
            className,
        } = this.props;
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

        let classNames = ['Row', className];
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

export default styled(Row)`
    display: flex;
    width: 100%;
    margin: 1em 0;

    &.active {
        border: 4px solid orange;
    }

    & > div {
        margin-right: 1em;
    }

    & > div:last-child {
        margin-right: 0;
    }
`
