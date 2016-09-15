import React from 'react';

import './Datetime.css';


export default function Date(props) {
    return (
        <p className="Datetime">{props.date}</p>
    );
}
