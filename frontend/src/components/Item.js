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
import Desert from '../images/desert.jpg'


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
          background: 'linear-gradient(red, yellow)',
          boxShadow: `1px 3px 1px #9E9E9E`,
          marginBottom: 5
        }}>
        <div className="main-post-info">
          <Link onClick={() => this.props.dispatch(setPath('/post'))} className="left-infto" to={link}>
            <CardHeader
              title={authorInfo}
              subtitle={commentInfo}
              avatar={Desert}
              style={{
                marginBottom: 0,
                paddingBottom: 0,
              }}
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
    );
  }
}

function mapStateToProps ({path, ...rest}) {
  return {
    path,
  }
}

export default connect(mapStateToProps)(Item)
