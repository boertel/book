import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import styled from 'styled-components'

class Video extends Component {
    render() {
        const { className } = this.props

        let title = null
        if (this.props.title) {
            title = <p>{this.props.title}</p>
        }
        return (
            <div className={className}>
                <ReactPlayer {...this.props} width="80%" />
                {title}
            </div>
        )
    }
}

export default styled(Video)`
    margin: 1em auto;
    p {
        text-align: center;
        font-style: italic;
    }
`
