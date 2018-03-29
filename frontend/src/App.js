import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Main from './Main'
import Page from './Page'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

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
  state = {
    postList: []
  }

  componentDidMount() {
    fetch(
      'http://localhost:3001/posts',
      {
        headers: { 'Authorization': '314' }
      }
    )
    .then(data => data.json())
    .then(data => {
      console.log("Data: ", data)
      this.setState({
        postList: data.filter(post => post.hasOwnProperty('id'))
      })
    })
  }

  updatePosts(newObj, refObj) {
    refObj.setState((prevState) => ({
      postList: prevState.postList.concat([newObj])
    }));
  }

  updateServer(obj) {
    fetch(
      'http://localhost:3001/posts',
      {
        method: 'POST',
        headers: { 'Authorization': '314', 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }
    )
    .then(data => data.json());
  }

  updateState(newPostList, refObj) {
    refObj.setState({
      postList: newPostList
    })
  }

  render() {
    return (
      <div>
        <header className="site-header">
          <div className="wrapper clearfix">
            <p className="site-title">Readables</p>
            <nav className="site-nav">
              <div className="trigger">
                <Link className="page-link select-border" to="/">Home</Link>
                <Link className="page-link" to="/react">React</Link>
                <Link className="page-link" to="/redux">Redux</Link>
                <Link className="page-link" to="/udacity">Udacity</Link>
              </div>
            </nav>
          </div>
        </header>

        <Route exact path="/" render={() => (
          <Main postList={this.state.postList} updatePosts={this.updatePosts}
                updateServer={this.updateServer} updateState={this.updateState}
                refObj={this}/>
        )}/>

        <Route exact path="/react" render={() => (
          <Main postList={this.state.postList.filter((post) => post.category === 'react')}
                updatePosts={this.updatePosts} updateServer={this.updateServer}
                updateState={this.updateState} refObj={this}/>
        )}/>

        <Route exact path="/redux" render={() => (
          <Main postList={this.state.postList.filter((post) => post.category === 'redux')}
                updatePosts={this.updatePosts} updateServer={this.updateServer}
                updateState={this.updateState} refObj={this}/>
        )}/>

        <Route exact path="/udacity" render={() => (
          <Main postList={this.state.postList.filter((post) => post.category === 'udacity')}
                updatePosts={this.updatePosts} updateServer={this.updateServer}
                updateState={this.updateState} refObj={this}/>
        )}/>

        <Route path="/post" render={() => (
          <Page />
        )}/>

      </div>
    );
  }

}

function mapStateToProps (ourState) {
  return {
    name: 'Tyler'
  }
}

// export default connect(mapStateToProps)(App)
export default App
