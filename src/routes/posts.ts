import { Request, RequestHandler, Response, Router } from "express";
import { body, check, validationResult } from "express-validator";
import db from "../db";

const app = Router()

app.post(
    '/post',
    body('name').exists().isString().notEmpty(),
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
    })