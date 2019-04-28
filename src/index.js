import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import DrawCanvas from './DrawCanvas';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<DrawCanvas image="https://indebuurt.nl/delft/wp-content/uploads/2019/03/sebastiaansbrug-jaap-huisman-3.jpg" clear />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
