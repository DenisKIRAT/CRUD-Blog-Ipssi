import express, { RequestHandler } from 'express'
import db from '../db'
import { deleteUser, getOneUser, getUser, modifyUser } from '../handlers/user'

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

app.get('/user', getUser)

app.get('/user/:uuid',getOneUser)

app.patch('/user', modifyUser)

app.delete(
  '/user/:uuid',
  isUsersAdmin,
  deleteUser
)


export default app