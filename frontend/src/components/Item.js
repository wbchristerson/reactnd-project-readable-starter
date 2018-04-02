import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { votePost, sendPostVote, deletePost, sendDelete, setModal, setEdit,
         setTitle, setAuthor, setContent, setCategory, setId, setPath } from '../actions'
import { connect } from 'react-redux'

class Item extends Component {
  vote = (id, decision) => {
    this.props.dispatch(votePost(id, decision))
    this.props.dispatch(sendPostVote(id, decision))
  }

  delete = (id) => {
    this.props.dispatch(deletePost(id))
    this.props.dispatch(sendDelete(id))
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

  render() {
    let link = `/${this.props.category}/${this.props.id}`
    return (
      <div className="post-body">
        <div className="vote-display">
          <div>
            <button onClick={() => this.vote(this.props.id, 'upVote')} className="like-element blue-button">
              <i className="fa fa-angle-up"></i>
            </button>
            <p className="like-element">{this.props.voteScore}</p>
            <button onClick={() => this.vote(this.props.id, 'downVote')} className="like-element red-button">
              <i className="fa fa-angle-down"></i>
            </button>
          </div>
        </div>
        <Link onClick={() => this.props.dispatch(setPath('/post'))} className="post" to={link}>
          <div className="post-title">{this.props.title}</div>
          <div className="post-category">Category: {this.props.category}</div>
          <div className="post-info-horizontal">
            <div>Author: {this.props.author}</div>
            <div>Comments: {this.props.commentCount}</div>
          </div>
        </Link>
        <div className="edit-details">
          <button onClick={() => this.edit()} className="edit-action blue-button">Edit</button>
          <button onClick={() => this.delete(this.props.id)} className="edit-action red-button">Delete</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps ({path, ...rest}) {
  return {
    path,
  }
}

export default connect(mapStateToProps)(Item)
