import React, { Component } from 'react'
import { votePost, sendPostVote, setModal, deletePost, sendDelete } from '../actions/postActions'
import { setTitle, setAuthor, setContent, setCategory, setId, setEdit } from '../actions/categoryActions'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Route } from 'react-router-dom'

import { Card, CardHeader, CardTitle } from 'material-ui/Card'
import Desert from '../images/desert.jpg' // image credit: Jordon Steranka, Unsplash
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'

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

  // <Delete className="action-button" onClick={() => this.destroyButtonWrapper(event, this.props.id)} />
  return (
    <div className="post-body">
      <Card
        style={{
          background: 'linear-gradient(red, yellow)',
          boxShadow: `1px 3px 1px #9E9E9E`,
          marginBottom: 5,
        }}>
        <div className="all-post-info">
          <div className="main-post-info">
            <CardHeader
              title={author}
              subtitle={0}
              avatar={Desert}
              style={{
                marginBottom: 0,
                paddingBottom: 0,
              }}
            />
            <div className="sub-information">
              <div className="like-section">
                <KeyboardArrowUp onClick={() => vote(id, 'upVote')}/>
                <div className="score-text">{voteScore}</div>
                <KeyboardArrowDown onClick={() => this.vote(id, 'downVote')}/>
              </div>
              <CardTitle
                title={title}
                subtitle={category}
                style={{
                  marginTop: 0,
                }}
              />
            </div>
          </div>
          <div>
            <ModeEdit className="action-button" onClick={() => edit()} />
          </div>
        </div>
      </Card>






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
