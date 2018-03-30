export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const VOTE_POST = 'VOTE_POST'
export const SET_VOTE = 'SET_VOTE'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const GET_DATA = 'GET_DATA'
export const SEND_POST = 'SEND_POST'
export const SET_SORT = 'SET_SORT'

export function addPost (post) {
  return {
    type: ADD_POST,
    post,
  }
}

export function addComment ({postId, comment}) {
  return {
    type: ADD_COMMENT,
    postId,
    comment,
  }
}

export function votePost (postId, decision) {
  return {
    type: VOTE_POST,
    postId,
    decision,
  }
}

export function deletePost ({ comment }) {
  return {
    type: DELETE_POST,
    comment,
  }
}

export function editPost ({ comment, editObject }) {
  return {
    type: EDIT_POST,
    comment,
    editObject,
  }
}

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

export function setVote(id, decision) {
  return {
    type: SET_VOTE,
    id,
    decision,
  }
}

export const sendVote = (id, decision) => dispatch => (
  fetch(`http://localhost:3001/posts/${id}`, {
    method: 'POST',
    headers: {
      Authorization: '314',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: decision })
  })
  .then(data => data.json())
  .then(() => dispatch(setVote(id, decision)))
)

/** sort visible posts by the order given; 'order' should be an element in
 *  { 'date-early', 'date-late', 'vote-most', 'vote-least' }
 */
export function setSort(order) {
  return {
    type: SET_SORT,
    order,
  }
}
