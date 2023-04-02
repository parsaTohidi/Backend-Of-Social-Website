import { Request, Response, NextFunction } from 'express'

export const validateSearchQuery = (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, username, age, country, gender } = req.query as SearchQuery

  // Ensure that at least one search parameter is present
  if (!firstName && !lastName && !username && !age && !country && !gender) {
    return res.status(400).json({ message: 'At least one search parameter is required' })
  }

  // Validate the age parameter
  if (age && (isNaN(age) || age < 0)) {
    return res.status(400).json({ message: 'Age must be a positive number' })
  }
  if (gender && !['Male', 'Female', 'Other'].includes(gender)) {
    return res.status(400).json({ message: 'Gender must be "Male" or "Female" or "Other"' })
  }

  if (username && (typeof username !== 'string' || username.length < 1)) {
    return res.status(400).json({ error: 'Invalid username parameter' })
  }

  if (firstName && (typeof firstName !== 'string' || firstName.length < 1)) {
    return res.status(400).json({ error: 'Invalid firstName parameter' })
  }

  if (lastName && (typeof lastName !== 'string' || lastName.length < 1)) {
    return res.status(400).json({ error: 'Invalid lastName parameter' })
  }

  if (country && (typeof country !== 'string' || country.length < 1)) {
    return res.status(400).json({ error: 'Invalid country parameter' })
  }

  next()
}

export const registerValidation = (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, username, password, passwordConfirm, age, gender } = req.body

  if (!firstName) {
    return res.status(400).json({ error: 'Firstname is required' })
  }

  if (!lastName) {
    return res.status(400).json({ error: 'Lastname is required' })
  }

  if (!username) {
    return res.status(400).json({ error: 'Username is required' })
  }

  if (!password) {
    return res.status(400).json({ error: 'Password is required' })
  }

  if (!passwordConfirm) {
    return res.status(400).json({ error: 'PasswordConfirm is required' })
  }

  if (password !== passwordConfirm) {
    return res.status(400).json({ error: 'Password and Password confirmation do not match' })
  }

  if (!age || isNaN(age)) {
    return res.status(400).json({ error: 'Age is invalid' })
  }

  if (!gender || !['Male', 'Female', 'Other'].includes(gender)) {
    return res.status(400).json({ error: 'Gender is invalid' })
  }

  next()
}
