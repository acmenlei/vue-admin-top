import { post } from "./config"

export function queryComments(data) {
  return post('/comment/queryComments', data)
}

export function deleteCommentById(data) {
  return post("/comment/remove", data)
}

export function queryCommentReplyById(data) {
  return post('/comment/queryCommentsReplyById', data)
}