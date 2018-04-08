import React, { Component } from 'react'
import { votePost, sendPostVote, setTitle, setAuthor, setContent, setCategory,
  setId, setModal, setEdit, deletePost, sendDelete } from '../actions'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { withRouter } from 'react-router-dom'

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

  const remove = () => {
    window.location='/'
    dispatch(deletePost(id))
    dispatch(sendDelete(id))
  }

  // const Button = withRouter(({ history }) => (
  //   <button
  //     type='button'
  //     onClick={() => { history.push('/new-location') }}
  //   >
  //     Click Me!
  //   </button>
  // ))

  // const remove = () => (
  //   <Route path="/"/>
  //   history.push('/')
  // )

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
        <button onClick={() => remove()} className="edit-action red-button">Delete</button>
      </div>
    </div>

  )
  // <button onClick={withRouter(({history})) => {history.push('/new-location')}} className="edit-action red-button">Delete</button>
}


function mapStateToProps (fullState) {
  return {
  }
}

export default connect(mapStateToProps)(Post)
