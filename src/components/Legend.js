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
        const { description, date, index } = this.props;
        return (
            <div className="Legend">
                <div>
                    <Description description={description} index={index} />
                    <Datetime date={date} />
                </div>
            </div>
        );
    }
}

export default connect()(Legend);
