import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'

import axios from 'axios'
import chunk from 'lodash/chunk'

import ResponsivePicture from './ResponsivePicture'
import Row from './Row'

import {
    loadPhotos,
} from '../resources/photos';


class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 0,
            selection: [],
            selectionable: false,
        }

        this.copy = this.copy.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onClick = this.onClick.bind(this)
        this.onkeydown = this.onkeydown.bind(this)
        this.onkeyup = this.onkeyup.bind(this)
    }

    onChange(attr) {
        const { pictures } = this.props;
        return (evt) => {
            const target = evt.target
            const value = target.type === 'checkbox' ? target.checked : target.value
            const { current } = this.state
        }
    }

    onkeydown(evt) {
        if (evt.key === 'Meta') {
            this.setState({
                selection: [this.state.current],
                selectionable: true,
            })
        }
        if (evt.key === 'Escape') {
            this.setState({
                selection: []
            })
        }
    }

    onkeyup(evt) {
        if (evt.key === 'Meta') {
            this.setState({
                selectionable: false,
            })
        }
    }

    copy() {
        this._textarea.select()
        document.execCommand('copy')
    }

    onClick(current) {
        return () => {
            let state = {
                current,
            }
            if (this.state.selectionable) {
                state.selection = this.state.selection
                const indexOf = state.selection.indexOf(current)
                if (indexOf !== -1) {
                    state.selection.splice(indexOf, 1)
                } else {
                    state.selection.push(current)
                }
            }
            this.setState(state)
        }
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onkeydown)
        window.removeEventListener('keyup', this.onkeyup)
    }

    load() {
        const photosetId = this.props.photosetId;
        this.props.loadPhotos(photosetId);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.onkeydown)
        window.addEventListener('keyup', this.onkeyup)
        this.load();
    }

    renderRows() {
        const {
            pictures,
        } = this.props;
        const {
            current,
            selection,
        } = this.state

        let index = 0

        const rows = chunk(pictures, 5)
        return rows.map((row, rowIndex) => {
            return (
                <Row key={rowIndex}>{row.map((picture) => {
                    let style = { borderStyle: 'solid', borderWidth: '1px' }
                    if (index === current) {
                        style.borderColor = 'red'
                    }
                    if (selection.indexOf(index) !== -1) {
                        style.borderColor = 'green'
                    }
                    return <ResponsivePicture style={style} key={index} {...picture} onClick={this.onClick(index++)} />
                })}</Row>
            )
        })
    }

    generatePicture(index) {
        const picture = this.props.pictures[index]

        let marker = {}
        if (picture.coordinates) {
            marker = {
                'type': 'marker',
                'coordinates': window.COORDINATES,
            }
        }

        let data = {
            "kind": "block",
            "type": "picture",
            "data": {
                "viewer": true,
                ...picture,
                ...marker,
            }
        }

        if (!picture.coordinates) {
            data.data.coordinates = undefined
        }
        return data
    }

    render() {
        const {
            className,
            pictures,
        } = this.props
        const {
            current,
            selection,
        } = this.state


        if (pictures.length === 0) {
            return <div></div>
        }

        const { title, location, coordinates } = pictures[current]

        let data = this.generatePicture(current)

        if (selection.length) {
            data = {
                kind: 'block',
                type: 'row',
                nodes: selection.map((index) => {
                    return this.generatePicture(index)
                })
            }
        }

        return (
            <div className={className}>
                <div style={{width: '80%'}}>{this.renderRows()}</div>
                <div style={{width: '20%', padding: '20px', display: 'flex', flexDirection: 'column'}}>
                    <input type="text" onChange={(evt) => this.onChange('title')(evt)} value={title} placeholder="title" />
                    <input type="text" onChange={(evt) => this.onChange('location')(evt)} value={location} placeholder="location" />
                    <textarea style={{height: '300px'}} readOnly ref={(textarea) => this._textarea = textarea} value={JSON.stringify(data, null, '    ')} />
                    <input type="checkbox" onChange={(evt) => this.onChange('coordinates')(evt)} value={coordinates} />
                    <button onClick={this.copy}>Copy</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const photosetId = '72157665415084982'
    const pictures = state.photos.entities[photosetId] || [];
    return {
        pictures,
        photosetId,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadPhotos: (photosetId) => dispatch(loadPhotos(photosetId)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(styled(Edit)`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.95);
    height: 600px;
    z-index: 2;
    display: flex;

    & > div:first-child {
        overflow-y: auto;
    }

    input, textarea, button {
        margin-bottom: 1em;
        padding: 6px;
        border: none;
    }
`)
