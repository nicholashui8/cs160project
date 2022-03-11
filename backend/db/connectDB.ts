import mongoose from 'mongoose'
const connectionString = 'mongodb+srv://adminUser:cs160admin@cluster0.kagsg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const connectDB = () => {
    mongoose.connect(connectionString).then(() => {
        console.log('Connected to database')
    }).catch((err: any) => {
        console.log(err)
    })
}

module.exports = connectDB;