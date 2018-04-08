import React, { Component } from 'react'
import Item from './Item'
import Modal from 'react-modal'
import { addPost, sendData, setSort, setModal, setEdit, setTitle, setAuthor,
  setContent, setCategory, setId, editPost, fetchEdit, pageCategory } from '../actions'
import { connect } from 'react-redux'
import sortBy from 'sort-by'

class Main extends Component {
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
    this.props.dispatch(pageCategory(this.props.pathCategory))
  }

  postModalOpen = () => {
    this.props.dispatch(setModal(true))
    this.props.dispatch(setCategory('react'))
  }

  postModalClose = () => {
    this.props.dispatch(setModal(false))
    this.props.dispatch(setEdit(false)) // set false the flag for whether a post is being edited (rather than creating a new post)
    this.props.dispatch(setTitle(''))
    this.props.dispatch(setAuthor(''))
    this.props.dispatch(setContent(''))
    this.props.dispatch(setCategory(''))
    this.props.dispatch(setId(-1))
  }

  /*  The function below was taken from this stack overflow answer regarding generating pseudo-unique identification  codes:
   *  https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript?page=1&tab=active#tab-top
   *  It is likewise used in Page.js to generate pseudo-unique identification for comments.
   */
  identGenerator = () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  submitPost = () => {
    if (!this.props.currentTitle) {
      alert("Please include a title.")
    } else if (!this.props.currentAuthor) {
      alert("Please include an author.")
    } else if (!this.props.currentContent) {
      alert("Please include content.")
    } else {
      if (!this.props.postEdit) {
        let obj = {
          author: this.props.currentAuthor,
          body: this.props.currentContent,
          category: this.props.currentCategory,
          deleted: false,
          id: this.identGenerator(),
          timestamp: Date.now(),
          title: this.props.currentTitle,
          voteScore: 1
        };
        this.props.dispatch(addPost({
          ...obj,
          commentCount: 0
        }))
        this.props.dispatch(sendData(obj))
      } else {
        this.props.dispatch(editPost(this.props.currentId, this.props.currentTitle, this.props.currentContent, Date.now()))
        this.props.dispatch(fetchEdit(this.props.currentId, this.props.currentTitle, this.props.currentContent, Date.now()))
      }
      this.postModalClose()
    }
  }

  handleTitleChange = (event) => {
    this.props.dispatch(setTitle(event.target.value))
  }

  handleAuthorChange = (event) => {
    if (!this.props.postEdit) {
      this.props.dispatch(setAuthor(event.target.value))
    }
  }

  handleContentChange = (event) => {
    this.props.dispatch(setContent(event.target.value))
  }

  handleCategoryChange = (event) => {
    if (!this.props.postEdit) {
      this.props.dispatch(setCategory(event.target.value))
    }
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

  render() {
    const postModalOpen = this.props.postModalOpen
    let sortedPosts = this.props.posts.filter((post) => !post.deleted).sort(sortBy(this.props.sortPosts))
    if (this.props.category !== '') {
      sortedPosts = sortedPosts.filter(post => (post.category === this.props.category))
    }
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
            <button onClick={() => this.postModalOpen()} className="dropbtn"><i className="fa fa-plus"></i> Add A Post</button>
          </div>
        </div>


        <div className="wrapper all-posts">
          {sortedPosts.map((post) => (
            <Item key={post.id} title={post.title} category={post.category}
              author={post.author} commentCount={post.commentCount}
              voteScore={post.voteScore} content={post.body} id={post.id}/>
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
              <input className="post-input-short" type="text" value={this.props.currentTitle}
                onChange={this.handleTitleChange} name="title" placeholder="Title"/>
              <input className="post-input-short" type="text" value={this.props.currentAuthor}
                onChange={this.handleAuthorChange} name="author" placeholder="Author"/>
              <label className="category-radio-list">
                Category:
                <div className="radio-element">
                  <input type="radio" name="category" value="react"
                    checked={this.props.currentCategory === 'react'}
                    onChange={this.handleCategoryChange}/>
                  <label>React</label>
                </div>
                <div className="radio-element">
                  <input type="radio" name="category" value="redux"
                    checked={this.props.currentCategory === 'redux'}
                    onChange={this.handleCategoryChange}/>
                  <label>Redux</label>
                </div>
                <div className="radio-element">
                  <input type="radio" name="category" value="udacity"
                    checked={this.props.currentCategory === 'udacity'}
                    onChange={this.handleCategoryChange}/>
                  <label>Udacity</label>
                </div>
              </label>
              <textarea className="content-input" rows="12" cols="50" value={this.props.currentContent}
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
    sortPosts: fullState.sortPosts,
    postModalOpen: fullState.postModalOpen,
    postEdit: fullState.postEdit,
    currentTitle: fullState.currentTitle,
    currentAuthor: fullState.currentAuthor,
    currentContent: fullState.currentContent,
    currentCategory: fullState.currentCategory,
    currentId: fullState.currentId,
    category: fullState.category,
  }
}

export default connect(mapStateToProps)(Main)
