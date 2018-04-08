import React, { Component } from 'react'
import { votePost, sendPostVote, setModal, deletePost, sendDelete } from '../actions/postActions'
import { setTitle, setAuthor, setContent, setCategory, setId, setEdit } from '../actions/categoryActions'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Route } from 'react-router-dom'

const Post = ({ dispatch, title, author, content, category, id, voteScore, body }) => {
  const vote = (id, decision) => {
    dispatch(votePost(id, decision))
    dispatch(sendPostVote(id, decision))
  }

  const edit = () => {
    dispatch(setModal(true))
    dispatch(setEdit(true))
    dispatch(setTitle(title))
    dispatch(setAuthor(author))
    dispatch(setContent(content))
    dispatch(setCategory(category))
    dispatch(setId(id))
  }

  return (
    <div className="post-body">
      <div className="vote-display">
        <button onClick={() => vote(id, 'upVote')} className="like-element blue-button">
          <i className="fa fa-angle-up"></i>
        </button>
        <p className="like-element">{voteScore}</p>
        <button onClick={() => vote(id, 'downVote')} className="like-element red-button">
          <i className="fa fa-angle-down"></i>
        </button>
      </div>
      <div className="page-post">
        {body}
      </div>
      <div className="edit-details">
        <button onClick={() => edit()} className="edit-action blue-button">Edit</button>
        <Route render={({ history}) => (
          <button
            type='button'
            onClick={() => {
              dispatch(deletePost(id))
              dispatch(sendDelete(id))
              history.push('/')
            }}
            className="edit-action red-button"
          >
            Delete
          </button>
        )} />
      </div>
    </div>
  )
}


function mapStateToProps (fullState) {
  return {
  }
}

export default connect(mapStateToProps)(Post)
