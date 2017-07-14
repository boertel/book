import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import { ArrowLeft, ArrowRight } from 'react-feather'


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
        if (evt.target.tagName.toLowerCase() === 'input') {
            return
        }
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
        const {
            index,
            total,
            className,
        } = this.props;

        return (
            <div className={className}>
                <div className="arrow">
                    <a onClick={this.previous}><ArrowLeft /> Précedent</a>
                </div>
                <div><span className="current">{index}</span>&nbsp;<span className="total">/&nbsp;{total}</span></div>
                <div className="arrow">
                    <a onClick={this.next}>Suivant <ArrowRight /></a>
                </div>
            </div>
        );
    }
}

export default withRouter(styled(Footer)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 2em 0;

    .total {
        color: #888;
    }

    .arrow a {
        cursor: pointer;
        display: inline-flex;
        font-size: 0.8em;

        svg {
            margin: 0 0.3em;
        }
    }
`)
