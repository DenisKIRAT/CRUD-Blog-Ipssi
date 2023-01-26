import { Request, RequestHandler, Response, Router } from "express";
import { body, check, validationResult } from "express-validator";
import db from "../db";

const app = Router()

const isUsersPost: RequestHandler = async (req, res, next) => {
  try {
    const isOwner = await db.post.findFirstOrThrow({
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

app.get(
    '/posts', 
    async (req, res) => {
        const posts = await db.post.findMany()
        return res.status(200).json(posts)
    }
)

app.get(
    '/post/:uuid',
    async (req, res) => {
        try {
            const post = await db.post.findFirstOrThrow({
            where: {
                id: req.params.uuid
            },
            include: {
                comments: true
            }
            })
    
            return res.status(200).json(post)
        } catch(e) {
            return res.status(400).json({ message: 'Not found' })
        }
    }
)

app.post(
    '/post',
    body('title').isString().notEmpty(),
    body('content').isString().notEmpty(),
    async (req: Request, res: Response) => {
      try {
        validationResult(req).throw()
        const createdPost = await db.post.create({
          data: {
            title: req.body.title,
            content: req.body.content,
            authorId: req.user.id 
          }
        })
  
        return res.status(200).json(createdPost)
      } catch(e) {
        console.log(e)
        return res.status(400).json({error: e || 'Cannot create the post'})
      }
    }
)

app.patch(
  '/post/:uuid',
  body('title').isString().optional(),
  body('content').isString().optional(),
  isUsersPost,
  async (req: Request, res: Response) => {
    try {
      validationResult(req).throw()
      const modifiedPost = await db.post.updateMany({
        where: {
          id: req.params.uuid                                                           
        },
        data: {
          title: req.body.title,
          content: req.body.content,
          authorId: req.user.id
        }
      })

      return res.status(200).json(modifiedPost)
    } catch(e) {
      console.log(e)
      return res.status(400).json({error: e || 'Cannot modify the post'})
    }
  }
)

app.delete(
  '/post/:uuid',
  isUsersPost,
  async (req: Request, res: Response) => {
    try {
      validationResult(req).throw()
      const deletedPost = await db.post.delete({
        where: {
          id: req.params.uuid
        }
      })

      return res.status(200).json(deletedPost)
    } catch(e) {
      console.log(e)
      return res.status(400).json({error: e || 'Cannot delete the post'})
    }
  }
)

export default app

