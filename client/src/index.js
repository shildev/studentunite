//necessary imports are made

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { legacy_createStore as createStore} from 'redux';
import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reduxreducers from './reduxreducers';
import './index.css';

import App from './App';
//index.js redux configuration and react store rendering
const store = createStore(reduxreducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store ={store}>
        <App/>
    </Provider>,
    document.getElementById('root')

);