import { Request, Response } from 'express'
import RequestModel, { IRequest } from '../models/Request'
import UserModel, { IUser } from '../models/User'
import { updateUserObject } from '../lib/redis'

/**
 * Controller function to send a friend request
 */
export const sendRequest = async (req: Request, res: Response) => {
  try {
    const { receiverId } = req.body
    const sender = req.user


    // Check if the sender and receiver are different users
    if (sender._id === receiverId) {
      return res.status(400).json({ message: 'Sender and receiver should be different users' })
    }

    const reciever: IUser | null = await UserModel.findById(receiverId)

    if (!sender) {
      return res.status(404).json({ message: 'Sender not found' })
    }
    if (!reciever) {
      return res.status(404).json({ message: 'Reciever not found' })
    }
    if (sender.friends.includes(receiverId)) {
      return res.status(400).json({ message: 'Friendship connection already exists' })
    }
    if (reciever.friends.includes(sender._id)) {
      const updatedSender: IUser | null = await UserModel.findOneAndUpdate({ _id: sender._id }, { $addToSet: { friends: receiverId } })
      if (updatedSender) {
        await updateUserObject(updatedSender)
      }
      return res.status(201).json({ message: 'You were one of the receiver\'s friends. \n the person get added to your friends list again' })
    }

    // Check if the pending request already exists
    const existingRequest: IRequest | null = await RequestModel.findOne({ senderId: sender._id, receiverId, status: 'pending' })
    if (existingRequest) {
      return res.status(400).json({ message: 'Friend request already sent' })
    }

    // Create a new request
    const request: IRequest = new RequestModel({
      senderId: sender._id,
      receiverId,
      status: 'pending',
    })

    // Save the request
    await request.save()

    res.status(201).json(request)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

/**
 * Controller function to cancel a pending friend request
 */
export const cancelRequest = async (req: Request, res: Response) => {
  try {
    const { requestId } = req.body

    // Delete the request
    const deletedRequest: IRequest | null = await RequestModel.findOneAndDelete({ _id: requestId, status: 'pending' })

    // Check if the request exists
    if (!deletedRequest) {
      return res.status(404).json({ message: 'Pending friend request does not exist' })
    }

    res.status(200).json({ message: 'Pending friend request cancelled' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

/**
 * Controller function to respond to a friend request
 */
export const respondRequest = async (req: Request, res: Response) => {
  try {
    const { requestId, status } = req.body
    const userId = req.user._id

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' })
    }

    const receiver: IUser | null = await UserModel.findById(userId)

    if (!receiver) {
      return res.status(404).json({ message: 'receiver not found' })
    }

    // Update the request status
    const updatedRequest: IRequest | null = await RequestModel.findOneAndUpdate(
      { _id: requestId, receiverId: receiver._id, status: 'pending' },
      { status },
      { new: true }
    )

    // Check if the request exists
    if (!updatedRequest) {
      return res.status(404).json({ message: 'Pending friend request does not exist' })
    }

    const sender: IUser | null = await UserModel.findById(updatedRequest.senderId)

    if (!sender) {
      return res.status(404).json({ message: 'Sender not found' })
    }
    // If the status is accepted, add each user as a friend of the other
    if (status === 'accepted') {

      sender.friends.push(receiver._id)
      receiver.friends.push(sender._id)

      await sender.save()
      await receiver.save()
      await updateUserObject(sender)
    }

    res.status(200).json(updatedRequest)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const removeFriend = async (req: Request, res: Response) => {
  try {
    const { friendId } = req.body
    const userId = req.user._id
    // Find the user by ID

    const user: IUser | null = await UserModel.findById(userId).select('friends')

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Remove the friend ID from the user's friends array
    user.friends = user.friends.filter((friend: string) => friend.toString() !== friendId)

    // Save the updated user document
    await user.save()
    await updateUserObject(user)

    return res.status(200).json({ message: 'Friend removed successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const getRequests = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id
    const requests = await RequestModel.find({ $or: [{ senderId: userId }, { receiverId: userId }] })
      .populate('receiverId', '-password -friends')
    return res.status(200).json(requests)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
