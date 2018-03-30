import React, { Component } from 'react'
import Item from './Item'
import Modal from 'react-modal'
import { addPost, sendData, setSort } from '../actions'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
const uuidv1 = require('uuid/v1')

class Main extends Component {
  state = {
    postModalOpen: false,
    currentPost: null,
    currentTitle: '',
    currentAuthor: '',
    currentContent: '',
    currentCategory: 'react'
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  /*
   * The clickable dropdown structure here and in index.css is based on the tutorial found here:
   * https://www.w3schools.com/howto/howto_js_dropdown.asp
   *
   * The following function for handling clicking outside of the dropdown button
   * is taken from the tutorial page above.
   */
  componentDidMount() {
    window.addEventListener("click", function(event) {
      if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    })
  }

  postModalOpen = ({ post }) => {
    this.setState({
      postModalOpen: true,
      currentPost: post,
    })
  }

  postModalClose = () => {
    this.setState({
      postModalOpen: false,
      currentPost: null,
      currentTitle: '',
      currentAuthor: '',
      currentContent: '',
      currentCategory: 'react'
    })
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
    this.props.dispatch(addPost({
      ...obj,
      commentCount: 0
    }))
    this.props.dispatch(sendData(obj))
    this.postModalClose()
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

  sortButton = (order) => {
    this.props.dispatch(setSort(order))
  }

  /*
   * The clickable dropdown structure here and in index.css is based on the tutorial found here:
   * https://www.w3schools.com/howto/howto_js_dropdown.asp
   *
   * The following function for handling clicking the dropdown button and
   * clicking outside of it are taken from the page above.
   */
  orderByFunc = () => {
    document.getElementById("orderDropdown").classList.toggle("show");
  }

  getOrder = () => {
    switch(this.props.sortPosts) {
      case '-timestamp':
        return "Post Date (Latest First)"
      case 'timestamp':
        return "Post Date (Earliest First)"
      case 'voteScore':
        return "Vote Count (Least First)"
      default:
        return "Vote Count (Most First)"
    }
  }

  // Close the dropdown menu if the user clicks outside of it

  render() {
    const { postModalOpen } = this.state
    let sortedPosts = this.props.posts.sort(sortBy(this.props.sortPosts))
    let order = this.getOrder()
    return (
      <div>
        <div className="wrapper horizontal-direction">
          <div className="sort-by">
            <p>Order By: </p>
            <div className="dropdown">
              <button className="dropbtn order-button" onClick={this.orderByFunc}>{order} <i className="fa fa-arrow-down"></i></button>
              <div id="orderDropdown" className="dropdown-content">
                <a onClick={() => this.sortButton('timestamp')} className="sort-option">
                  Post Date (Earliest First) {this.props.sortPosts === 'timestamp' && <i className="fa fa-check"></i>}
                </a>
                <a onClick={() => this.sortButton('-timestamp')} className="sort-option">
                  Post Date (Latest First) {this.props.sortPosts === '-timestamp' && <i className="fa fa-check"></i>}
                </a>
                <a onClick={() => this.sortButton('-voteScore')} className="sort-option">
                  Vote Count (Most First) {this.props.sortPosts === '-voteScore' && <i className="fa fa-check"></i>}
                </a>
                <a onClick={() => this.sortButton('voteScore')} className="sort-option">
                  Vote Count (Least First) {this.props.sortPosts === 'voteScore' && <i className="fa fa-check"></i>}
                </a>
              </div>
            </div>
          </div>

          <div className="add-comment">
            <button onClick={() => this.postModalOpen({})} className="dropbtn"><i className="fa fa-plus"></i> Add A Post</button>
          </div>
        </div>


        <div className="wrapper all-posts">
          {sortedPosts.map((post) => (
            <Item key={post.id} title={post.title} category={post.category}
                  author={post.author} commentCount={post.commentCount}
                  voteScore={post.voteScore} id={post.id}/>
          ))}
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


function mapStateToProps (fullState) {
  return {
    posts: fullState.posts,
    sortPosts: fullState.sortPosts
  }
}

export default connect(mapStateToProps)(Main)
