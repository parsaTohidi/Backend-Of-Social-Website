import jwt from 'jsonwebtoken'

const generateAuthToken = (userId: string): string => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '24h' })
  return token
}

export default generateAuthToken
