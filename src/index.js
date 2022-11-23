import React from 'react';
import ReactDOM from 'react-dom';

import 'antd/dist/antd.css';
import './styles/global.scss';
import { Provider } from 'react-redux';
import store from './store/configureStore'
// import { ConnectedRouter } from 'connected-react-router';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";

import './i18nextConf';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename={'/onecrm'} >
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
