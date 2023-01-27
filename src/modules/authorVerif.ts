import { RequestHandler } from "express";
import db from "../db";

export const isUsersElement: RequestHandler = async (req, res, next) => {
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
            
                if (isOwner) {
                    return next()
                }
                throw new Error('You should not be here')
            } catch(e) {
                return res.status(400).json({ message: 'You are not the owner' })
            }
        }
    } catch(e) {
        return res.status(400).json({ message: 'You aren\'t authentified' })
    }    
}