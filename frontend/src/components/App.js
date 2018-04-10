import React, { Component } from 'react'
import { Route, Link, withRouter, Switch } from 'react-router-dom'
import './App.css'
import Main from './Main'
import Page from './Page'
import NotFound from './NotFound'
import { connect } from 'react-redux'
import { fetchData } from '../actions/postActions'
import { pageCategory } from '../actions/categoryActions'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

/*
 * Note: The basic layout for the navigation bar was borrowed from another project that I have done. See this
 * GitHub page: https://github.com/wbchristerson/job-site
 *
 * Use of redux throughout this class was based on the Udacity lectures and videos
 * for React & Redux
 */

class App extends Component {

  componentDidMount() {
    this.props.dispatch(fetchData());
  }

  render() {
    return (
      <div>
        <header className="site-header">
          <div className="wrapper clearfix">
            <p className="site-title">Readables</p>
            <nav className="site-nav">
              <div className="trigger">
                <Link onClick={() => this.props.dispatch(pageCategory(''))}
                  className={"page-link" + (this.props.category === '' ? ' select-border' : '')} to="/">Home</Link>
                <Link onClick={() => this.props.dispatch(pageCategory('react'))}
                  className={"page-link" + (this.props.category === 'react' ? ' select-border' : '')} to="/react">React</Link>
                <Link onClick={() => this.props.dispatch(pageCategory('redux'))}
                  className={"page-link" + (this.props.category === 'redux' ? ' select-border' : '')} to="/redux">Redux</Link>
                <Link onClick={() => this.props.dispatch(pageCategory('udacity'))}
                  className={"page-link" + (this.props.category === 'udacity' ? ' select-border' : '')} to="/udacity">Udacity</Link>
              </div>
            </nav>
          </div>
        </header>

        <Switch>
          <Route exact path="/" render={() => (
            <MuiThemeProvider>
              <Main posts={this.props.posts} pathCategory=''/>
            </MuiThemeProvider>
          )}/>

          <Route exact path="/react" render={() => (
            <Main posts={this.props.posts.filter((post) => post.category === 'react')} pathCategory='react' />
          )}/>

          <Route exact path="/redux" render={() => (
            <Main posts={this.props.posts.filter((post) => post.category === 'redux')} pathCategory='redux'/>
          )}/>

          <Route exact path="/udacity" render={() => (
            <Main posts={this.props.posts.filter((post) => post.category === 'udacity')} pathCategory='udacity'/>
          )}/>

          <Route exact path={"/:category/:id"} component={Page}/>

          <Route path="*" component={NotFound} />
        </Switch>

      </div>
    );
  }
}

function mapStateToProps ({posts, comments, category, ...rest}) {
  return {
    posts,
    comments,
    category,
  }
}

/* use withRouter to pass path updates to pages so that navigation can be done
   without having to refresh */
export default withRouter(connect(mapStateToProps)(App))
