import {
  ADD_POST,
  VOTE_POST,
  DELETE_POST,
  GET_DATA,
  SEND_POST,
  SET_VOTE,
  SET_SORT,
  SEND_DELETE,
  SET_MODAL,
  SET_EDIT,
  SET_TITLE,
  SET_AUTHOR,
  SET_CONTENT,
  SET_CATEGORY,
  SET_ID,
  EDIT_POST
} from '../actions'

const initialDataState = {
  posts: [],
  comments: [],
  sortPosts: 'timestamp',
  postModalOpen: false,
  postEdit: false,
  currentId: -1,
  currentTitle: '',
  currentAuthor: '',
  currentContent: '',
  currentCategory: 'react'
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
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id !== action.postId) {
            return post
          } else {
            let newPost = post
            newPost.deleted = true
            return newPost
          }
        })
      }
    case SEND_DELETE:
      return state
    case SET_MODAL:
      return {
        ...state,
        postModalOpen: action.status,
      }
    case SET_EDIT:
      return {
        ...state,
        postEdit: action.status,
      }
    case SET_TITLE:
      return {
        ...state,
        currentTitle: action.title,
      }
    case SET_AUTHOR:
      return {
        ...state,
        currentAuthor: action.author,
      }
    case SET_CONTENT:
      return {
        ...state,
        currentContent: action.content,
      }
    case SET_CATEGORY:
      return {
        ...state,
        currentCategory: action.category,
      }
    case SET_ID:
      return {
        ...state,
        currentId: action.id
      }
    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === action.postId) {
            let newPost = post
            newPost.body = action.newContent
            newPost.title = action.newTitle
            return newPost
          } else {
            return post
          }
        })
      }
    default:
      return state
  }

}

export default updatePost
