import express from 'express'

const app = express.Router()

app.get('/user', (req, res) => {
//   console.log(req.posts)
  res.status(200).json({ message: 'Hello user' })
})

export default app