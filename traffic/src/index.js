import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const user = getParameterByName('user');

ReactDOM.render(<App user={user} />, document.getElementById('root'));

