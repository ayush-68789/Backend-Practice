const express = require('express') ; 
const Router = express.Router() ; 
const Student = require('../models/Student')
const upload = require('../middleware/upload') ;

Router.post('/students' , upload.single('image'),async (req ,res) =>{
    let {name , age } = req.body ; 
    let student = await Student.create({
        name : name , 
        age : age
    })
    return res.status(201).json({
        Message : "Created" ,
        student
    })
})

Router.get('/students', async (req ,res) => {
    let allStudents = await Student.find({}) ; 
    return res.status(200).json({
        Message : 'Fetched', 
        allStudents
    })
})


module.exports = Router ;