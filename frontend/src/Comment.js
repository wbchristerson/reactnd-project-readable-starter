import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Comment extends Component {
  render() {
    return (
      <div className="post-body">
        <div className="vote-display">
          <button className="like-element blue-button"><i className="fa fa-angle-up"></i></button>
          <p className="like-element">{this.props.voteScore}</p>
          <button className="like-element red-button"><i className="fa fa-angle-down"></i></button>
        </div>
        <Link className="post" to="/post">
          <div className="post-title">{this.props.title}</div>
          <div className="post-category">Category: {this.props.category}</div>
          <div className="post-info-horizontal">
            <div>Author: {this.props.author}</div>
            <div>Comments: {this.props.commentCount}</div>
          </div>
        </Link>
        <div className="edit-details">
          <button className="edit-action blue-button">Edit</button>
          <button className="edit-action red-button">Delete</button>
        </div>
      </div>
    );
  }
}

export default Comment
