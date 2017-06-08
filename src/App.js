import React from 'react';
import styled from 'styled-components'

import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

import {
    Page,
} from './views'


const App = () => (
    <Router>
        <Route path='/pages/:index' component={Page} />
    </Router>
)

export default styled(App)`
    height: 100%;
`
