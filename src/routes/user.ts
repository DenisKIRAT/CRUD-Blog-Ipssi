import express, { Request, RequestHandler, Response } from 'express'
import { body, validationResult } from 'express-validator'
import db from '../db'

const app = express.Router()

const isUsersAdmin: RequestHandler = async (req, res, next) => {
  try {
    const isAdmin = await db.user.findMany({
      where: {
        id: req.user.id,
        role: 'ADMIN'
      }
    })

    console.log(isAdmin)

    if (isAdmin) {
      return next()
    }
    throw new Error('You should not be here')
  } catch(e) {
    return res.status(400).json({ message: 'You are not admin' })
  }
} 

app.get(
  '/users',
  async (req, res) => {
    const users = await db.user.findMany()
    return res.status(200).json(users)
  }
)

app.get(
  '/user/:uuid',
  async (req, res) => {
      try {
          const user = await db.user.findFirstOrThrow({
          where: {
              id: req.params.uuid
          },
          include: {
              posts: true,
              comments: true
          }
          })
  
          return res.status(200).json(user)
      } catch(e) {
          return res.status(400).json({ message: 'Not found' })
      }
  }
)

app.delete(
  '/user/:uuid',
  isUsersAdmin,
  async (req: Request, res: Response) => {
    try {
      validationResult(req).throw()
      const deletedUser = await db.user.delete({
        where: {
          id: req.params.uuid
        }
      })

      return res.status(200).json(deletedUser)
    } catch(e) {
      console.log(e)
      return res.status(400).json({error: e || 'Cannot delete the user'})
    }
  }
)


export default app