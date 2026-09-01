const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('connect to mongoDB successfully...');
        
    } catch (error) {
        console.log('error while connecting mongoDB', error)
    }
}

module.exports = connectDB