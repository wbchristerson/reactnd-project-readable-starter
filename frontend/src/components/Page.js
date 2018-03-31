import React, { Component } from 'react'
import Post from './Post'
import Comment from './Comment'
import { connect } from 'react-redux'
import { fetchComments } from '../actions'
// import 'moment'

class Page extends Component {
  componentDidMount() {
    this.props.dispatch(fetchComments(this.props.match.params.id))
  }

  render() {
    console.log("Horcrux: ", this.props)
    let matchEntryArr = this.props.posts.filter((post) => post.id === this.props.match.params.id)
    console.log("Turnip: ", matchEntryArr)
    let post = matchEntryArr.length > 0 ? matchEntryArr[0] : {}
    console.log("Carrot: ", post)
    let title = post.hasOwnProperty('title') ? post.title : ''
    let author = post.hasOwnProperty('author') ? post.author : ''
    let voteScore = post.hasOwnProperty('voteScore') ? post.voteScore : ''
    let timestamp = 'Wednesday'
    let commentCount = post.hasOwnProperty('commentCount') ? post.commentCount : ''
    let body = post.hasOwnProperty('body') ? post.body : ''
    // var moment = require('moment');
// moment().format();
    // let date = require('unix-date')
    // var t = new Date( 1370001284000 );
    // var formatted = t.format("dd.mm.yyyy hh:MM:ss");
    // let timestamp = post.hasOwnProperty('timestamp') ? t : ''
    // console.log("Timestamp: ", timestamp)
    return (
      <div className="wrapper">
        <p className="post-title">{title}</p>
        <div className="vote-score">
          <p className="style-info">Author: {author}</p>
          <p className="style-info">Vote Score: {voteScore}</p>
        </div>
        <div className="post-info">
          <p className="style-info">{timestamp}</p>
          <p className="style-info">Comments: {commentCount}</p>
        </div>
        <Post body={body} voteScore={voteScore} id={this.props.match.params.id}/>
        <p className="comments-title">Comments:</p>

        <Comment />
        <Comment />
        <Comment />
        <button className="comment-button">
          Add A Comment
        </button>
      </div>
    );
  }
}

function mapStateToProps (fullState) {
  console.log("Hallows: ", fullState)
  return {
    posts: fullState.posts,
    comments: fullState.comments
  }
}

export default connect(mapStateToProps)(Page)

// export default Page
