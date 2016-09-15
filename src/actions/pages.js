const pages = {
    1: {
        media: [
            [
                {
                    src: 'http://placehold.it/1050x900',
                    width: 1050,
                    height: 900,
                    id: 1,
                },
            ],
            [
                {
                    id: 2,
                    src: 'http://placehold.it/350x150',
                    width: 350,
                    height: 155,
                },
                {
                    id: 3,
                    src: 'http://placehold.it/350x160',
                    width: 350,
                    height: 160,
                },
                {
                    id: 4,
                    src: 'http://placehold.it/350x170',
                    width: 350,
                    height: 170,
                },
            ]
        ],
        legend: {
            title: 'My Title',
            description: {
                nodes: [
                    {
                        kind: 'block',
                        type: 'paragraph',
                        nodes: [
                            { kind: 'text', text: 'long description', },
                            {
                                kind: 'block',
                                type: 'anchor',
                                reference: '1',
                                nodes: [
                                    {
                                        kind: 'block',
                                        type: 'link',
                                        className: 'ref',
                                        nodes: [
                                            { kind: 'text', text: ' my link', },
                                        ]
                                    },
                                ]
                            },
                        ]
                    }
                ]
            },
            date: '2016-09-20',
            location: {
                name: 'San Francisco, CA, USA',
            }
        }
    },
    2: {
        media: [
            [
                {
                    id: 6,
                    src: 'http://placehold.it/350x150',
                    width: 350,
                    height: 150,
                },
                {
                    id: 7,
                    src: 'http://placehold.it/350x150',
                    width: 350,
                    height: 150,
                },
                {
                    id: 8,
                    src: 'http://placehold.it/350x150',
                    width: 350,
                    height: 150,
                },
            ]
        ],
        legend: {
            title: 'My Title',
            description: {
                nodes: [
                    {
                        kind: 'block',
                        type: 'paragraph',
                        nodes: [
                            { kind: 'text', text: 'long description', },
                            {
                                kind: 'block',
                                type: 'anchor',
                                reference: '1',
                                nodes: [
                                    {
                                        kind: 'block',
                                        type: 'link',
                                        className: 'ref',
                                        nodes: [
                                            { kind: 'text', text: ' my link', },
                                        ]
                                    },
                                ]
                            },
                        ]
                    }
                ]
            },
            date: '2016-09-21',
            location: {
                name: 'San Francisco, CA, USA',
            }
        }
    }
}

function loadPages() {
    return {
        type: 'PAGE_LOADED',
        pages,
    }
}


export default {
    loadPages,
}
