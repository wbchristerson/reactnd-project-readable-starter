import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Comment from './Comment'
import Modal from 'react-modal'

class Main extends Component {
  state = {
    postModalOpen: false,
    currentPost: null,
    postCount: 0
  }

  componentWillMount() {
    Modal.setAppElement('body');
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
    }))
  }

  getPosts = () => {
    fetch(
      '/posts',
      {
        headers: { 'Authorization': '314' }
      }
    ).then((posts) => {
      console.log(posts);
      let postsArr = Object.keys(posts).map(function(key) {
        return posts[key];
      });
      console.log(postsArr);
    })
  }

  submitPost = () => {
    let id = this.state.postCount;
    let date = Date.now();
    console.log("ID: ", this.state.postCount);
    console.log("Date: ", date);
  }

  orderByFunc = () => {
    document.getElementById("orderDropdown").classList.toggle("show");
  }

  // filterByFunc = () => {
  //   document.getElementById("filterDropdown").classList.toggle("show");
  // }

  // <div className="horizontal-direction">
  //   <p>Filter By Categories: </p>
  //   <div className="dropdown">
  //     <button className="dropbtn" onClick={this.filterByFunc}>All Categories   <i className="fa fa-arrow-down"></i></button>
  //     <div id="filterDropdown" className="dropdown-content">
  //       <a>All Categories</a>
  //       <a>React</a>
  //       <a>Redux</a>
  //       <a>Udacity</a>
  //     </div>
  //   </div>
  // </div>

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
          <Link to="/post">
            <Comment />
          </Link>
          <Link to="/post">
            <Comment />
          </Link>
          <Link to="/post">
            <Comment />
          </Link>
          <Link to="/post">
            <Comment />
          </Link>
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
              <input className="post-input-short" type="text" name="title" placeholder="Title"/>
              <input className="post-input-short" type="text" name="author" placeholder="Author"/>
              <label className="category-radio-list">
                Category:
                <div className="radio-element">
                  <input type="radio" name="category" value="react"/>
                  <label>React</label>
                </div>
                <div className="radio-element">
                  <input type="radio" name="category" value="redux"/>
                  <label>Redux</label>
                </div>
                <div className="radio-element">
                  <input type="radio" name="category" value="udacity"/>
                  <label>Udacity</label>
                </div>
              </label>
              <textarea className="content-input" rows="12" cols="50" placeholder="Content"/>
              <div className="modal-buttons-set">
                <button className="modal-button" onClick={this.submitPost}>Submit</button>
                <button className="modal-button" onClick={this.getPosts}>Cancel</button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Main
