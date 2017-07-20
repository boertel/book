const initialState = {}

function block(id, state, value) {
    const data = Object.assign({}, state[id].data, {...value});
    return {[id]: Object.assign({}, state[id], {data,})}
}

export default function blocks(state=initialState, action) {
    let reference;
    let output = {};
    switch(action.type) {
        case 'BLOCKS_LOADED':
            return Object.assign({}, state, action.blocks);

        case 'ANCHOR_REGISTERED':
            return Object.assign({}, state, block(action.bid, state, {anchor: true}));

        case 'ANCHOR_UNREGISTERED':
            return Object.assign({}, state, block(action.bid, state, {anchor: false}));

        default:
            return state;
    }
}
