import { Request, Response } from 'express'
import { updateUserObject } from '../lib/redis'
import generateAuthToken from '../lib/jwt'
import UserModel, { IUser } from '../models/User'

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { firstName, lastName, username, password, phone, age, country, city, gender } = req.body

    const userExists: IUser | null = await UserModel.findOne({ username })
    if (userExists) {
      return res.status(400).json({ error: 'Username already exists' })
    }

    const newUser: IUser = new UserModel({
      firstName,
      lastName,
      username,
      password,
      phone,
      age,
      country,
      city,
      gender
    })

    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'Enter Username and Password' })
    }

    const user: IUser | null = await UserModel.findOne({ username })
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    const passwordMatch = await user.comparePassword(password)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    const token = generateAuthToken(user._id)

    await updateUserObject(user)
    res.status(200).json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

export const search = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, username, age, country, city, gender } = req.query

    const searchQuery: any = {}
    searchQuery._id = { $ne: req.user._id }
    if (firstName) searchQuery.firstName = { $regex: new RegExp(firstName as string, 'i') }
    if (lastName) searchQuery.lastName = { $regex: new RegExp(lastName as string, 'i') }
    if (username) searchQuery.username = { $regex: new RegExp(username as string, 'i') }
    if (age) searchQuery.age = Number(age)
    if (country) searchQuery.country = { $regex: new RegExp(country as string, 'i') }
    if (city) searchQuery.city = { $regex: new RegExp(city as string, 'i') }
    if (gender) searchQuery.gender = gender as string

    const users: IUser[] = await UserModel.find(searchQuery)
      .select('-password')
      .populate('friends', '-password -friends')
    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}
