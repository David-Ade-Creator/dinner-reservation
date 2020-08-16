import React from "react";
import ReactDOM from "react-dom";
import store from './store';
import {Provider} from 'react-redux';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import {BrowserRouter} from 'react-router-dom';
import "./index.css";
import App from "./App";

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render( 
    <Provider store={store}>
    <BrowserRouter>
<App /> 
</BrowserRouter>
</Provider>
, document.getElementById('root'));

registerServiceWorker();