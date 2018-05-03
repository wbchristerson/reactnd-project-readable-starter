import React from 'react'
import { votePost, sendPostVote, setModal, deletePost, sendDelete } from '../actions/postActions'
import { setTitle, setAuthor, setContent, setCategory, setId, setEdit } from '../actions/categoryActions'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import { Card, CardHeader, CardTitle } from 'material-ui/Card'
import Desert from '../images/desert.jpg' // image credit: Jordon Steranka, Unsplash
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import Divider from 'material-ui/Divider'

const Post = ({ dispatch, title, author, content, category, id, voteScore, body, time, commentCount }) => {
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

  // background: 'linear-gradient(red, yellow)',
  // background: 'linear-gradient(#9bf442, yellow)',
  return (
    <div className="post-body">
      <Card
        style={{
          background: 'linear-gradient(#9bf442, #42f4d7)',
          boxShadow: `1px 3px 1px #9E9E9E`,
          marginBottom: 5,
        }}>
        <div className="all-post-info">
          <div className="main-post-info">
            <CardHeader
              title={"Author: " + author}
              subtitle={"Comments: " + commentCount}
              avatar={Desert}
              style={{
                marginBottom: 0,
                paddingBottom: 0,
              }}
            />
            <div className="sub-information">
              <div className="like-section original-post">
                <KeyboardArrowUp onClick={() => vote(id, 'upVote')}/>
                <div className="score-text">{voteScore}</div>
                <KeyboardArrowDown onClick={() => vote(id, 'downVote')}/>
              </div>
              <CardTitle
                title={title}
                subtitle={
                  <div>
                    <div>Category: {category}</div>
                    <div>Last Modified: {time}</div>
                  </div>
                }
                subtitleColor="black"
                style={{
                  marginTop: 0,
                  paddingBottom: 8,
                  paddingLeft: 8,
                }}
              />
            </div>
            <Divider inset={true} style={{backgroundColor: 'black'}}/>
            <div className="comment-style">{body}</div>
          </div>
          <div>
            <ModeEdit className="action-button" onClick={() => edit()} />
            <Route render={({ history}) => (
              <Delete
                onClick={() => {
                  dispatch(deletePost(id))
                  dispatch(sendDelete(id))
                  history.push('/')
                }}
                className="action-button"
              />
            )} />
          </div>
        </div>
      </Card>
    </div>
  )
}

function mapStateToProps (fullState) {
  return {
  }
}

export default connect(mapStateToProps)(Post)
