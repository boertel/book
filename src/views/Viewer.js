import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import './Viewer.css';
import { nextMedium, previousMedium } from '../navigation';

import Picture from '../components/Picture';
import Row from '../components/Row';


class Viewer extends Component {
    constructor(props) {
        super(props);
        this.onKeydown = this.onKeydown.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.onKeydown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeydown);
    }

    onKeydown(evt) {
        if (evt.key === 'k') {
            this.next();
        }
        if (evt.key === 'j') {
            this.previous();
        }
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    close() {
        const { index } = this.props;
        this.props.router.push(`/pages/${index}`);
    }

    next() {
        const { index, total, mediumIndex, mediumTotal } = this.props;
        this.props.router.push(nextMedium({index, total}, {index: mediumIndex, total: mediumTotal}));
    }

    previous() {
        const { index, total, mediumIndex, mediumTotal } = this.props;
        this.props.router.push(previousMedium({index, total}, {index: mediumIndex, total: mediumTotal}));
    }

    render() {
        const { medium } = this.props;
        return (
            <div className="Viewer">
                <Row>
                    <Picture {...medium} />
                </Row>
            </div>
        );
    }
}

function select(store, props) {
    const index = parseInt(props.params.index, 10);
    const mediumIndex = parseInt(props.params.medium, 10);
    const page = store.pages[index];
    // TODO(boertel) selector in case `reselect` is used
    const media = page.media.reduce((flat, row) => {
        return flat.concat(row);
    }, []);

    return {
        medium: media[mediumIndex],
        index,
        total: Object.keys(store.pages).length,
        mediumIndex,
        mediumTotal: media.length,
    };
}

export default connect(select)(withRouter(Viewer));
