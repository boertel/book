import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Row from './Row';
import Picture from './Picture';


class Media extends Component {
    renderRow(row) {
        return row.map((medium) => {
            return <Picture {...medium} key={medium.id} onClick={this.onClick.bind(this)} />
        });
    }

    onClick(i) {
        this.props.router.push('/pages/' + this.props.params.index + '/' + i);
        return false;
    }

    render() {
        const { media } = this.props;

        const rows = media.map((row, i) => {
            return (
                <Row key={i} offset={i}>{this.renderRow(row)}</Row>
            );
        });

        return (
            <div className="Media">{rows}</div>
        );
    }
}

export default withRouter(Media);
