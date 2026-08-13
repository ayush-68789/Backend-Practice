const mongoose = require('mongoose') ;

const studentSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true ,
    } ,
    age : {
        type : String ,
        required : true ,
    },
    image : {
        type : String , // for storing base64 encoded data
    }
})

const Student = mongoose.model("Student", studentSchema) ;
module.exports = Student ;