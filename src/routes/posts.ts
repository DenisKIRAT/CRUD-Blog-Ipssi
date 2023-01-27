import { Router } from "express";
import { body } from "express-validator";
import { addPost, deletePost, getOnePost, getPosts, patchPost } from "../handlers/posts";
import { isUsersElement } from "../modules/authorVerif";

const app = Router()

app.get('/posts', getPosts)

app.get('/post/:uuid', getOnePost)

app.post(
    '/post',
    body('title').isString().notEmpty(),
    body('content').isString().notEmpty(),
    addPost
)

app.patch(
  '/post/:uuid',
  body('title').isString().optional(),
  body('content').isString().optional(),
  isUsersElement,
  patchPost
)

app.delete(
  '/post/:uuid',
  isUsersElement,
  deletePost
)

export default app

