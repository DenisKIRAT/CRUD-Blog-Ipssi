import express, { Request, RequestHandler, Response } from 'express'
import { body, validationResult } from 'express-validator'
import db from '../db'
import { hashPassword, createJWT } from '../modules/auth'

const app = express.Router()

const isUsersAdmin: RequestHandler = async (req, res, next) => {
  const isAdmin = await db.user.findFirstOrThrow({
    where: {
        id: req.user.id,
      },
  })

  if (isAdmin.role === "ADMIN") {
    return next();
  } else {
    try {
      if (req.user.id === req.params.uuid) {
        const isOwner = await db.user.findFirstOrThrow({
          where: {
            id: req.params.uuid
          }
        })
    
        console.log(isOwner)
    
        if (isOwner) {
          return next()
        }
      }
      throw new Error('You should not be here')
    } catch(e) {
      return res.status(400).json({ message: 'You are not the owner' })
    }
  }
}

app.get(
  '/user',
  async (req, res) => {
    const users = await db.user.findUnique({
      where : {
        id: req.user.id
      },
      include : {
        posts: true,
        comments: true
      }
    })
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

app.patch(
  '/user',
  async (req: Request, res: Response) => {
    try {
      // if (!(req.body?.username && req.body?.password)) {
      //   throw new Error('Invalid body provided')
      // }

      validationResult(req).throw()
  
      const hash = await hashPassword(req.body.password)
  
      const updateUser = await db.user.update({
        where: {
          id: req.user.id
        },
        data: {
          username: req.body.username,
          password: hash
        }
      })
  
      const token = createJWT(updateUser)
  
      return res.status(201).json({ message: "Vos informations ont été modifié avec succés !", token })
    } catch(e) {
      res.status(400).json({ error: 'Invalid body provided' })
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