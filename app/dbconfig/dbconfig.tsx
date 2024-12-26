import mongoose from 'mongoose'

export async function connectDB() {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI!)
    console.log('hii')

    console.log(process.env.NEXT_PUBLIC_MONGO_URI)

    const connection = await mongoose.connection

    connection.on(`connected`, () => {
      console.log(`MongoDB connected successfully`)
    })

    connection.on(`error`, (err: any) => {
      console.log(
        `MongoDB connection error. Please make sure MongoDB is running. ` + err
      )
      process.exit()
    })
  } catch (error) {
    console.log(`Something goes wrong!`)
    console.log(error)
  }
}
