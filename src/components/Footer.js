import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';

import './Footer.css';
import { nextPage, previousPage } from '../navigation';


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
        const { index, total } = this.props;
        this.props.router.push(nextPage({index, total}));
    }

    previous() {
        const { index, total } = this.props;
        this.props.router.push(previousPage({index, total}));
    }

    render() {
        const { index, total } = this.props;

        return (
            <div className="Footer">
                <div className="arrow">
                    <Link to={previousPage({index, total})}>&larr; Back</Link>
                </div>
                <div><span className="current">{index}</span>&nbsp;<span className="total">/&nbsp;{total}</span></div>
                <div className="arrow">
                    <Link to={nextPage({index, total})}>Next &rarr;</Link>
                </div>
            </div>
        );
    }
}

export default withRouter(Footer)
