import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from "react-redux";
import App from './components/App';
import store from "./redux/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './fonts/PressStart2P.ttf'; 


ReactDOM.render(
  <Provider store={store}>
    <Router>
        <App />
    </Router>
  </Provider>,

  document.getElementById('root')
);