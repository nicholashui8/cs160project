var mongoose = require('mongoose')

const connDB = async () => {
    try {
        const connectionString = await mongoose.connect(process.env.MONGODB_URI)

        console.log(`MongoDB Connected: ${connectionString.connection.host}`);
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connDB