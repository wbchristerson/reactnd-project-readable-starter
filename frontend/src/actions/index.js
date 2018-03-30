export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const VOTE_UP = 'VOTE_UP'
export const VOTE_DOWN = 'VOTE_DOWN'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const GET_DATA = 'GET_DATA'
export const SEND_POST = 'SEND_POST'

// export const serveData = () => {
//
// }

export function addPost (post) {
  return {
    type: ADD_POST,
    post,
  }
}

export function addComment ({ postId, comment }) {
  return {
    type: ADD_COMMENT,
    postId,
    comment,
  }
}

export function voteUp ({ comment }) {
  return {
    type: VOTE_UP,
    comment,
  }
}

export function voteDown ({ comment }) {
  return {
    type: VOTE_DOWN,
    comment,
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
