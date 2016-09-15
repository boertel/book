function activate(id) {
    return {
        type: 'ANCHOR_ACTIVATE',
        id,
    };
}

function deactivate(id) {
    return {
        type: 'ANCHOR_DEACTIVATE',
        id,
    };
}

function register(id) {
    return {
        type: 'ANCHOR_REGISTER',
        id,
    }
}

function unregister(id) {
    return {
        type: 'ANCHOR_UNREGISTER',
        id,
    }
}


export default {
    activate,
    deactivate,
    register,
    unregister,
}
