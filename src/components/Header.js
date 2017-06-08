import React from 'react'
import styled from 'styled-components'


const Header = ({ className, title, }) => {
    return (
        <div className={className}>
            <span>{title}</span>
            <hr />
        </div>
    )
}

export default styled(Header)`
    position: relative;
    width: 100%;
    text-align: center;
    margin: 1em 0;

    hr {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        border: none;
        border-bottom: 1px solid #000;
        z-index: -1;
    }
    span {
        background-color: #fff;
        padding: 0 1em;
    }
`
