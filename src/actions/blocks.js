const pages = {
    '2': {
        nodes: [
            {
                kind: 'block',
                type: 'heading',
                nodes: [ { kind: 'text', text: 'Hawaii' } ],
            },
            {
                kind: 'block',
                type: 'paragraph',
                nodes: [ { kind: 'text', text: 'In August 2016, I\'ve been to Big Island with my brother. I was my second time in Hawaii after being on Maui in April the same year.' } ]
            },
            {
                kind: 'block',
                type: 'row',
                data: {
                    type: 'circle',
                    coordinates: [ -73.7877805556, 40.6446583333 ]
                },
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
                            coordinates: [ -73.8067083, 40.65416 ]
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
                            type: 'marker',
                            coordinates: [ -74.0066083, 41.7455472 ]
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
                            reference: '2:2:1',
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

export function loadBlocks(pid) {
    return (dispatch) => {
        const page = pages[pid];
        return dispatch({
            type: 'BLOCKS_LOADED',
            blocks: serialize(page, pid),
            pid,
        });
    };
}

export function activate(bid) {
    return {
        type: 'BLOCK_ACTIVATE',
        bid,
    }
}

export function deactivate(bid) {
    return {
        type: 'BLOCK_DEACTIVATE',
        bid,
    }
}

export function register(bid) {
    return {
        type: 'ANCHOR_REGISTERED',
        bid,
    }
}

export function unregister(bid) {
    return {
        type: 'ANCHOR_UNREGISTERED',
        bid,
    }
}
