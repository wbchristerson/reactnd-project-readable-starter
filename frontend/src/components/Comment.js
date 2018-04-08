import React, { Component } from 'react'
import { voteComment, sendCommentVote, setCommentModal, setEditComment, deleteComment, sendDeleteComment } from '../actions/commentActions'
import { setAuthor, setContent, setId } from '../actions/categoryActions'
import { alterCommentCount } from '../actions/postActions'
import { connect } from 'react-redux'

const Comment = ({ dispatch, id, comments, parentId, humanTime }) => {
  const commentArr = comments.filter((comment) => comment.id === id)
  const comment = commentArr[0]

  const vote = (id, decision) => {
    dispatch(voteComment(id, decision))
    dispatch(sendCommentVote(id, decision))
  };

  const edit = () => {
    dispatch(setCommentModal(true))
    dispatch(setEditComment(true))
    dispatch(setAuthor(comment.author))
    dispatch(setContent(comment.body))
    dispatch(setId(id))
  };

  const remove = (id) => {
    dispatch(deleteComment(id))
    dispatch(sendDeleteComment(id))
    dispatch(alterCommentCount(parentId, -1))
  };

  return (
    <div className="post-body comment-width">
      <div className="vote-display">
        <div>
          <button onClick={() => vote(id, 'upVote')} className="like-element blue-button">
            <i className="fa fa-angle-up"></i>
          </button>
          <p className="like-element">{comment.voteScore}</p>
          <button onClick={() => vote(id, 'downVote')} className="like-element red-button">
            <i className="fa fa-angle-down"></i>
          </button>
        </div>
      </div>
      <div className="page-post">
        <div className="post-info-horizontal">
          <div>Author: {comment.author}</div>
          <div>Latest Update: {humanTime}</div>
        </div>
        <div className="middle-bar"></div>
        <div className="comment-body">{comment.body}</div>
      </div>
      <div className="edit-details">
        <button onClick={() => edit()} className="edit-action blue-button">Edit</button>
        <button onClick={() => remove(id)} className="edit-action red-button">Delete</button>
      </div>
    </div>
  );
}


function mapStateToProps ({comments, ...rest}) {
  return {
    comments,
  }
}

export default connect(mapStateToProps)(Comment)
