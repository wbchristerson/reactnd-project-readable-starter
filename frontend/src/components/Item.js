import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { votePost, sendPostVote, deletePost, sendDelete, setModal, setPath } from '../actions/postActions'
import { setEdit, setTitle, setAuthor, setContent, setCategory, setId } from '../actions/categoryActions'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
// import Card from 'material-ui/card/card.js'
// import Card from 'material-ui/lib/card/card';
import { Card, CardHeader, CardText, CardActions, CardTitle } from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
// import CardHeader from 'material-ui/card/cardheader.js'
// import CardText from 'material-ui/card/cardtext.js';


class Item extends Component {
  vote = (id, decision) => {
    this.props.dispatch(votePost(id, decision))
    this.props.dispatch(sendPostVote(id, decision))
  }

  destroy = (id) => {
    this.props.dispatch(deletePost(id))
    this.props.dispatch(sendDelete(id))
  }

  edit = () => {
    this.props.dispatch(setModal(true))
    this.props.dispatch(setEdit(true))
    this.props.dispatch(setTitle(this.props.title))
    this.props.dispatch(setAuthor(this.props.author))
    this.props.dispatch(setContent(this.props.content))
    this.props.dispatch(setCategory(this.props.category))
    this.props.dispatch(setId(this.props.id))
  }

  render() {
    let link = `/${this.props.category}/${this.props.id}`
    let authorInfo = "Author: " + this.props.author
    let commentInfo = "Comments: " + this.props.commentCount.toString()
    let categoryInfo = "Category: " + this.props.category
    return (
      <Card
        style={{
          // backgroundColor: '#59f442',
          // background: 'linear-gradient(to right bottom, #430089, #82ffa1)',
          background: 'linear-gradient(red, yellow)',
          boxShadow: `1px 3px 1px #9E9E9E`,
          // borderLeft: `1px #000002`,
          marginBottom: 5
        }}>
        <div className="main-post-info">
          <Link onClick={() => this.props.dispatch(setPath('/post'))} className="left-infto" to={link}>
            <CardHeader
              title={authorInfo}
              subtitle={commentInfo}
              avatar=""
              style={{
                marginBottom: 0,
                paddingBottom: 0,
              }}
              // actAsExpander={true}
              // showExpandableButton={true}
            />
            <CardTitle
              title={this.props.title}
              subtitle={categoryInfo}
              style={{
                marginTop: 0,
                paddingTop: 0,
              }}
            />
          </Link>
          <List>
            <ListItem>
              <RaisedButton label="Vote Up" onClick={() => this.vote(this.props.id, 'upVote')} />
            </ListItem>
            <ListItem>
              {this.props.voteScore}
            </ListItem>
            <ListItem>
              <RaisedButton label="Vote Down" onClick={() => this.vote(this.props.id, 'downVote')} />
            </ListItem>
          </List>
        </div>
        <CardActions>
          <RaisedButton label="Edit" onClick={() => this.edit()} />
          <RaisedButton label="Delete" onClick={() => this.destroy(this.props.id)} />
        </CardActions>
      </Card>
      // <CardText expandable={true}>
      //   {this.props.content}
      // </CardText>
    );
  }
}

// <div className="post-body">
//   <div className="vote-display">
//     <div>
//       <button onClick={() => this.vote(this.props.id, 'upVote')} className="like-element blue-button">
//         <i className="fa fa-angle-up"></i>
//       </button>
//       <p className="like-element">{this.props.voteScore}</p>
//       <button onClick={() => this.vote(this.props.id, 'downVote')} className="like-element red-button">
//         <i className="fa fa-angle-down"></i>
//       </button>
//     </div>
//   </div>
//   <Link onClick={() => this.props.dispatch(setPath('/post'))} className="post" to={link}>
//     <div className="post-title">{this.props.title}</div>
//     <div className="post-category">Category: {this.props.category}</div>
//     <div className="post-info-horizontal">
//       <div>Author: {this.props.author}</div>
//       <div>Comments: {this.props.commentCount}</div>
//     </div>
//   </Link>
//   <div className="edit-details">
//     <button onClick={() => this.edit()} className="edit-action blue-button">Edit</button>
//     <button onClick={() => this.destroy(this.props.id)} className="edit-action red-button">Delete</button>
//   </div>
// </div>

function mapStateToProps ({path, ...rest}) {
  return {
    path,
  }
}

export default connect(mapStateToProps)(Item)
