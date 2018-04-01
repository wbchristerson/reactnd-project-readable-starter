import React, { Component } from 'react'
import { votePost, sendPostVote, setTitle, setAuthor, setContent, setCategory,
         setId, setModal, setEdit, deletePost, sendDelete } from '../actions'
import { connect } from 'react-redux'

class Post extends Component {
  vote = (id, decision) => {
    this.props.dispatch(votePost(id, decision))
    this.props.dispatch(sendPostVote(id, decision))
  }

  edit = () => {
    this.props.dispatch(setModal(true))
    this.props.dispatch(setEdit(true))
    this.props.dispatch(setTitle(this.props.title))
    this.props.dispatch(setAuthor(this.props.author))
    this.props.dispatch(setContent(this.props.content))
    this.props.dispatch(setCategory(this.props.category))
    this.props.dispatch(setId(this.props.id))
  }

  delete = () => {
    window.location='/'
    this.props.dispatch(deletePost(this.props.id))
    this.props.dispatch(sendDelete(this.props.id))
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
          <button onClick={() => this.edit()} className="edit-action blue-button">Edit</button>
          <button onClick={() => this.delete()} className="edit-action red-button">Delete</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps (fullState) {
  return {
  }
}

export default connect(mapStateToProps)(Post)
