import React from 'react';
import styled, { ThemeProvider } from 'styled-components'

import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

import {
    Album,
} from './views'

import theme from './theme'


const App = () => (
    <ThemeProvider theme={theme}>
        <Router>
            <Route path='/:album' component={Album} />
        </Router>
    </ThemeProvider>
)

export default styled(App)`
    height: 100%;
`
