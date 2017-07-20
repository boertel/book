import { combineReducers } from 'redux'

import blocks from './blocks'
import pages from './pages'
import albums from './albums'
import activation from './activation'


export default combineReducers({
    blocks,
    pages,
    albums,
    activation,
});
