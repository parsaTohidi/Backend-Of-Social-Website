import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const authentication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.headers

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    jwt.verify(token as string, process.env.JWT_SECRET!, async (err, decodedToken) => {
      if (err) {
        console.log(err)
        return res.status(401).json({ error: 'Unauthorized' })
      }
      const { userId } = decodedToken as { userId: string }

      const stringifiedUser = await req.redisClient.get(userId.toString())
      if (!stringifiedUser) {
        return res.status(401).json({ error: 'Unauthorized' })
      }
      req.user = JSON.parse(stringifiedUser)

      next()
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Server internal error' })
  }
}

export default authentication
