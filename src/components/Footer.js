import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Footer.css';
import { nextPage, previousPage } from '../actions';


class Footer extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.onKeydown = this.onKeydown.bind(this)
    }

    componentDidMount() {
        window.addEventListener('keydown', this.onKeydown);
    }

    componentWillUnmount() {
        window.addEventListener('keydown', this.onKeydown);
    }

    onKeydown(evt) {
        if (evt.key === 'h') {
            this.previous();
        }
        if (evt.key === 'l') {
            this.next();
        }
    }

    next() {
        const { dispatch, index, total } = this.props;
        dispatch(nextPage({index, total}))
    }

    previous() {
        const { dispatch, index, total } = this.props;
        dispatch(previousPage({index, total}))
    }

    render() {
        const { index, total } = this.props;

        return (
            <div className="Footer">
                <div className="arrow">
                    <a onClick={this.previous}>&larr; Back</a>
                </div>
                <div><span className="current">{index}</span>&nbsp;<span className="total">/&nbsp;{total}</span></div>
                <div className="arrow">
                    <a onClick={this.next}>Next &rarr;</a>
                </div>
            </div>
        );
    }
}

export default connect()(Footer)
