import { createClient } from 'redis'
import { IUser } from '~/models/User'

const redisClient = createClient()

redisClient.on('connect', () => {
  console.log('Redis client connected')
})

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err)
})

export const updateUserObject = async (user: IUser): Promise<void> => {
  await redisClient.set(user._id.toString(), JSON.stringify(user))
  return
}

export default redisClient
