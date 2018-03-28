import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Comment from './Comment'
import Modal from 'react-modal'
const uuidv1 = require('uuid/v1');

class Main extends Component {
  state = {
    postModalOpen: false,
    currentPost: null,
    postList: [],
    currentTitle: '',
    currentAuthor: '',
    currentContent: '',
    currentCategory: 'react'
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  componentDidMount() {
    fetch(
      'http://localhost:3001/posts',
      {
        headers: { 'Authorization': '314' }
      }
    )
    .then(data => data.json())
    .then(data => {
      console.log("Data: ", data)
      this.setState({
        postList: data.filter(post => post.hasOwnProperty('id'))
      })
    })
  }

  postModalOpen = ({ post }) => {
    this.setState(() => ({
      postModalOpen: true,
      currentPost: post,
    }))
  }

  postModalClose = () => {
    this.setState(() => ({
      postModalOpen: false,
      currentPost: null,
      currentTitle: '',
      currentAuthor: '',
      currentContent: '',
      currentCategory: 'react'
    }))
  }

  submitPost = () => {
    let obj = {
      author: this.state.currentAuthor,
      body: this.state.currentContent,
      category: this.state.currentCategory,
      deleted: false,
      id: uuidv1(),
      timestamp: Date.now(),
      title: this.state.currentTitle,
      voteScore: 1
    };
    fetch('http://localhost:3001/posts',
      {
        method: 'POST',
        headers: { 'Authorization': '314', 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }
    )
    .then(data => data.json())
    .then(() => this.postModalClose())
  }

  orderByFunc = () => {
    document.getElementById("orderDropdown").classList.toggle("show");
  }

  handleTitleChange = (event) => {
    this.setState({ currentTitle: event.target.value })
  }

  handleAuthorChange = (event) => {
    this.setState({ currentAuthor: event.target.value })
  }

  handleContentChange = (event) => {
    this.setState({ currentContent: event.target.value })
  }

  handleCategoryChange = (event) => {
    this.setState({ currentCategory: event.target.value })
  }

  render() {
    const { postModalOpen } = this.state
    return (
      <div>
        <div className="wrapper horizontal-direction">
          <div className="sort-by">
            <p>Order By: </p>
            <div className="dropdown">
              <button className="dropbtn order-button" onClick={this.orderByFunc}>Number Of Votes   <i className="fa fa-arrow-down"></i></button>
              <div id="orderDropdown" className="dropdown-content">
                <a>Number Of Votes</a>
                <a>Original Post Date</a>
              </div>
            </div>
          </div>

          <div className="add-comment">
            <button onClick={() => this.postModalOpen({})} className="dropbtn"><i className="fa fa-plus"></i> Add A Post</button>
          </div>
        </div>


        <div className="wrapper all-posts">
          {this.state.postList.map((post) => {
            return (
              <Link key={post.id} to="/post">
                <Comment title={post.title} voteScore={post.voteScore}
                         author={post.author} commentCount={post.commentCount}
                         category={post.category}/>
              </Link>
            )
          })}
        </div>

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
              <input className="post-input-short" type="text" value={this.state.currentTitle}
                     onChange={this.handleTitleChange} name="title" placeholder="Title"/>
              <input className="post-input-short" type="text" value={this.state.currentAuthor}
                     onChange={this.handleAuthorChange} name="author" placeholder="Author"/>
              <label className="category-radio-list">
                Category:
                <div className="radio-element">
                  <input type="radio" name="category" value="react"
                         checked={this.state.currentCategory === 'react'}
                         onChange={this.handleCategoryChange}/>
                  <label>React</label>
                </div>
                <div className="radio-element">
                  <input type="radio" name="category" value="redux"
                         checked={this.state.currentCategory === 'redux'}
                         onChange={this.handleCategoryChange}/>
                  <label>Redux</label>
                </div>
                <div className="radio-element">
                  <input type="radio" name="category" value="udacity"
                         checked={this.state.currentCategory === 'udacity'}
                         onChange={this.handleCategoryChange}/>
                  <label>Udacity</label>
                </div>
              </label>
              <textarea className="content-input" rows="12" cols="50" value={this.state.currentContent}
                        onChange={this.handleContentChange} placeholder="Content"/>
              <div className="modal-buttons-set">
                <button className="modal-button" onClick={this.submitPost}>Submit</button>
                <button className="modal-button" onClick={this.postModalClose}>Cancel</button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Main
