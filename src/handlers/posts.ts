import { User } from "@prisma/client";
import { Request, RequestHandler } from "express";
import { validationResult } from "express-validator";
import db from "../db";

interface TypedRequestParam extends Request {
  body: {
    title: string;
    content: string;
    authorId?: string;
    author?: User;
  }
}

export const getPosts: RequestHandler = async (req: TypedRequestParam, res) => {
    let filter = {}
    const date = new Date(Number(req.query.from))

    if (req.query.from) {
        filter = {
            where : {
                created_at: {
                    gte: date
                }
            }
        }
    }
    const posts = await db.post.findMany(filter)

    return res.status(200).json(posts)
}

export const getOnePost: RequestHandler = async (req: TypedRequestParam, res) => {
    try {
        const post = await db.post.findFirstOrThrow({
            where: {
                id: req.params.uuid
            },
            include: {
                comments: true,
                author: true
            }
        })

        return res.status(200).json(post)
    } catch(e) {
        return res.status(400).json({ message: 'Not found' })
    }
}

export const addPost: RequestHandler = async (req: TypedRequestParam, res) => {
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

export const patchPost: RequestHandler = async (req: TypedRequestParam, res) => {
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

export const deletePost: RequestHandler = async (req: TypedRequestParam, res) => {
    try {
        validationResult(req).throw()
        const deletedPost = await db.post.delete({
            where: {
            id: req.params.uuid
            }
        })

        return res.status(200).json({ message: `Successfully deleted ${deletedPost.id}`})
    } catch(e) {
        console.log(e)
        return res.status(400).json({error: e || 'Cannot delete the post'})
    }
}