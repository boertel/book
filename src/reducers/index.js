import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import anchors from './anchors';
import pages from './pages';


export default combineReducers({
    anchors,
    pages,
    routing: routerReducer,
});
