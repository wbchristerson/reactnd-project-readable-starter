import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import './App.css'
import Main from './Main'
import Page from './Page'
import { connect } from 'react-redux'
import { fetchData, pageCategory } from '../actions'

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

        <Route exact path="/" render={() => (
          <Main posts={this.props.posts} pathCategory=''/>
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

      </div>
    );
  }

}

function mapStateToProps (fullState) {
  return {
    posts: fullState.posts,
    comments: fullState.comments,
    category: fullState.category
  }
}

export default connect(mapStateToProps)(App)
// export default App
