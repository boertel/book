import React from 'react';

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

export default App;
