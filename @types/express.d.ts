import express from "express"

declare global {
  namespace Express {
    interface Request {
      redisClient: Record<string, any>
      user: Record<string, any>
    }
  }
}
