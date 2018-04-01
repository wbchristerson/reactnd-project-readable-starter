import React, { Component } from 'react'
import Post from './Post'
import Comment from './Comment'
import { connect } from 'react-redux'
import { fetchComments, setCommentModal, setAuthor, setEditComment, setId,
         setContent, addComment, sendComment, editComment, fetchCommentEdit,
         alterCommentCount, editPost, fetchEdit, setModal, setCategory, setEdit,
         setTitle} from '../actions'
import Modal from 'react-modal'
const uuidv1 = require('uuid/v1')

class Page extends Component {
  componentWillMount() {
    Modal.setAppElement('body');
  }

  componentDidMount() {
    this.props.dispatch(fetchComments(this.props.match.params.id))
  }

  commentModalOpen = () => {
    console.log("Unicorn: ", this.props.commentEdit)
    this.props.dispatch(setCommentModal(true))
  }

  commentModalClose = () => {
    this.props.dispatch(setCommentModal(false))
    this.props.dispatch(setEditComment(false)) // set false the flag for whether a post is being edited (rather than creating a new post)
    this.props.dispatch(setAuthor(''))
    this.props.dispatch(setContent(''))
    this.props.dispatch(setId(-1))
  }

  postModalOpen = () => {
    console.log("Phoenix: ", this.props.postEdit)
    this.props.dispatch(setModal(true))
    this.props.dispatch(setCategory(this.props.match.params.category))
  }

  postModalClose = () => {
    this.props.dispatch(setModal(false))
    this.props.dispatch(setEdit(false)) // set false the flag for whether a post is being edited (rather than creating a new post)
    this.props.dispatch(setTitle(''))
    this.props.dispatch(setAuthor(''))
    this.props.dispatch(setContent(''))
    this.props.dispatch(setId(-1))
  }

  submitComment = () => {
    if (!this.props.commentEdit) {
      let obj = {
        author: this.props.currentAuthor,
        body: this.props.currentContent,
        deleted: false,
        id: uuidv1(),
        parentDeleted: false,
        parentId: this.props.match.params.id,
        timestamp: Date.now(),
        voteScore: 1
      };
      this.props.dispatch(addComment(obj))
      this.props.dispatch(sendComment(obj))
      this.props.dispatch(alterCommentCount(this.props.match.params.id, 1))
    } else {
      this.props.dispatch(editComment(this.props.currentId, this.props.currentContent, Date.now()))
      this.props.dispatch(fetchCommentEdit(this.props.currentId, this.props.currentContent, Date.now()))
    }
    this.commentModalClose()
  }

  handleAuthorChange = (event) => {
    if (!this.props.commentEdit) {
      this.props.dispatch(setAuthor(event.target.value))
    }
  }

  handleContentChange = (event) => {
    this.props.dispatch(setContent(event.target.value))
  }

  handlePostTitleChange = (event) => {
    this.props.dispatch(setTitle(event.target.value))
  }

  handlePostContentChange = (event) => {
    this.props.dispatch(setContent(event.target.value))
  }

  submitPost = () => {
    this.props.dispatch(editPost(this.props.currentId, this.props.currentTitle, this.props.currentContent, Date.now()))
    this.props.dispatch(fetchEdit(this.props.currentId, this.props.currentTitle, this.props.currentContent, Date.now()))
    this.postModalClose()
  }

  // for form elements that require onChange functions
  fillerFunction = () => {
  }

  // <label className="category-radio-list">
  // Category:
  // <div className="radio-element">
  // <input type="radio" name="category" value="react"
  // checked={this.props.currentCategory === 'react'}
  // onChange={this.handleCategoryChange}/>
  // <label>React</label>
  // </div>
  // <div className="radio-element">
  // <input type="radio" name="category" value="redux"
  // checked={this.props.currentCategory === 'redux'}
  // onChange={this.handleCategoryChange}/>
  // <label>Redux</label>
  // </div>
  // <div className="radio-element">
  // <input type="radio" name="category" value="udacity"
  // checked={this.props.currentCategory === 'udacity'}
  // onChange={this.handleCategoryChange}/>
  // <label>Udacity</label>
  // </div>
  // </label>

  // <input className="post-input-short" type="text" value={this.props.currentTitle}
  //        onChange={this.handleTitleChange} name="title" placeholder="Title"/>

