import React, { Component } from 'react'

class Comment extends Component {
  render() {
    return (
      <div className="post-body">
        <div className="vote-display">
          <button className="like-element blue-button"><i className="fa fa-angle-up"></i></button>
          <p className="like-element">+2</p>
          <button className="like-element red-button"><i className="fa fa-angle-down"></i></button>
        </div>
        <div className="post">Post</div>
        <div className="edit-details">
          <button className="edit-action blue-button">Edit</button>
          <button className="edit-action red-button">Delete</button>
        </div>
      </div>
    );
  }
}

export default Comment
