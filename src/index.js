import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

const logger = createLogger();

import App from './App';
import './index.css';
import reducers from './reducers';

import {
    Page,
    Viewer,
} from './views';

import {
    Media,
} from './components';


const store = createStore(reducers, applyMiddleware(thunk, logger));
const history = syncHistoryWithStore(browserHistory, store);


ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <Route path="/pages/:index" component={Page}>
                    <IndexRoute component={Media} />
                    <Route path="/pages/:index/:medium" component={Viewer} />
                </Route>
            </Route>
        </Router>
    </Provider>
    ), document.getElementById('root')
);
