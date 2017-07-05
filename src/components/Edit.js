import React, { Component } from 'react'
import styled from 'styled-components'


class Edit extends Component {
    render() {
        const { className } = this.props
        return (
            <div className={className}>
                <button>Paragraph</button>
                <button>Picture</button>
            </div>
        )
    }
}

export default styled(Edit)`
    padding: 1em;
`
