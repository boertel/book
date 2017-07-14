import React from 'react'
import styled from 'styled-components'


const Heading = (props) => {
    const {
        active,
        className,
        coordinates,
        type,
        ...rest,
    } = props
    let classNames = [className]

    if (active) {
        classNames.push('active')
    }
    return <h2 className={classNames.join(' ')} {...rest}>{props.children}</h2>
}

export default styled(Heading)`
    text-align: justify;
    background-color: ${props => props.active ? props.theme.active : 'initial'};
`

