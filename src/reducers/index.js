import { combineReducers } from 'redux';

import blocks from './blocks';
import pages from './pages';


export default combineReducers({
    blocks,
    pages,
});
