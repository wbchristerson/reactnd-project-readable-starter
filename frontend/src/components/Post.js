import React, { Component } from 'react'
import { votePost, sendVote } from '../actions'
import { connect } from 'react-redux'

class Post extends Component {
  vote = (id, decision) => {
    this.props.dispatch(votePost(id, decision))
    this.props.dispatch(sendVote(id, decision))
  }

  render() {
    return (
      <div className="post-body">
        <div className="vote-display">
          <button onClick={() => this.vote(this.props.id, 'upVote')} className="like-element blue-button">
            <i className="fa fa-angle-up"></i>
          </button>
          <p className="like-element">{this.props.voteScore}</p>
          <button onClick={() => this.vote(this.props.id, 'downVote')} className="like-element red-button">
            <i className="fa fa-angle-down"></i>
          </button>
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


// posts: fullState.posts,
// comments: fullState.comments
function mapStateToProps (fullState) {
  return {
  }
}

export default connect(mapStateToProps)(Post)
// export default Post
