import * as actionTypes from '../actions/types'

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
    case actionTypes.ADD_POST:
      return {
        ...state,
        posts: state.posts.concat([action.post])
      }
    case actionTypes.ADD_COMMENT:
      return {
        ...state,
        comments: state.comments.concat([action.comment])
      }
    case actionTypes.GET_DATA:
      return {
        ...state,
        posts: state.posts.concat(action.data)
      }
    case actionTypes.SEND_POST:
      return state
    case actionTypes.SEND_COMMENT:
      return state
    case actionTypes.VOTE_POST:
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
    case actionTypes.VOTE_COMMENT:
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
    case actionTypes.SET_POST_VOTE:
      return state
    case actionTypes.SET_COMMENT_VOTE:
      return state
    case actionTypes.SET_SORT:
      return {
        ...state,
        sortPosts: action.order,
      }
    case actionTypes.DELETE_POST:
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
    case actionTypes.DELETE_COMMENT:
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
    case actionTypes.SEND_DELETE:
      return state
    case actionTypes.SEND_DELETE_COMMENT:
      return state
    case actionTypes.SET_MODAL:
      return {
        ...state,
        postModalOpen: action.status,
      }
    case actionTypes.SET_COMMENT_MODAL:
      return {
        ...state,
        commentModalOpen: action.status,
      }
    case actionTypes.SET_EDIT:
      return {
        ...state,
        postEdit: action.status,
      }
    case actionTypes.SET_EDIT_COMMENT:
      return {
        ...state,
        commentEdit: action.status,
      }
    case actionTypes.SET_TITLE:
      return {
        ...state,
        currentTitle: action.title,
      }
    case actionTypes.SET_AUTHOR:
      return {
        ...state,
        currentAuthor: action.author,
      }
    case actionTypes.SET_CONTENT:
      return {
        ...state,
        currentContent: action.content,
      }
    case actionTypes.SET_CATEGORY:
      return {
        ...state,
        currentCategory: action.category,
      }
    case actionTypes.SET_ID:
      return {
        ...state,
        currentId: action.id
      }
    case actionTypes.EDIT_POST:
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
    case actionTypes.EDIT_COMMENT:
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
    case actionTypes.SEND_EDIT:
      return state
    case actionTypes.SEND_COMMENT_EDIT:
      return state
    case actionTypes.PAGE_CATEGORY:
      return {
        ...state,
        category: action.category
      }
    case actionTypes.SET_PATH:
      return {
        ...state,
        path: action.path
      }
    case actionTypes.GET_COMMENTS:
      return {
        ...state,
        comments: action.data
      }
    case actionTypes.ALTER_COMMENT_COUNT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === action.postId) {
            let nextPost = post
            nextPost.commentCount += action.alteration
            return nextPost
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
