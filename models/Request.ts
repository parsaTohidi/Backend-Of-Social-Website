import mongoose, { Document, ObjectId, Schema } from 'mongoose'

export interface IRequest extends Document {
  senderId: ObjectId
  receiverId: ObjectId
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: Date
}

const requestSchema: Schema = new Schema<IRequest>({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
})

export default mongoose.model<IRequest>('Request', requestSchema)
