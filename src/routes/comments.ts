import express from 'express'

const app = express.Router()

app.get('/comments', (req, res) => {
//   console.log(req.posts)
  res.status(200).json({ message: 'Hello comments' })
})

export default app