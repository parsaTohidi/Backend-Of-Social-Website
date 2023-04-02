import * as mongoose from "mongoose"
import * as bcrypt from "bcrypt"

export interface IUser extends mongoose.Document {
  username: string
  password: string
  firstName: string
  lastName: string
  age: number
  phone: string
  gender: string
  country: string
  city: string
  friends: string[]
  createdAt: Date
  comparePassword(password: string): Promise<boolean>
}

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  country: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now()
  },
})

userSchema.pre('save', function (next) {
  var user = this

  if (this.password && (this.isModified('password') || this.isNew)) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err)
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err)
        }
        user.password = hash
        next()
      })
    })
  }
  else {
    return next()
  }
})

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password)
}

export default mongoose.model<IUser>('User', userSchema)
