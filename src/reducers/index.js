import { combineReducers } from 'redux';

import blocks from './blocks';
import pages from './pages';
import albums from './albums';


export default combineReducers({
    blocks,
    pages,
    albums,
});
