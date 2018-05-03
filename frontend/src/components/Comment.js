import React from 'react'
import { voteComment, sendCommentVote, setCommentModal, setEditComment, deleteComment, sendDeleteComment } from '../actions/commentActions'
import { setAuthor, setContent, setId } from '../actions/categoryActions'
import { alterCommentCount } from '../actions/postActions'
import { connect } from 'react-redux'

import { Card, CardHeader } from 'material-ui/Card'
import Desert from '../images/desert.jpg' // image credit: Jordon Steranka, Unsplash
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import { Route } from 'react-router-dom'
import Delete from 'material-ui/svg-icons/action/delete'

const Comment = ({ dispatch, id, comments, parentId, time, author, voteScore, body }) => {
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
      <Card
        style={{
          background: 'linear-gradient(red, yellow)',
          boxShadow: `1px 3px 1px #9E9E9E`,
          marginBottom: 5,
        }}>
        <div className="all-post-info">
          <div className="main-post-info">
            <CardHeader
              title={"Author: " + author}
              subtitle={"Last Modified: " + time}
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
                <KeyboardArrowDown onClick={() => this.vote(id, 'downVote')}/>
              </div>
              <div className="comment-content">{body}</div>
            </div>
          </div>
          <div>
            <ModeEdit className="action-button" onClick={() => edit()} />
            <Route render={({ history}) => (
              <Delete
                onClick={() => {
                  dispatch(remove(id))
                  history.push('/')
                }}
                className="action-button"
              />
            )} />
          </div>
        </div>
      </Card>








    </div>
  );
  // <div className="vote-display">
  //   <div>
  //     <button onClick={() => vote(id, 'upVote')} className="like-element blue-button">
  //       <i className="fa fa-angle-up"></i>
  //     </button>
  //     <p className="like-element">{comment.voteScore}</p>
  //     <button onClick={() => vote(id, 'downVote')} className="like-element red-button">
  //       <i className="fa fa-angle-down"></i>
  //     </button>
  //   </div>
  // </div>
  // <div className="page-post">
  //   <div className="post-info-horizontal">
  //     <div>Author: {comment.author}</div>
  //     <div>Latest Update: {humanTime}</div>
  //   </div>
  //   <div className="middle-bar"></div>
  //   <div className="comment-body">{comment.body}</div>
  // </div>
  // <div className="edit-details">
  //   <button onClick={() => edit()} className="edit-action blue-button">Edit</button>
  //   <button onClick={() => remove(id)} className="edit-action red-button">Delete</button>
  // </div>
}


function mapStateToProps ({comments, ...rest}) {
  return {
    comments,
  }
}

export default connect(mapStateToProps)(Comment)
