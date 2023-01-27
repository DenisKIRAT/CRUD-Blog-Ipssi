import express, { Request, RequestHandler, Response } from 'express'
import { body, validationResult } from 'express-validator'
import db from '../db'

const app = express.Router()

// app.get('/comments', (req, res) => {
// //   console.log(req.posts)
//   res.status(200).json({ message: 'Hello comments' })
// })

const isUsersComment: RequestHandler = async (req, res, next) => {
  try {
    const isAdmin = await db.user.findFirstOrThrow({
      where: {
          id: req.user.id,
        },
    })

    if (isAdmin.role === "ADMIN") {
      return next();
    } else {
      try {
        const isOwner = await db.comment.findFirstOrThrow({
          where: {
            id: req.params.uuid,
            author: {
              id: req.user.id
            },
          }
        })
    
        console.log(isOwner)
    
        if (isOwner) {
          return next()
        }
        throw new Error('You should not be here')
      } catch(e) {
        return res.status(400).json({ message: 'You are not the owner' })
      }
    }

  } catch(e) {
    return res.status(400).json({ message: 'You are not admin' })
  }
  
}

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

app.get(
  '/comment/:uuid',
  async (req, res) => {
      try {
          const comment = await db.comment.findFirstOrThrow({
          where: {
              id: req.params.uuid
          },
          include: {
              post: true
          }
          })
  
          return res.status(200).json(comment)
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

app.patch(
  '/comment/:uuid',
  body('content').isString().optional(),
  isUsersComment,
  async (req: Request, res: Response) => {
    try {
      validationResult(req).throw()
      const modifiedComment = await db.comment.updateMany({
        where: {
          id: req.params.uuid
        },
        data: {
          content: req.body.content,
          authorId: req.user.id
        }
      })

      return res.status(200).json(modifiedComment)
    } catch(e) {
      console.log(e)
      return res.status(400).json({error: e || 'Cannot modify the comment'})
    }
  }
)

app.delete(
  '/comment/:uuid',
  isUsersComment,
  async (req: Request, res: Response) => {
    try {
      validationResult(req).throw()
      const deletedComment = await db.comment.delete({
        where: {
          id: req.params.uuid
        }
      })

      return res.status(200).json(deletedComment)
    } catch(e) {
      console.log(e)
      return res.status(400).json({error: e || 'Cannot delete the comment'})
    }
  }
)

export default app