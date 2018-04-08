import * as actionTypes from './types'

export function addComment (comment) {
  return {
    type: actionTypes.ADD_COMMENT,
    comment,
  }
}

export function editComment(postId, newContent, newTimestamp) {
  return {
    type: actionTypes.EDIT_COMMENT,
    postId,
    newContent,
    newTimestamp,
  }
}

export function voteComment (commentId, decision) {
  return {
    type: actionTypes.VOTE_COMMENT,
    commentId,
    decision,
  }
}

export function setCommentModal (status) {
  return {
    type: actionTypes.SET_COMMENT_MODAL,
    status,
  }
}

export function setEditComment (status) {
  return {
    type: actionTypes.SET_EDIT_COMMENT,
    status,
  }
}

export function deleteComment (postId) {
  return {
    type: actionTypes.DELETE_COMMENT,
    postId,
  }
}

export function getDeleteComment (postId) {
  return {
    type: actionTypes.SEND_DELETE_COMMENT,
    postId,
  }
}

export const sendDeleteComment = (id) => dispatch => (
  fetch(`http://localhost:3001/comments/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: '314'
    }
  })
  .then(data => data.json())
  .then(() => dispatch(getDeleteComment(id)))
)

export function getComments(data) {
  return {
    type: actionTypes.GET_COMMENTS,
    data,
  }
}

export const fetchComments = (id) => dispatch => (
  fetch(`http://localhost:3001/posts/${id}/comments`, {
    headers: { Authorization: '314' }
  })
  .then(data => data.json())
  .then(data => dispatch(getComments(data)))
);

export function setComment(comment) {
  return {
    type: actionTypes.SEND_COMMENT,
    comment,
  }
}

export const sendComment = (comment) => dispatch => (
  fetch('http://localhost:3001/comments', {
    method: 'POST',
    headers: {
      Authorization: '314',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  })
  .then(data => data.json())
  .then(data => {
    dispatch(setComment(comment))
  })
)

export function setCommentVote(id, decision) {
  return {
    type: actionTypes.SET_COMMENT_VOTE,
    id,
    decision,
  }
}

export const sendCommentVote = (id, decision) => dispatch => (
  fetch(`http://localhost:3001/comments/${id}`, {
    method: 'POST',
    headers: {
      'Authorization': '314',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: decision })
  })
  .then(data => data.json())
  .then(() => dispatch(setCommentVote(id, decision)))
)

export function sendCommentEdit() {
  return {
    type: actionTypes.SEND_COMMENT_EDIT,
  }
}

export const fetchCommentEdit = (id, newContent, newDate) => dispatch => (
  fetch(`http://localhost:3001/comments/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: '314',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ body: newContent, timestamp: newDate })
  })
  .then(data => data.json())
  .then(data => {
    dispatch(sendCommentEdit())
  })
)
