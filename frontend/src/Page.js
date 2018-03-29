import React, { Component } from 'react'
import Post from './Post'
import Comment from './Comment'

class Page extends Component {
  render() {
    return (
      <div className="wrapper">
        <p className="post-title">Title</p>
        <div className="vote-score">
          <p className="style-info">Author</p>
          <p className="style-info">Vote Score: +4</p>
        </div>
        <div className="post-info">
          <p className="style-info">Timestamp</p>
          <p className="style-info">Comments: 3</p>
        </div>
        <Post />
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

export default Page
