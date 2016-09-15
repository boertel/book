const initialState = {};

function anchor(id, state, value) {
    return Object.assign({}, state, {[id]: Object.assign({}, state[id], value)});
}

export default function anchors(state=initialState, action) {
    switch(action.type) {
        case 'ANCHOR_REGISTER': {
            const { id } = action;
            const count = state[id] ? state[id].count : 0;
            return anchor(id, state, { count: count + 1 });
        }

        case 'ANCHOR_UNREGISTER': {
            const { id } = action;
            const count = state[id].count;
            return anchor(id, state, { count: count - 1 });
        }

        case 'ANCHOR_ACTIVATE': {
            return anchor(action.id, state, { active: true });
        }

        case 'ANCHOR_DEACTIVATE': {
            return anchor(action.id, state, { active: false });
        }

        default:
            return state;
    }
}
