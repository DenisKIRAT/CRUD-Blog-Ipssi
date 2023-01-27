import { Router } from 'express'
import { body } from 'express-validator'
import { addComment, deleteComment, getComments, getOneComment, getUserComments, patchComment } from '../handlers/comments'
import { isUsersElement } from '../modules/authorVerif'

const app = Router()


app.get('/comments', getComments)

app.get('/comments/:uuid', getUserComments)

app.get('/comment/:uuid', getOneComment)

app.post(
  '/comment',
  body('postId').isUUID().notEmpty(),
  body('content').isString().notEmpty(),
  addComment
)

app.patch(
  '/comment/:uuid',
  body('content').isString().optional(),
  isUsersElement,
  patchComment
)

app.delete(
  '/comment/:uuid',
  isUsersElement,
  deleteComment
)

export default app