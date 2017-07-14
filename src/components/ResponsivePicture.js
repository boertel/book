import React, { Component } from 'react'
import styled from 'styled-components'

import Picture from './Picture'


class ResponsivePicture extends Component {
    shouldComponentUpdate(nextProps) {
        return (
            nextProps.active !== this.props.active
            || (this.props.widthContainer === 0 && nextProps.widthContainer !== 0)
            || (this.props.style !== nextProps.style)
        )
    }

    render() {
        const {
            active,
            anchor,
            widthContainer,
            heightContainer,
            aspectRatio,
            ratio,
            src,
            className,
        } = this.props

        if (widthContainer === 0) {
            return null
        }

        let width = Math.floor((widthContainer / ratio) * aspectRatio)
        let height = Math.floor(widthContainer / ratio)

        if (height > heightContainer) {
            height = Math.floor(heightContainer)
            width = height * aspectRatio
        }

        const style = Object.assign({}, this.props.style, {
            width,
            height,
            active,
        })

        let classNames = [className]
        if (active) {
            classNames.push('active')
        }
        if (anchor) {
            classNames.push('anchor')
        }

        return (
            <div className={classNames.join(' ')}
                style={style}
                onClick={this.props.onClick}
                onMouseOver={this.props.onMouseOver}
                onMouseOut={this.props.onMouseOut}>
                <Picture src={src} width={width} height={height} />
            </div>
        )

    }
}

export default styled(ResponsivePicture)`
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
