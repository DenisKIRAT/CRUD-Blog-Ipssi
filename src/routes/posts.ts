import express from 'express'

const app = express.Router()

app.get('/posts', (req, res) => {
//   console.log(req.posts)
  res.status(200).json({ message: 'Hello posts' })
})

export default app