import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Comment from './Comment'

class Main extends Component {
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
    return (
      <div>
        <div className="wrapper horizontal-direction">
          <p>Order By: </p>
          <div className="dropdown">
            <button className="dropbtn" onClick={this.orderByFunc}>Number Of Votes   <i className="fa fa-arrow-down"></i></button>
            <div id="orderDropdown" className="dropdown-content">
              <a>Number Of Votes</a>
              <a>Original Post Date</a>
            </div>
          </div>
        </div>

        <div className="wrapper horizontal-direction">
          <p>Add A Post: </p>
          <button className="add-post">
            <i className="fa fa-plus"></i>
          </button>
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
      </div>
    )
  }
}

export default Main
