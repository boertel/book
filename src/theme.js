import { injectGlobal } from 'styled-components';


const theme = {
    active: '#27C69D',
    placeholder: 'rgba(238, 238, 238, 1)',
}

injectGlobal`
    ::selection {
        background-color: ${theme.active};
    }
`

export default theme
