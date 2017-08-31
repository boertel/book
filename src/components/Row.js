import React, { Component } from 'react'
import styled from 'styled-components'


function aspectRatio(props) {
    return props.width / props.height
}

const MARGIN = 20


class Row extends Component {
    constructor(props) {
        super(props)

        this.state = {
            width: 0,
            height: 0,
        }
        this.resize = this.resize.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.width > 0
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    componentDidMount() {
        this.resize()
        window.addEventListener('resize', this.resize)
    }

    resize() {
        const offset = (React.Children.count(this.props.children) - 1) * MARGIN
        this.setState({
            width: this._row.offsetWidth - offset,
            height: window.innerHeight * 0.8,
        });
    }

    render() {
        const {
            active,
            className,
        } = this.props

        const ratio = React.Children.toArray(this.props.children).reduce((ratio, image) => {
            return ratio + aspectRatio(image.props);
        }, 0)

        const children = React.Children.map(this.props.children, (child, i) => {
            return React.cloneElement(child, {
                ratio,
                aspectRatio: aspectRatio(child.props),
                widthContainer: this.state.width,
                heightContainer: this.state.height,
            })
        });

        let classNames = ['Row', className];
        if (active) {
            classNames.push('active')
        }

        return (
            <div className={classNames.join(' ')} ref={(row) => { this._row = row }}>
                {children}
            </div>
        )
    }
}

export default styled(Row)`
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 1em 0;


    &.active {
        border: 4px solid orange;
    }

    & > div {
        margin-right: ${MARGIN}px;
        align-self: center;
    }

    & > div:last-child {
        margin-right: 0;
    }
`
