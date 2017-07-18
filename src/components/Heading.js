import React from 'react'
import styled from 'styled-components'


const Heading = (props) => {
    const {
        active,
        className,
        coordinates,
        anchor,
        type,
        ...rest,
    } = props

    return <h2 className={className} {...rest}>{props.children}</h2>
}

export default styled(Heading)`
    text-align: justify;
    background-color: ${props => props.active ? props.theme.active : 'initial'};
    border-color: ${props => props.theme.active};
    border-style: solid;
    border-width: 0;
    border-left-width: ${props => props.anchor ? '4px' : 0};
    padding-left: ${props => props.anchor ? '0.5em' : 0 };
`

