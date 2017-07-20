import forOwn from 'lodash/forOwn'

const initialState = {}

function block(id, state, value) {
    return {[id]: Object.assign({}, state[id], {...value})}
}

export default function activation(state=initialState, action) {
    switch(action.type) {
        case 'BLOCK_ACTIVATE':
            return Object.assign({}, state, block(action.bid, state, { active: true }))
        case 'BLOCK_DEACTIVATE':
            let newState = {}
            forOwn(state, (value, key) => {
                if (value.active === true) {
                    newState = Object.assign(newState, block(key, state, { active: false }))
                }
            })
            return Object.assign({}, state, newState)
        default:
            return state
    }
}
