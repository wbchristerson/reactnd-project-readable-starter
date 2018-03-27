import {
  ADD_POST,
  ADD_COMMENT,
  VOTE_UP,
  VOTE_DOWN,
  DELETE_POST,
  EDIT_POST
} from '../actions'

const initialDataState = {
  posts: [],
  comments: []
}

function updatePost (state = initialDataState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: state.posts.concat([action.post])
      }
    case ADD_COMMENT:
      return {}
    default:
      return state
  }
}

export default updatePost
