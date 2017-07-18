const initialState = {}


export default (state=initialState, action) => {
    switch(action.type) {
        case 'ALBUMS_LOADED':
            return Object.assign({}, state, {[action.key]: action.data})
        default:
            return state
    }
}
