const mongoose = require('mongoose') ;

async function connectDB() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
    .then(()=> {
        console.log(`DB Connected Successfully...`)
    })
    .catch((err) => {
        console.log(`DB NOT Connected...`) ;
    })
}

module.exports = connectDB ; 