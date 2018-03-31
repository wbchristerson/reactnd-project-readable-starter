import React, { Component } from 'react'

class Post extends Component {
  render() {
    
    return (
      <div className="post-body">
        <div className="vote-display">
          <button className="like-element blue-button"><i className="fa fa-angle-up"></i></button>
          <p className="like-element">{this.props.voteScore}</p>
          <button className="like-element red-button"><i className="fa fa-angle-down"></i></button>
        </div>
        <div className="page-post">
          {this.props.body}
        </div>
        <div className="edit-details">
          <button className="edit-action blue-button">Edit</button>
          <button className="edit-action red-button">Delete</button>
        </div>
      </div>
    );
  }

}

export default Post
