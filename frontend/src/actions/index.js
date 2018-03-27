export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const VOTE_UP = 'VOTE_UP'
export const VOTE_DOWN = 'VOTE_DOWN'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'

export function addPost ({ category, post }) {
  return {
    type: ADD_POST,
    category,
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
