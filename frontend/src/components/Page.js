import React, { Component } from 'react'
import Post from './Post'
import Comment from './Comment'
import { connect } from 'react-redux'
import { fetchComments, setCommentModal, setAuthor, setEditComment, setId, setContent, addComment, sendComment } from '../actions'
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
    } else {
      // this.props.dispatch(editComment(this.props.currentId, this.props.currentTitle, this.props.currentContent))
      // this.props.dispatch(fetchCommentEdit(this.props.currentId, this.props.currentTitle, this.props.currentContent))
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
          <Post body={body} voteScore={voteScore} id={this.props.match.params.id}/>
          <p className="comments-title">Comments:</p>
          <div>
            {this.props.comments.filter((comment) => !comment.deleted).map((comment) => (
              <Comment key={comment.id} id={comment.id}/>
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
      </div>
    );
  }
}

function mapStateToProps (fullState) {
  console.log("Hallows: ", fullState)
  return {
    posts: fullState.posts,
    comments: fullState.comments,
    commentModalOpen: fullState.commentModalOpen,
    commentEdit: fullState.commentEdit,
    currentAuthor: fullState.currentAuthor,
    currentContent: fullState.currentContent,
    currentId: fullState.currentId,
  }
}

export default connect(mapStateToProps)(Page)

// export default Page
