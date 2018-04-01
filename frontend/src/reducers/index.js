import {
  ADD_POST,
  VOTE_POST,
  DELETE_POST,
  GET_DATA,
  SEND_POST,
  SET_POST_VOTE,
  SET_SORT,
  SEND_DELETE,
  SET_MODAL,
  SET_EDIT,
  SET_TITLE,
  SET_AUTHOR,
  SET_CONTENT,
  SET_CATEGORY,
  SET_ID,
  EDIT_POST,
  SEND_EDIT,
  PAGE_CATEGORY,
  SET_PATH,
  GET_COMMENTS,
  SET_COMMENT_MODAL,
  SET_EDIT_COMMENT,
  ADD_COMMENT,
  SEND_COMMENT,
  VOTE_COMMENT,
  SET_COMMENT_VOTE,
  EDIT_COMMENT,
  SEND_COMMENT_EDIT,
  DELETE_COMMENT,
  SEND_DELETE_COMMENT
} from '../actions'

const initialDataState = {
  posts: [],
  comments: [],
  sortPosts: 'timestamp',
  postModalOpen: false,
  commentModalOpen: false,
  commentEdit: false,
  postEdit: false,
  currentId: -1,
  currentTitle: '',
  currentAuthor: '',
  currentContent: '',
  currentCategory: 'react',
  category: '',
  path: '/'
}

function updatePost (state = initialDataState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: state.posts.concat([action.post])
      }
    case ADD_COMMENT:
      return {
        ...state,
        comments: state.comments.concat([action.comment])
      }
    case GET_DATA:
      console.log("Azkaban Data: ", action.data)
      return {
        ...state,
        posts: state.posts.concat(action.data)
      }
    case SEND_POST:
      return state
    case SEND_COMMENT:
      return state
    case VOTE_POST:
      let postDecision = 1
      if (action.decision === 'downVote') {
        postDecision = -1
      }
      let postData = state.posts.map((post) => {
        if (post.id === action.postId) {
          post.voteScore += postDecision
          return post
        } else {
          return post
        }
      })
      return {
        ...state,
        posts: postData
      }
    case VOTE_COMMENT:
      let commentDecision = 1
      if (action.decision === 'downVote') {
        commentDecision = -1
      }
      let commentData = state.comments.map((comment) => {
        if (comment.id === action.commentId) {
          comment.voteScore += commentDecision
          return comment
        } else {
          return comment
        }
      })
      return {
        ...state,
        comments: commentData
      }
    case SET_POST_VOTE:
      return state
    case SET_COMMENT_VOTE:
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
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id !== action.postId) {
            return comment
          } else {
            let newComment = comment
            newComment.deleted = true
            return newComment
          }
        })
      }
    case SEND_DELETE:
      return state
    case SEND_DELETE_COMMENT:
      return state
    case SET_MODAL:
      return {
        ...state,
        postModalOpen: action.status,
      }
    case SET_COMMENT_MODAL:
      return {
        ...state,
        commentModalOpen: action.status,
      }
    case SET_EDIT:
      return {
        ...state,
        postEdit: action.status,
      }
    case SET_EDIT_COMMENT:
      return {
        ...state,
        commentEdit: action.status,
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
            newPost.timestamp = action.newTimestamp
            return newPost
          } else {
            return post
          }
        })
      }
    case EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.postId) {
            let newComment = comment
            newComment.body = action.newContent
            newComment.timestamp = action.newTimestamp
            return newComment
          } else {
            return comment
          }
        })
      }
    case SEND_EDIT:
      return state
    case SEND_COMMENT_EDIT:
      return state
    case PAGE_CATEGORY:
      return {
        ...state,
        category: action.category
      }
    case SET_PATH:
      return {
        ...state,
        path: action.path
      }
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.data
      }
    default:
      return state
  }

}

export default updatePost
