import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { votePost, sendPostVote, deletePost, sendDelete, setModal, setPath } from '../actions/postActions'
import { setEdit, setTitle, setAuthor, setContent, setCategory, setId } from '../actions/categoryActions'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardHeader, CardTitle } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import Desert from '../images/desert.jpg' // image credit: Jordon Steranka, Unsplash
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'


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

  // when the edit button is clicked, prevent the action of navigating to the
  // individual post page
  editButtonWrapper = (event) => {
    event.preventDefault()
    this.edit()
  }

  // like with the editButtonWrapper function, when the destroy button is
  // clicked, prevent the action of navigating to the individuaal post page or
  // to the page stating that the post does not exist
  destroyButtonWrapper = (event, id) => {
    event.preventDefault()
    this.destroy(id)
  }

  render() {
    let link = `/${this.props.category}/${this.props.id}`
    let authorInfo = "Author: " + this.props.author
    let commentInfo = "Comments: " + this.props.commentCount.toString()
    let categoryInfo = "Category: " + this.props.category
    // <RaisedButton label="Vote Up" onClick={() => this.vote(this.props.id, 'upVote')} />
    // <RaisedButton label="Vote Down" onClick={() => this.vote(this.props.id, 'downVote')} />
    return (
      <Link onClick={() => this.props.dispatch(setPath('/post'))} to={link}>
        <Card
          style={{
            background: 'linear-gradient(red, yellow)',
            boxShadow: `1px 3px 1px #9E9E9E`,
            marginBottom: 5,
          }}>
          <div className="all-post-info">
            <div className="main-post-info">
              <CardHeader
                title={authorInfo}
                subtitle={commentInfo}
                avatar={Desert}
                style={{
                  marginBottom: 0,
                  paddingBottom: 0,
                }}
              />
              <div className="sub-information">
                <div className="like-section" onClick={(event) => {event.preventDefault()}}>
                  <KeyboardArrowUp onClick={() => this.vote(this.props.id, 'upVote')}/>
                  <div className="score-text">{this.props.voteScore}</div>
                  <KeyboardArrowDown onClick={() => this.vote(this.props.id, 'downVote')}/>
                </div>
                <CardTitle
                  title={this.props.title}
                  subtitle={categoryInfo}
                  subtitleColor='black'
                  style={{
                    marginTop: 0,
                    padding: 16,
                  }}
                />
              </div>
            </div>
            <div>
              <ModeEdit className="action-button" onClick={(event) => this.editButtonWrapper(event)} />
              <Delete className="action-button" onClick={(event) => this.destroyButtonWrapper(event, this.props.id)} />
            </div>
          </div>
        </Card>
      </Link>
    );
  }
}

function mapStateToProps ({path, ...rest}) {
  return {
    path,
  }
}

export default connect(mapStateToProps)(Item)
