import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './App';
import './index.css';

import {
    Page,
    Viewer,
} from './views';

import createStore from './store';
import reducers from './reducers';


const store = createStore(reducers);
const history = syncHistoryWithStore(browserHistory, store);


ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <Route path="/pages/:index" component={Page}>
                    <Route path="/pages/:index/:medium" component={Viewer} />
                </Route>
            </Route>
        </Router>
    </Provider>
    ), document.getElementById('root')
);
