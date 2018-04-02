import * as actionTypes from './types'

export function addPost (post) {
  return {
    type: actionTypes.ADD_POST,
    post,
  }
}

export function addComment (comment) {
  return {
    type: actionTypes.ADD_COMMENT,
    comment,
  }
}

export function editPost (postId, newTitle, newContent, newTimestamp) {
  return {
    type: actionTypes.EDIT_POST,
    postId,
    newTitle,
    newContent,
    newTimestamp,
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

export function votePost (postId, decision) {
  return {
    type: actionTypes.VOTE_POST,
    postId,
    decision,
  }
}

export function voteComment (commentId, decision) {
  return {
    type: actionTypes.VOTE_COMMENT,
    commentId,
    decision,
  }
}

export function setModal (status) {
  return {
    type: actionTypes.SET_MODAL,
    status,
  }
}

export function setCommentModal (status) {
  return {
    type: actionTypes.SET_COMMENT_MODAL,
    status,
  }
}

export function setEdit (status) {
  return {
    type: actionTypes.SET_EDIT,
    status,
  }
}

export function setEditComment (status) {
  return {
    type: actionTypes.SET_EDIT_COMMENT,
    status,
  }
}

export function setId (id) {
  return {
    type: actionTypes.SET_ID,
    id,
  }
}

export function setTitle (title) {
  return {
    type: actionTypes.SET_TITLE,
    title,
  }
}

export function setAuthor (author) {
  return {
    type: actionTypes.SET_AUTHOR,
    author,
  }
}

export function setContent (content) {
  return {
    type: actionTypes.SET_CONTENT,
    content,
  }
}

export function setCategory (category) {
  return {
    type: actionTypes.SET_CATEGORY,
    category,
  }
}

export function deletePost (postId) {
  return {
    type: actionTypes.DELETE_POST,
    postId,
  }
}

export function deleteComment (postId) {
  return {
    type: actionTypes.DELETE_COMMENT,
    postId,
  }
}

export function getDelete (postId) {
  return {
    type: actionTypes.SEND_DELETE,
    postId,
  }
}

export const sendDelete = (id) => dispatch => (
  fetch(`http://localhost:3001/posts/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: '314'
    }
  })
  .then(data => data.json())
  .then(() => dispatch(getDelete(id)))
)

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

export function getData({ data }) {
  return {
    type: actionTypes.GET_DATA,
    data,
  }
}

export const fetchData = () => dispatch => (
  fetch('http://localhost:3001/posts', {
    headers: { Authorization: '314' }
  })
  .then(data => data.json())
  .then(data => {
    dispatch(getData({ data }))
  })
);

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

export function setPost({ post }) {
  return {
    type: actionTypes.SEND_POST,
    post,
  }
}

export const sendData = (post) => dispatch => (
  fetch('http://localhost:3001/posts', {
    method: 'POST',
    headers: {
      Authorization: '314',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  })
  .then(data => data.json())
  .then(data => {
    dispatch(setPost({ data }))
  })
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

export function setPostVote(id, decision) {
  return {
    type: actionTypes.SET_POST_VOTE,
    id,
    decision,
  }
}

export const sendPostVote = (id, decision) => dispatch => (
  fetch(`http://localhost:3001/posts/${id}`, {
    method: 'POST',
    headers: {
      Authorization: '314',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: decision })
  })
  .then(data => data.json())
  .then(() => dispatch(setPostVote(id, decision)))
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

export function sendEdit() {
  return {
    type: actionTypes.SEND_EDIT,
  }
}

export const fetchEdit = (id, newTitle, newContent, newDate) => dispatch => (
  fetch(`http://localhost:3001/posts/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: '314',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: newTitle, body: newContent, timestamp: newDate })
  })
  .then(data => data.json())
  .then(data => {
    dispatch(sendEdit())
  })
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

/** sort visible posts by the order given; 'order' should be an element in
 *  { 'timestamp', '-timestamp', 'voteCount', '-voteCount' }
 */
export function setSort(order) {
  return {
    type: actionTypes.SET_SORT,
    order,
  }
}

export function pageCategory(category) {
  return {
    type: actionTypes.PAGE_CATEGORY,
    category,
  }
}

export function setPath(path) {
  return {
    type: actionTypes.SET_PATH,
    path,
  }
}

export function alterCommentCount(postId, alteration) {
  return {
    type: actionTypes.ALTER_COMMENT_COUNT,
    postId,
    alteration,
  }
}
