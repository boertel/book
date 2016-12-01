const pages = {
    '2': {
        nodes: [
            {
                kind: 'block',
                type: 'heading',
                nodes: [ { kind: 'text', text: 'My Title' } ],
            },
            {
                kind: 'block',
                type: 'row',
                nodes: [
                    {
                        kind: 'block',
                        type: 'picture',
                        data: {
                            viewer: true,
                            id: 6,
                            src: 'http://placehold.it/350x150',
                            width: 350,
                            height: 150,
                        }
                    },
                    {
                        kind: 'block',
                        type: 'picture',
                        data: {
                            viewer: true,
                            id: 7,
                            src: 'http://placehold.it/350x160',
                            width: 350,
                            height: 160,
                            type: 'marker',
                            coordinates: [ -73.97469444444445, 40.764297222222226 ]
                        }
                    },
                    {
                        kind: 'block',
                        type: 'picture',
                        data: {
                            viewer: true,
                            id: 8,
                            src: 'http://placehold.it/350x170',
                            width: 350,
                            height: 170,
                            type: 'circle',
                            coordinates: [ -73.97630277777778, 40.75462777777778 ]
                        }
                    }
                ]
            },
            {
                kind: 'block',
                type: 'paragraph',
                nodes: [
                    { kind: 'text', text: 'lon description', },
                    {
                        kind: 'block',
                        type: 'anchor',
                        data: {
                            reference: '2:1:1',
                        },
                        nodes: [
                            {
                                kind: 'block',
                                type: 'link',
                                data: {
                                    className: 'ref',
                                },
                                nodes: [
                                    { kind: 'text', text: ' my link', },
                                ]
                            },
                        ]
                    },
                ]
            },
        ]
    }
}

function serialize(parent, depth) {
    // TODO(boertel) shouldn't get this kind of recursive data from a server but from the interactive UI
    let output = {};
    if (depth) {
        output = {
            [depth] : {
                type: 'root',
                kind: 'block',
                path: '' + depth,
                nodes: []
            }
        };
    }
    parent.nodes.forEach((node, j) => {
        node.path = ((parent.path || depth) + ':' + j);
        if (depth) {
            output[depth].nodes.push(node.path);
        }
        output[node.path] = node;
        if (node.nodes) {
            output = Object.assign({}, output, serialize(node));
            node.nodes = node.nodes.map((child) => child.path);
        }
    });
    return output;
}

function loadBlocks(pid) {
    return (dispatch) => {
        const page = pages[pid];
        return dispatch({
            type: 'BLOCKS_LOADED',
            blocks: serialize(page, pid),
            pid,
        });
    };
}

function activate(bid) {
    return {
        type: 'BLOCK_ACTIVATE',
        bid,
    }
}

function deactivate(bid) {
    return {
        type: 'BLOCK_DEACTIVATE',
        bid,
    }
}

function register(bid) {
    return {
        type: 'ANCHOR_REGISTERED',
        bid,
    }
}

function unregister(bid) {
    return {
        type: 'ANCHOR_UNREGISTERED',
        bid,
    }
}


export default {
    loadBlocks,
    activate,
    deactivate,
    register,
    unregister,
}
