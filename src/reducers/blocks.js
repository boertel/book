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

        case 'BLOCK_ACTIVATE':
            for (let key in state) {
                if (state.hasOwnProperty(key)) {
                    const node = state[key];
                    if (node.data && node.data.reference === action.bid) {
                        output = block(key, state, {active: true});
                    }
                }
            }
            reference = block(action.bid, state, {active: true});
            return Object.assign({}, state, Object.assign(reference, output));

        case 'BLOCK_DEACTIVATE':
            for (let key in state) {
                if (state.hasOwnProperty(key)) {
                    const node = state[key];
                    if (node.data) {
                        if (action.bid !== undefined && node.data.reference === action.bid) {
                            output = block(key, state, {active: false});
                        } else if (action.bid === undefined && node.data.active === true) {
                            output = Object.assign(output, block(key, state, {active: false}))
                        }
                    }
                }
            }
            if (action.bid) {
                // update the original referenceitself
                reference = block(action.bid, state, {active: false});
                return Object.assign({}, state, Object.assign(reference, output));
            }
            return Object.assign({}, state, output);

        case 'ANCHOR_REGISTERED':
            return Object.assign({}, state, block(action.bid, state, {anchor: true}));

        case 'ANCHOR_UNREGISTERED':
            return Object.assign({}, state, block(action.bid, state, {anchor: false}));

        default:
            return state;
    }
}
