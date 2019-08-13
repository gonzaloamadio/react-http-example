import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios'


axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'
// Set for all requests (Check in logged request, in dev console.)
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN'
// Set only for post requests
axios.defaults.headers.posts['Content-Type'] = 'application/json' // This is the default anyway

// This will affect all files in project
// This one is globally for REQUEST sends.
// It will take 1 or 2 functions. First one is for request config,
// second one it is for error handling.
// NOTE: The error function here, is only for SEND errors, example: no Internet
axios.interceptors.request.use(request => {
    console.log(request)
    
    // Edit request config 

    // MUST return it, if not request is blocked. It is like a middleware.
    return request
}, error => {
    console.log(error)
    // Forward to request in the component.
    return Promise.reject(error)
})

// This one is globally for RESPONSES.
axios.interceptors.response.use(request => {
    console.log(request)
    // Edit request config 
    return request
}, error => {
    console.log(error)
    return Promise.reject(error)
})



ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
