import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
    Legend,
} from '../components';

import './Page.css';


class Page extends Component {
    render() {
        const { legend, media, index } = this.props;
        const children = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {
                media,
            });
        });


        return (
            <div className="Page">
                {children}
                <Legend {...legend} index={index} />
            </div>
        );
    }
}


function select(store, props) {
    const index = parseInt(props.params.index, 10);
    const page = store.pages[index];
    return {
        index,
        ...page,
    };
}

export default connect(select)(Page);
