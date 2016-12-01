import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import blocks from './blocks';
import pages from './pages';


export default combineReducers({
    blocks,
    pages,
    routing: routerReducer,
});
