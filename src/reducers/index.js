import { combineReducers } from 'redux';

import blocks from './blocks';
import pages from './pages';
import albums from './albums';

import photos from '../resources/photos/reducer';


export default combineReducers({
    blocks,
    pages,
    albums,
    photos,
});
