const express = require('express') ;
const App = express() ;

const notes = []  ;

// App.get('/notes', (req, res)=>{
    
// })
App.use(express.json()) ;  // for getting req body

App.get('/notes' , (req , res) => {
    res.status(200).json({
        message : "Data Retrieved" ,
        data : notes
    })
})

App.post('/notes', (req , res) => {
    console.log(req.body) ;  
    let {title , desc} = req.body ;
    notes.push({title, desc}) ;
    res.status(201).json({
        message : "Note Created SuccessFully"
    })
})

App.delete('/notes/:id', (req ,res)=> {
    console.log(req.params) ; 
    const idx = req.params.id ; 
    notes.splice(idx, 1) ; 
    res.status(204).json({
        message : "Note Deleted"
    })
})

App.patch('/notes/:id', (req ,res) => {
    console.log(req.params) ;
    const idx = req.params.id ;
    console.log(req.body) ; 
    let {desc} = req.body ; 
    notes[idx].desc = desc ; 
    res.status(200).json({
        message : "Data updated"
    })
})

const PORT = 5050
App.listen(PORT , () =>{
    console.log(`Server Running at Port : ${PORT}`) ;
})