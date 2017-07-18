import React from 'react';
import styled, { ThemeProvider } from 'styled-components'

import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

import {
    Page,
} from './views'

import theme from './theme'


const App = () => (
    <ThemeProvider theme={theme}>
        <Router>
            <Route path='/:album/:index' component={Page} />
        </Router>
    </ThemeProvider>
)

export default styled(App)`
    height: 100%;
`
