export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const GET_DATA = 'GET_DATA'
export const SEND_DELETE = 'SEND_DELETE'
export const SEND_EDIT = 'SEND_EDIT'
export const SEND_POST = 'SEND_POST'
export const SET_AUTHOR = 'SET_AUTHOR'
export const SET_CATEGORY = 'SET_CATEGORY'
export const SET_CONTENT = 'SET_CONTENT'
export const SET_EDIT = 'POST_EDIT'
export const SET_ID = 'SET_ID'
export const SET_MODAL = 'SET_MODAL'
export const SET_SORT = 'SET_SORT'
export const SET_TITLE = 'SET_TITLE'
export const SET_POST_VOTE = 'SET_POST_VOTE'
export const SET_PATH = 'SET_PATH'
export const VOTE_POST = 'VOTE_POST'
export const PAGE_CATEGORY = 'PAGE_CATEGORY'
export const GET_COMMENTS = 'GET_COMMENTS'
export const SET_COMMENT_MODAL = 'SET_COMMENT_MODAL'
export const SET_EDIT_COMMENT = 'SET_EDIT_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const SEND_COMMENT = 'SEND_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const SET_COMMENT_VOTE = 'SET_COMMENT_VOTE'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const SEND_COMMENT_EDIT = 'SEND_COMMENT_EDIT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const SEND_DELETE_COMMENT = 'SEND_DELETE_COMMENT'
export const ALTER_COMMENT_COUNT = 'ALTER_COMMENT_COUNT'

export function addPost (post) {
  return {
    type: ADD_POST,
    post,
  }
}

export function addComment (comment) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}

export function editPost (postId, newTitle, newContent, newTimestamp) {
  return {
    type: EDIT_POST,
    postId,
    newTitle,
    newContent,
    newTimestamp,
  }
}

export function editComment(postId, newContent, newTimestamp) {
  return {
    type: EDIT_COMMENT,
    postId,
    newContent,
    newTimestamp,
  }
}

export function votePost (postId, decision) {
  return {
    type: VOTE_POST,
    postId,
    decision,
  }
}

export function voteComment (commentId, decision) {
  return {
    type: VOTE_COMMENT,
    commentId,
    decision,
  }
}

export function setModal (status) {
  return {
    type: SET_MODAL,
    status,
  }
}

export function setCommentModal (status) {
  return {
    type: SET_COMMENT_MODAL,
    status,
  }
}

export function setEdit (status) {
  return {
    type: SET_EDIT,
    status,
  }
}

export function setEditComment (status) {
  return {
    type: SET_EDIT_COMMENT,
    status,
  }
}

export function setId (id) {
  return {
    type: SET_ID,
    id,
  }
}

export function setTitle (title) {
  return {
    type: SET_TITLE,
    title,
  }
}

export function setAuthor (author) {
  return {
    type: SET_AUTHOR,
    author,
  }
}

export function setContent (content) {
  return {
    type: SET_CONTENT,
    content,
  }
}

export function setCategory (category) {
  return {
    type: SET_CATEGORY,
    category,
  }
}

export function deletePost (postId) {
  return {
    type: DELETE_POST,
    postId,
  }
}

export function deleteComment (postId) {
  return {
    type: DELETE_COMMENT,
    postId,
  }
}

export function getDelete (postId) {
  return {
    type: SEND_DELETE,
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
    type: SEND_DELETE_COMMENT,
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

// export const sendDeleteComment

export function getData({ data }) {
  return {
    type: GET_DATA,
    data,
  }
}

export const fetchData = () => dispatch => (
  fetch('http://localhost:3001/posts', {
    headers: { Authorization: '314' }
  })
  .then(data => data.json())
  .then(data => {
    console.log("Piggy: ", data)
    dispatch(getData({ data }))
  })
);

export function getComments(data) {
  return {
    type: GET_COMMENTS,
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
    type: SEND_POST,
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
    console.log("Goblet Data: ", data)
    dispatch(setPost({ data }))
  })
);

export function setComment(comment) {
  return {
    type: SEND_COMMENT,
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
    type: SET_POST_VOTE,
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
    type: SET_COMMENT_VOTE,
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
    type: SEND_EDIT,
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
    type: SEND_COMMENT_EDIT,
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
    type: SET_SORT,
    order,
  }
}

export function pageCategory(category) {
  return {
    type: PAGE_CATEGORY,
    category,
  }
}

export function setPath(path) {
  return {
    type: SET_PATH,
    path,
  }
}

export function alterCommentCount(postId, alteration) {
  return {
    type: ALTER_COMMENT_COUNT,
    postId,
    alteration,
  }
}
