'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
// loading these for all of app
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import './style.scss';

import Game from './Game.jsx';

ReactDOM.render(<Game />, document.getElementById('container'));