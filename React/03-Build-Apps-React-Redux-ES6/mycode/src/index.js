"use strict";

// Could just pull in individual polyfills to save space
import 'babel-polyfill'; // Don't really need this just here but may be elsewhere'
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import {loadCourses} from './components/course/courseActions';
import './styles/styles.css';  // Webpack can import css files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();
store.dispatch(loadCourses());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
