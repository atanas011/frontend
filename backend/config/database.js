import mongoose from 'mongoose'

export const connectDB = () =>
    mongoose.connect(process.env.DB_URI)
        .then(con => console.log(`MongoDB connected with host: ${con.connection.host}`))
