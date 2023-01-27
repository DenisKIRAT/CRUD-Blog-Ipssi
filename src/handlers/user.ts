import { Role } from "@prisma/client";
import { Request, RequestHandler } from "express";
import { validationResult } from "express-validator";
import db from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

interface TypedRequestParam extends Request {
  body: {
    username?: string;
    password?: string;
    role?: Role;
  }
}

export const createNewUser: RequestHandler = async (req: TypedRequestParam, res) => {
  try {
    if (!(req.body?.username && req.body?.password)) {
      throw new Error('Invalid body provided')
    }

    const hash = await hashPassword(req.body.password)

    const user = await db.user.create({
      data: {
        username: req.body.username,
        password: hash
      }
    })

    const token = createJWT(user)

    return res.status(201).json({ token })
  } catch(e) {
    res.status(400).json({ error: e?.toString() })
  }
}

export const signIn: RequestHandler = async (req: TypedRequestParam, res) => {
  try {
    if (!(req.body?.username && req.body?.password)) {
      throw new Error('Invalid body provided')
    }
    const user = await db.user.findUnique({
      where: {
        username: req.body.username
      }
    })
  
    if (user) {
      const isValid = await comparePassword(req.body.password, user.password)

      if (!isValid) {
        return res.status(401).json({ error: 'Invalid password' })
      }

      const token = createJWT(user)
      return res.status(200).json({ token })
    }
  } catch(e) {
    return res.status(400).json({ error: e?.toString() })
  }
}

export const getUser: RequestHandler = async (req: TypedRequestParam, res) => {
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

export const getOneUser: RequestHandler = async (req: TypedRequestParam, res) => {
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

export const modifyUser: RequestHandler = async (req: TypedRequestParam, res) => {
  try {
    validationResult(req).throw()

    const hash = await hashPassword(req.body.password as string)

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

export const deleteUser: RequestHandler = async (req: TypedRequestParam, res) => {
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