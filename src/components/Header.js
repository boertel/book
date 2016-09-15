import React from 'react';

import './Header.css';


export default function Header (props) {
    return (
        <div className="Header">
            <span>{props.title}</span>
            <hr />
        </div>
    );
}
