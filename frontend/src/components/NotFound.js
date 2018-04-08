import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PageNotFound from '../images/Cat-Picture-Error.jpg'


const NotFound = () => (
  <div className="wrapper error-page">
    <img src={PageNotFound} style={{height: 400, display: 'block', margin: 'auto', position: 'relative' }} />
    <div className="error-statement">Error: The page that you requested could not be found on the server.</div>
    <center><Link className="error-to-home" to="/">Return To The Home Page</Link></center>
  </div>
);

export default NotFound;
