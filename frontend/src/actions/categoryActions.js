import * as actionTypes from './types'

export function setEdit (status) {
  return {
    type: actionTypes.SET_EDIT,
    status,
  }
}

export function setId (id) {
  return {
    type: actionTypes.SET_ID,
    id,
  }
}

export function setTitle (title) {
  return {
    type: actionTypes.SET_TITLE,
    title,
  }
}

export function setAuthor (author) {
  return {
    type: actionTypes.SET_AUTHOR,
    author,
  }
}

export function setContent (content) {
  return {
    type: actionTypes.SET_CONTENT,
    content,
  }
}

export function setCategory (category) {
  return {
    type: actionTypes.SET_CATEGORY,
    category,
  }
}

export function pageCategory(category) {
  return {
    type: actionTypes.PAGE_CATEGORY,
    category,
  }
}
