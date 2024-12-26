"use server"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectDB } from '../dbconfig/dbconfig'
import User from '../models/userModel'
// import { toast } from 'react-toastify'

export async function handleLogin(
  user: any,
  // setLoading: any,
  // setErrorMessage: any
) {
  const connection = await connectDB();
  console.log(connection);

  try {
    // setLoading(true)
    const { email, password } = user
    console.log(email, '**********', password)
    console.log(User);

    const curruser = await User.findOne({ email })
    console.log(curruser)

    if (!curruser) {
      // setErrorMessage('Invalid email or password')
    } else {
      const validPassword = await bcryptjs.compare(password, curruser.password)
      if (!validPassword) {
        console.log('Invalid password')
        // setErrorMessage('Invalid password')
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
        // setLoading(false)
        console.log('Login successful')

        // toast.success('Login successful')
      }
    }
  } catch (error: any) {
    console.log(error);

    // toast.error('An error occurred. Please try again later.')
  }
}
