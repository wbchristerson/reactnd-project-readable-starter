import React, { Component } from 'react'
import Post from './Post'
import Comment from './Comment'
import NotFound from './NotFound'
import { connect } from 'react-redux'
import { fetchComments, setCommentModal, setEditComment, addComment,
  sendComment, editComment, fetchCommentEdit } from '../actions/commentActions'
import { setAuthor, setId, setContent, setCategory, setEdit, setTitle } from '../actions/categoryActions'
import { alterCommentCount, editPost, fetchEdit, setModal } from '../actions/postActions'
import Modal from 'react-modal'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class Page extends Component {
  componentWillMount() {
    Modal.setAppElement('body');
  }

  componentDidMount() {
    this.props.dispatch(fetchComments(this.props.match.params.id))
  }

  commentModalOpen = () => {
    this.props.dispatch(setCommentModal(true))
  }

  commentModalClose = () => {
    this.props.dispatch(setCommentModal(false))
    // set false the flag for whether a comment is being edited (rather than creating a new post)
    this.props.dispatch(setEditComment(false))
    this.props.dispatch(setAuthor(''))
    this.props.dispatch(setContent(''))
    this.props.dispatch(setId(-1))
  }

  postModalOpen = () => {
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

  /*  The function below was taken from this stack overflow answer regarding generating pseudo-unique identification  codes:
   *  https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript?page=1&tab=active#tab-top
   *  It is likewise used in Main.js to generate pseudo-unique identification for posts.
   */
  identGenerator = () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  submitComment = () => {
    if (!this.props.currentContent) {
      alert("Please include content.")
    } else {
      if (!this.props.commentEdit) {
        let obj = {
          author: this.props.currentAuthor,
          body: this.props.currentContent,
          deleted: false,
          id: this.identGenerator(),
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
    if (!this.props.currentTitle) {
      alert("Please include a title.")
    } else if (!this.props.currentContent) {
      alert("Please include content.")
    } else {
      this.props.dispatch(editPost(this.props.currentId, this.props.currentTitle, this.props.currentContent, Date.now()))
      this.props.dispatch(fetchEdit(this.props.currentId, this.props.currentTitle, this.props.currentContent, Date.now()))
      this.postModalClose()
    }
  }

  // for form elements that require onChange functions but do not need any
  // resulting events to occur
  fillerFunction = () => {
  }

  // given a date object, convert it to a human-readable time formatted as
  // a string "MM/DD/YYYY HH:MM:SS"
  // this code is based on the answers given to the stack overflow question here:
  // https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
  toHumanTime = (date) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December']
    let hours = ('0' + date.getHours()).slice(-2)
    let halfDay = 'AM'
    let intHours = parseInt(hours, 10)
    if (intHours > 12) {
      intHours -= 12
      halfDay = 'PM'
      hours = '' + intHours
    }
    return months[date.getMonth()] +
      ' ' + ('0' + date.getDate()).slice(-2) +
      ', ' + date.getFullYear() +
      ',   ' + hours +
      ':' + ('0' + date.getMinutes()).slice(-2) +
      ':' + ('0' + date.getSeconds()).slice(-2) +
      ' ' + halfDay
  }

  render() {
    let postModalOpen = this.props.postModalOpen
    let commentModalOpen = this.props.commentModalOpen
    let matchEntryArr = this.props.posts.filter((post) => post.id === this.props.match.params.id)
    let post = matchEntryArr.length > 0 ? matchEntryArr[0] : {}
    let title = post.hasOwnProperty('title') ? post.title : ''
    let author = post.hasOwnProperty('author') ? post.author : ''
    let voteScore = post.hasOwnProperty('voteScore') ? post.voteScore : ''
    let timestamp = post.hasOwnProperty('timestamp') ? post.timestamp : ''
    let humanTime = (timestamp === '') ? '' : this.toHumanTime(new Date(timestamp)) // convert to human-readable date
    let commentCount = post.hasOwnProperty('commentCount') ? post.commentCount : ''
    let body = post.hasOwnProperty('body') ? post.body : ''

    if ((matchEntryArr.length === 0) || (post.hasOwnProperty('deleted') && post.deleted)) {
      return (
        <NotFound />
      )
    }

    return (
      <MuiThemeProvider>
        <div>
          <div className="wrapper">
            <Post body={body} voteScore={voteScore} id={this.props.match.params.id}
              title={title} author={author} content={body} category={this.props.match.params.category}
              time={humanTime} commentCount={commentCount} />
            <p className="comments-title">Comments:</p>
            <div>
              {this.props.comments.filter((comment) => !comment.deleted).map((comment) => (
                <Comment key={comment.id} id={comment.id} parentId={this.props.match.params.id}
                  humanTime={this.toHumanTime(new Date(comment.timestamp))}/>
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
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps (fullState) {
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
