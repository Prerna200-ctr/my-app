import User from '@/app/models/userModel'
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/app/dbconfig/dbconfig'

export async function POST(request: NextRequest) {
  try {
    const connection = await connectDB()
    console.log(connection)

    const reqBody = await request.json()
    const { username, email, password } = reqBody
    console.log(reqBody, 'this is *****')

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })

    const savedUser = await newUser.save()

    return NextResponse.json({
      message: 'User created successfully. Verification email sent.',
      success: true,
      savedUser,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
