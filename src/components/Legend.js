import React, { Component } from 'react';

import { connect } from 'react-redux';

import './Legend.css';

import Description from './Description';
import Datetime from './Datetime';

import { activate } from '../actions';


class Legend extends Component {
    onHover(id) {
        this.props.dispatch(activate(id));
    }

    render() {
        const { title, description, date } = this.props;
        return (
            <div className="Legend">
                <div>
                    <h2>{title}</h2>
                    <Description description={description} />
                    <Datetime date={date} />
                </div>
            </div>
        );
    }
}

export default connect()(Legend);
