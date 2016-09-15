import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Anchor from './Anchor';
import './Picture.css';


class Picture extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);

        this.state = {
            loaded: false,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.loaded !== this.state.loaded || nextProps.widthContainer !== 0 || nextProps.widthContainer !== this.props.widthContainer;
    }

    load() {
        this.setState({
            loaded: false,
        });

        var image = new Image();
        image.onload = () => {
            this.setState({
                loaded: true,
            });
        };
        image.src = this.props.src;
    }

    componentDidMount() {
        this.load();
    }

    onClick() {
        this.props.onClick(this.props.i);
    }

    render() {
        const { id, src, widthContainer, aspectRatio, ratio } = this.props;

        const width = Math.floor((widthContainer / ratio) * aspectRatio);
        const height = Math.floor(widthContainer / ratio);

        const style = {
            width,
            height,
        };

        let classNames = ["Picture"];
        return (
            <Anchor reference={id}>
                <div className={classNames.join(' ')} style={style} onClick={this.onClick}>
                    {this.state.loaded ? <img src={src} alt={src} /> : null}
                </div>
            </Anchor>
        );
    }
}

export default withRouter(Picture);
