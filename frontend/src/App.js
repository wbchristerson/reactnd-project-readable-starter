import React, { Component } from 'react'
import { Route } from 'react-router-dom'
// import logo from './logo.svg';
import './App.css'
import Main from './Main'
import Post from './Post'
import { connect } from 'react-redux'
// import Comment from './Comment'
// import { Link } from 'react-router-dom';

// <div className="App">
// <header className="App-header">
// <img src={logo} className="App-logo" alt="logo" />
// <h1 className="App-title">Welcome to React</h1>
// </header>
// <p className="App-intro">
// To get started, edit <code>src/App.js</code> and save to reload.
// </p>
// </div>

/*
 * Note: The basic layout for the navigation bar was borrowed from another project that I have done. See this
 * GitHub page: https://github.com/wbchristerson/job-site
 *
 * The clickable dropdown structure here and in index.css is based on the tutorial found here:
 * https://www.w3schools.com/howto/howto_js_dropdown.asp
 *
 * Use of redux throughout this class was based on the Udacity lectures and videos
 * for React & Redux
 */

class App extends Component {
  // store = {
  //   posts: [],
  //   comments: []
  // }
  // componentDidMount() {
  //   const { store } = this.props
  //
  //   store.subscribre(() => {
  //     this.setState(() => ({
  //       posts: store.getState().posts,
  //       comments: store.getState().comments
  //     }))
  //   })
  // }

  render() {
    return (
      <div>
        <header className="site-header">
          <div className="wrapper clearfix">
            <p className="site-title">Readables</p>
            <nav className="site-nav">
              <div className="trigger">
                <a className="page-link select-border" href="https://wbchristerson.github.io/">Home</a>
                <a className="page-link" href="https://wbchristerson.github.io/">React</a>
                <a className="page-link" href="https://wbchristerson.github.io/">Redux</a>
                <a className="page-link" href="https://wbchristerson.github.io/">Udacity</a>
              </div>
            </nav>
          </div>
        </header>

        <Route exact path="/" render={() => (
          <Main />
        )}/>

        <Route path="/post" render={() => (
          <Post />
        )}/>

      </div>
    );
  }
}

export default App;
