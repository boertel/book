import { injectGlobal } from 'styled-components';


const theme = {
    active: '#27C69D',
}

injectGlobal`
    ::selection {
        background-color: ${theme.active};
    }
`

export default theme
