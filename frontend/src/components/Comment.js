import React, { Component } from 'react'
import { voteComment } from '../actions'
import { connect } from 'react-redux'

class Comment extends Component {
  vote = (id, decision) => {
    this.props.dispatch(voteComment(id, decision))
    // this.props.dispatch(sendVote(id, decision))
  }

  render() {
    let commentArr = this.props.comments.filter((comment) => comment.id === this.props.id)
    let comment = commentArr[0]
    return (
      <div className="post-body comment-width">
        <div className="vote-display">
          <button onClick={() => this.vote(this.props.id, 'upVote')}
                  className="like-element blue-button"><i className="fa fa-angle-up"></i></button>
          <p className="like-element">{comment.voteScore}</p>
          <button onClick={() => this.vote(this.props.id, 'downVote')}
                  className="like-element red-button"><i className="fa fa-angle-down"></i></button>
        </div>
        <div className="page-post">
          <div className="post-info-horizontal">
            <div>Author: {comment.author}</div>
            <div>{comment.timestamp}</div>
          </div>
          {comment.body}
        </div>
        <div className="edit-details">
          <button className="edit-action blue-button">Edit</button>
          <button className="edit-action red-button">Delete</button>
        </div>
      </div>
    );
  }

}


function mapStateToProps (fullState) {
  return {
    comments: fullState.comments
  }
}

export default connect(mapStateToProps)(Comment)
// export default Comment
