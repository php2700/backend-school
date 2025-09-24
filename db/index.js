import mongoose from 'mongoose'


// password='RNjVVe6SZN12Pzqp'
// username='shriramschool112_db_user'
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DATABASE);
        console.log("connected")
    } catch (error) {
        console.log(error, "connection error")
        process.exit(1)
    }
}

export default connectDb;