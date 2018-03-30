import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Main from './Main'
import Page from './Page'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchData } from '../actions'

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
  // state = {
  //   postList: []
  // }

  componentDidMount() {
    this.props.dispatch(fetchData());
  }

  // submitPost = () => {
  //   this.props.store.dispatch(addPost(   ????????????????  ) )
  // }



  // updatePosts(newObj, refObj) {
  //   refObj.setState((prevState) => ({
  //     postList: prevState.postList.concat([newObj])
  //   }));
  // }

  // updateServer(obj) {
  //   fetch(
  //     'http://localhost:3001/posts',
  //     {
  //       method: 'POST',
  //       headers: { 'Authorization': '314', 'Content-Type': 'application/json' },
  //       body: JSON.stringify(obj)
  //     }
  //   )
  //   .then(data => data.json());
  // }

  // updateState(newPostList, refObj) {
  //   refObj.setState({
  //     postList: newPostList
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
                <Link className="page-link select-border" to="/">Home</Link>
                <Link className="page-link" to="/react">React</Link>
                <Link className="page-link" to="/redux">Redux</Link>
                <Link className="page-link" to="/udacity">Udacity</Link>
              </div>
            </nav>
          </div>
        </header>

        <Route exact path="/" render={() => (
          <Main />
        )}/>

        <Route exact path="/react" render={() => (
          <Main />
        )}/>

        <Route exact path="/redux" render={() => (
          <Main />
        )}/>

        <Route exact path="/udacity" render={() => (
          <Main />
        )}/>

        <Route path="/post" render={() => (
          <Page />
        )}/>

      </div>
    );
  }

}

function mapStateToProps (fullState) {
  console.log("fullState: ", fullState)
  return {
    posts: fullState.posts,
    comments: fullState.comments
  }
}

export default connect(mapStateToProps)(App)
// export default App
