const mongoose = require('mongoose') ; 

const connectDB = async()=> {
    await mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log('DB CONNECTED')
        })
        .catch((err) => {
            console.log('DB NOT CONNECTED') ; 
        })
}

module.exports = connectDB ; 