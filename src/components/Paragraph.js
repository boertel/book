import React from 'react'
import styled from 'styled-components'


const Paragraph = (props) => {
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
    return <p className={classNames.join(' ')} {...rest}>{props.children}</p>
}

export default styled(Paragraph)`
    background-color: ${props => props.active ? 'orange' : 'initial'};
`
