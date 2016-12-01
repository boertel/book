import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';


const logger = createLogger({
    predicate: process.env.NODE_ENV !== 'production',
    collapsed: true,
    colors: {
        title: false
    }
});

const router = routerMiddleware(browserHistory);
export default applyMiddleware(router, thunk, logger)(createStore);
