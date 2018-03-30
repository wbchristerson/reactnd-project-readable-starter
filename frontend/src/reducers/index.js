import {
  ADD_POST,
  ADD_COMMENT,
  VOTE_POST,
  DELETE_POST,
  EDIT_POST,
  GET_DATA,
  SEND_POST,
  SET_VOTE,
  SET_SORT
} from '../actions'

const initialDataState = {
  posts: [],
  comments: [],
  sortPosts: 'date-early'
}

function updatePost (state = initialDataState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: state.posts.concat([action.post])
      }
    case GET_DATA:
      console.log("Azkaban Data: ", action.data)
      return {
        ...state,
        posts: state.posts.concat(action.data)
      }
    case SEND_POST:
      return state
    case VOTE_POST:
      let decision = 1
      if (action.decision === 'downVote') {
        decision = -1
      }
      let data = state.posts.map((post) => {
        if (post.id === action.postId) {
          post.voteScore += decision
          return post
        } else {
          return post
        }
      })
      return {
        ...state,
        posts: data
      }
    case SET_VOTE:
      return state
    case SET_SORT:
      return {
        ...state,
        sortPosts: action.order,
      }
    case ADD_COMMENT:
      return {}
    default:
      return state
  }

}

export default updatePost
