import express from 'express'
import { body, validationResult } from 'express-validator'
import db from '../db'

const app = express.Router()

// app.get('/comments', (req, res) => {
// //   console.log(req.posts)
//   res.status(200).json({ message: 'Hello comments' })
// })

app.get(
  '/comments',
  async (req, res) => {
      try {
          const comments = await db.comment.findMany({
          where: {
              authorId: req.user.id
          },
          include: {
              post: true
          },
          })
  
          return res.status(200).json(comments)
      } catch(e) {
          return res.status(400).json({ message: 'Not found' })
      }
  }
)

app.post(
  '/comment',
  body('postId').isUUID().notEmpty(),
  body('content').isString().notEmpty(),
  async (req, res) => {
    try {
      validationResult(req).throw()
      const createdContent  = await db.comment.create({
        data: {
          content: req.body.content,
          postId: req.body.postId,
          authorId: req.user.id
        },
      })

      return res.status(201).json(createdContent)
    } catch (e) {
      return res.status(400).json({ message: e || 'Error during creation'})
    }
  }
)

export default app