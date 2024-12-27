'use server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectDB } from '../dbconfig/dbconfig'
import User from '../models/userModel'

export async function handleLogin(user: { email: string; password: string }) {
  await connectDB()

  try {
    const { email, password } = user

    const curruser = await User.findOne({ email })

    if (!curruser) {
    } else {
      const validPassword = await bcryptjs.compare(password, curruser.password)
      if (!validPassword) {
        console.log('Invalid password')
      } else {
        const tokenData = {
          id: curruser._id,
          username: curruser.username,
          email: curruser.email,
        }
        const token = await jwt.sign(
          tokenData,
          process.env.NEXT_PUBLIC_TOKEN_SECRET!,
          { expiresIn: '1d' }
        )
        console.log(token)
        console.log('Login successful')
      }
    }
  } catch (error) {
    console.log(error)
  }
}
