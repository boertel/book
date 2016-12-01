import React, { Component } from 'react';

import './Picture.css';


class Picture extends Component {
    constructor(props) {
        super(props);

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

    render() {
        const { active, anchor, src, widthContainer, aspectRatio, ratio } = this.props;

        const width = Math.floor((widthContainer / ratio) * aspectRatio);
        const height = Math.floor(widthContainer / ratio);

        const style = {
            width,
            height,
        };

        let classNames = ['Picture'];
        if (active) {
            classNames.push('active');
        }
        if (anchor) {
            classNames.push('anchor');
        }

        return (
            <div className={classNames.join(' ')} style={style} onMouseOver={this.props.onMouseOver} onMouseOut={this.props.onMouseOut}>
                {this.state.loaded ? <img src={src} alt={src} onClick={this.props.onClick} /> : null}
            </div>
        );
    }
}

export default Picture;