  render() {
    let postModalOpen = this.props.postModalOpen
    let commentModalOpen = this.props.commentModalOpen
    console.log("Horcrux: ", this.props)
    let matchEntryArr = this.props.posts.filter((post) => post.id === this.props.match.params.id)
    console.log("Turnip: ", matchEntryArr)
    let post = matchEntryArr.length > 0 ? matchEntryArr[0] : {}
    console.log("Carrot: ", post)
    let title = post.hasOwnProperty('title') ? post.title : ''
    let author = post.hasOwnProperty('author') ? post.author : ''
    let voteScore = post.hasOwnProperty('voteScore') ? post.voteScore : ''
    let timestamp = post.hasOwnProperty('timestamp') ? post.timestamp : ''
    let commentCount = post.hasOwnProperty('commentCount') ? post.commentCount : ''
    let body = post.hasOwnProperty('body') ? post.body : ''
    if ((matchEntryArr.length === 0) || (post.hasOwnProperty('deleted') && post.deleted)) {
      return (
        <div className="wrapper error-page">
          Error: The page that you requested could not be found on the server.
        </div>
      )
    }
    // var moment = require('moment');
    // moment().format();
    // let date = require('unix-date')
    // var t = new Date( 1370001284000 );
    // var formatted = t.format("dd.mm.yyyy hh:MM:ss");
    // let timestamp = post.hasOwnProperty('timestamp') ? t : ''
    // console.log("Timestamp: ", timestamp)
    return (
      <div>
        <div className="wrapper">
          <p className="post-title">{title}</p>
          <div className="vote-score">
            <p className="style-info">Author: {author}</p>
            <p className="style-info">Vote Score: {voteScore}</p>
          </div>
          <div className="post-info">
            <p className="style-info">{timestamp}</p>
            <p className="style-info">Comments: {commentCount}</p>
          </div>
          <Post body={body} voteScore={voteScore} id={this.props.match.params.id}
                title={title} author={author} content={body} category={this.props.match.params.category}/>
          <p className="comments-title">Comments:</p>
          <div>
            {this.props.comments.filter((comment) => !comment.deleted).map((comment) => (
              <Comment key={comment.id} id={comment.id} parentId={this.props.match.params.id}/>
            ))}
          </div>
          <button onClick={() => this.commentModalOpen()} className="comment-button">
            Add A Comment
          </button>
        </div>

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={commentModalOpen}
          onRequestClose={this.commentModalClose}
          contentLabel='Modal'
        >
          <div className='post-creation-container'>
            <h3 className='subheader'>
              Compose A Readable Comment!
            </h3>
            <div className="post-content-container">
              <input className="post-input-short" type="text" value={this.props.currentAuthor}
                     onChange={this.handleAuthorChange} name="author" placeholder="Author"/>
              <textarea className="content-input" rows="12" cols="50" value={this.props.currentContent}
                        onChange={this.handleContentChange} placeholder="Content"/>
              <div className="modal-buttons-set">
                <button className="modal-button" onClick={this.submitComment}>Submit</button>
                <button className="modal-button" onClick={this.commentModalClose}>Cancel</button>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={postModalOpen}
          onRequestClose={this.postModalClose}
          contentLabel='Modal'
        >
          <div className='post-creation-container'>
            <h3 className='subheader'>
              Compose A Readable Post!
            </h3>
            <div className="post-content-container">
              <input className="post-input-short" type="text" value={this.props.currentTitle}
                     onChange={this.handlePostTitleChange} name="title" placeholder="Title"/>
              <input className="post-input-short" type="text" value={this.props.currentAuthor}
                     onChange={this.fillerFunction} name="author" placeholder="Author"/>
              <label className="category-radio-list">
                Category:
                <div className="radio-element">
                  <input type="radio" name="category" value="react"
                         onChange={this.fillerFunction}
                         checked={this.props.match.params.category === 'react'}/>
                  <label>React</label>
                </div>
                <div className="radio-element">
                  <input type="radio" name="category" value="redux"
                         onChange={this.fillerFunction}
                         checked={this.props.match.params.category === 'redux'}/>
                  <label>Redux</label>
                </div>
                <div className="radio-element">
                  <input type="radio" name="category" value="udacity"
                         onChange={this.fillerFunction}
                         checked={this.props.match.params.category === 'udacity'}/>
                  <label>Udacity</label>
                </div>
              </label>
              <textarea className="content-input" rows="12" cols="50" value={this.props.currentContent}
                        onChange={this.handlePostContentChange} placeholder="Content"/>
              <div className="modal-buttons-set">
                <button className="modal-button" onClick={this.submitPost}>Submit</button>
                <button className="modal-button" onClick={this.postModalClose}>Cancel</button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps (fullState) {
  console.log("Hallows: ", fullState)
  return {
    posts: fullState.posts,
    comments: fullState.comments,
    postModalOpen: fullState.postModalOpen,
    commentModalOpen: fullState.commentModalOpen,
    commentEdit: fullState.commentEdit,
    currentTitle: fullState.currentTitle,
    currentAuthor: fullState.currentAuthor,
    currentContent: fullState.currentContent,
    currentId: fullState.currentId,
    commentCount: fullState.commentCount
  }
}

export default connect(mapStateToProps)(Page)

// export default Page
