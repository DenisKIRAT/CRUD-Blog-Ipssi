import { Post, User } from "@prisma/client";
import { Request, RequestHandler } from "express";
import { validationResult } from "express-validator";
import db from "../db";

interface TypedRequestParam extends Request {
  body: {
    content: string;
    postId: string;
    authorId?: string;
    post?: Post;
    author?: User;
  }
}

export const getComments: RequestHandler = async (req: TypedRequestParam, res) => {
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

export const getUserComments: RequestHandler = async (req: TypedRequestParam, res) => {
    try {
        const comments = await db.comment.findMany({
            where: {
                authorId: req.params.uuid
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

export const getOneComment: RequestHandler = async (req: TypedRequestParam, res) => {
    try {
        const comment = await db.comment.findFirstOrThrow({
            where: {
                id: req.params.uuid
            },
            include: {
                post: true,
                author: true
            },
        })

        console.log(comment)

        return res.status(200).json(comment)
    } catch(e) {
        return res.status(400).json({ message: 'Not found' })
    }
}

export const addComment: RequestHandler = async (req: TypedRequestParam, res) => {
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

export const patchComment: RequestHandler = async (req: TypedRequestParam, res) => {
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

export const deleteComment: RequestHandler = async (req: TypedRequestParam, res) => {
    try {
        validationResult(req).throw()
        const deletedComment = await db.comment.delete({
            where: {
                id: req.params.uuid
            }
        })

        return res.status(200).json({ message: `Successfully deleted ${deletedComment.id}`})
    } catch(e) {
        console.log(e)
        return res.status(400).json({error: e || 'Cannot delete the comment'})
    }
}