import * as actionTypes from './types'

export function addPost (post) {
  return {
    type: actionTypes.ADD_POST,
    post,
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

export function votePost (postId, decision) {
  return {
    type: actionTypes.VOTE_POST,
    postId,
    decision,
  }
}

export function deletePost (postId) {
  return {
    type: actionTypes.DELETE_POST,
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

/** sort visible posts by the order given; 'order' should be an element in
 *  { 'timestamp', '-timestamp', 'voteCount', '-voteCount' }
 */
export function setSort(order) {
  return {
    type: actionTypes.SET_SORT,
    order,
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

export function setModal (status) {
  return {
    type: actionTypes.SET_MODAL,
    status,
  }
}
