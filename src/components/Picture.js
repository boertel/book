import React, { Component } from 'react'
import styled from 'styled-components'


class Picture extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // TODO(boertel) when update window.height, it could need to be resize
        // it's actually widthContainer which CANNOT shrink and make the pictures
        // bigger and bigger when resizing. The container width should be agnostic
        // from the picture width
        return nextState.loaded !== this.state.loaded || nextProps.active !== this.props.active
    }

    load() {
        this.setState({
            loaded: false,
        })

        var image = new Image()
        image.onload = () => {
            this.setState({
                loaded: true,
            })
        }
        image.src = this.props.src
    }

    componentDidMount() {
        this.load()
    }

    render() {
        const {
            active,
            anchor,
            src,
            widthContainer,
            aspectRatio,
            ratio,
            className,
        } = this.props

        const width = Math.floor((widthContainer / ratio) * aspectRatio)
        const height = Math.floor(widthContainer / ratio)

        const style = {
            width,
            height,
        }

        let classNames = ['Picture', className]
        if (active) {
            classNames.push('active')
        }
        if (anchor) {
            classNames.push('anchor')
        }

        return (
            <div className={classNames.join(' ')}
                style={style}
                onMouseOver={this.props.onMouseOver}
                onMouseOut={this.props.onMouseOut}>
                {this.state.loaded ? <img src={src} alt={src} onClick={this.props.onClick} /> : null}
            </div>
        );
    }
}

export default styled(Picture)`
    position: relative;
    cursor: pointer;

    &.anchor:after {
        content: " ";
        width: 8px;
        height: 8px;
        background-color: rgba(255, 165, 0, 0.4);
        border-radius: 8px;
        border: 2px solid orange;
        display: block;
        position: absolute;
        bottom: 0px;
        right: 0px;
        margin: 4px;
        pointer-events: none;
    }

    &.anchor:hover {
        cursor: pointer;
    }

    &.anchor.active:after, &.anchor:hover:after {
        background-color: orange;
    }

    img {
        display: inline-block;
        width: 100%;
        height: 100%;
    }
`
