import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import './Footer.css';


const nextPage = (page) => {
    let url = `/pages/${page.index + 1}`;
    if (page.index > page.total) {
        url = '/end';
    }
    return url;
}

const previousPage = (page) => {
    let url = `/pages/${page.index - 1}`;
    if (page.index === 1) {
        url = '/pages/';
    }
    return url;
}


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
        const { history, index, total } = this.props;
        history.push(nextPage({index, total}))
    }

    previous() {
        const { history, index, total } = this.props;
        history.push(previousPage({index, total}))
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

export default withRouter(Footer)
