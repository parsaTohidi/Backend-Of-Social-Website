import mongoose from 'mongoose'

const DB_URL = process.env.DBUrl
const DB_NAME = process.env.DBName

const connect = async () => {
  try {

    await mongoose.connect(`${DB_URL}/${DB_NAME}`, {
      user: process.env.DBUser,
      pass: process.env.DBPassword
    })
    console.log(`Connected to MongoDB at ${DB_URL}/${DB_NAME}`)
  } catch (error: any) {
    console.log(error)
    console.error(`Error connecting to MongoDB: ${error.message}`)
    process.exit(1)
  }
}

export default { connect }
